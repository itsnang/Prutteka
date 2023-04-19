import { useState } from 'react';
import {
  AutoCompleteInput,
  EventCard,
  SearchBar,
  SeoMeta,
  Button,
  EventCardSkeleton,
} from 'ui';
import { CategorySelection, FilterModal } from '../shared';
import {
  MapPinIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/solid';
import { LOCATIONS } from '../constants';
import { useTypeSafeTranslation } from 'shared-utils/hooks';
import { useLocalInterestedEvent } from '../event';
import { useRouter } from 'next/router';
import {
  translateDate,
  fetcher,
  getTranslatedText,
  convertTime,
} from '../helpers';
import { translateTime } from '../helpers/translateTime';

import { APIResponseEvents } from 'custom-types';
import useSWRInfinite from 'swr/infinite';
import InfiniteScroll from 'react-infinite-scroll-component';
import { format } from 'date-fns';

const PAGE_SIZE = 8;

const getKey =
  (category: string) => (pageIndex: number, previousPageData: any) => {
    // date format as 2023-12-31
    const today = format(
      new Date(new Date().setHours(0, 0, 0, 0)),
      'yyyy-MM-dd'
    );

    if (previousPageData && !previousPageData?.data.length) return null; // reached the end
    return `/events?filter[category]=${category}&filter[end_date][gte]=${today}&page[offset]=${pageIndex}&page[limit]=${PAGE_SIZE}`; // SWR key
  };

export const Search = () => {
  const { t, i18n } = useTypeSafeTranslation();

  // const locations = LOCATIONS.map((value, idx) => ({
  //   name: t(value),
  //   value: value as string,
  //   id: idx,
  // }));

  // const [selected, setSelected] = useState(locations[0]);
  // const [filterModal, setFilterModal] = useState(false);

  const [interestedEvents, setInterestedEvents] = useLocalInterestedEvent();
  const { query, push } = useRouter();
  const { data, size, setSize } = useSWRInfinite<APIResponseEvents>(
    getKey((query.category as string) || 'all'),
    fetcher
  );

  const isEmpty = data?.[0]?.data.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.data.length < PAGE_SIZE);

  return (
    <>
      <SeoMeta
        title="Search | ព្រឹត្តិការណ៍​ - Prutteka"
        description="Experience the ultimate solution for events, venues, and attractions in Cambodia with ព្រឹត្តិការណ៍ - Prutteka. Revel in the our system, offering dynamic content to provide more information for your events, whether it is sports, concerts or conventions."
      />

      <div className="space-y-4">
        <div className="mx-auto max-w-[31.25rem]">
          <SearchBar
            placeholder={t('common.search-event')}
            className="w-full"
            onSearch={(e, input) => {
              e.preventDefault();
              push({
                pathname: '/search',
                query: { ...query, search: input },
              });
            }}
            value={(query?.search as string) ?? ''}
          />
          {/* <div className="flex">
            <div className="mx-1 flex-1">
              <AutoCompleteInput
                items={locations}
                selected={
                  locations.find((v) => v.id === selected.id) || locations[0]
                }
                setSelected={(event) => {
                  setSelected(event);
                  push({
                    pathname: '/search',
                    query: { ...query, location: event.value.split('.')[1] },
                  });
                  return event;
                }}
                leftIcon={<MapPinIcon />}
                leftIconClassName="text-secondary"
              />
            </div>
            <Button
              className="mt-1 px-4"
              iconClassName="text-primary"
              variant="secondary"
              icon={<AdjustmentsHorizontalIcon />}
              onClick={() => setFilterModal(true)}
            >
              Filter
            </Button>
            <FilterModal
              show={filterModal}
              onClose={() => setFilterModal(false)}
            />
          </div> */}
        </div>
        <div className="mx-auto max-w-5xl">
          <CategorySelection
            title={t('search-page.search-results')}
            onSelect={(category) =>
              push({ query: { ...query, category: category } })
            }
          />
          <InfiniteScroll
            className="mt-4"
            dataLength={data?.length || 0}
            next={() => setSize(size + 1)}
            hasMore={!isReachingEnd}
            loader={
              <div className="flex flex-col gap-[0.625rem]">
                {Array.from({ length: 8 }).map((_, index) => (
                  <EventCardSkeleton isLandscape key={index} />
                ))}
              </div>
            }
            scrollThreshold={0.6}
          >
            <div className="flex flex-col gap-[0.625rem]">
              {data &&
                data.map((events) =>
                  events.data.map((event) => {
                    const isActive = !!interestedEvents.find(
                      (_event) => _event.id === event.id
                    );

                    const date = translateDate(
                      event.attributes.date.start_date,
                      i18n.language
                    );
                    const time = translateTime(
                      convertTime(event.attributes.times[0].start_time),
                      i18n.language
                    );

                    return (
                      <EventCard
                        isLandscape
                        key={event.id}
                        img={event.attributes.image_src}
                        date={date}
                        time={time}
                        location={''}
                        title={getTranslatedText(
                          event.attributes.name,
                          i18n.language
                        )}
                        href={`/event/${event.id}`}
                        isActive={isActive}
                        onInterested={() => {
                          setInterestedEvents(event);
                        }}
                      />
                    );
                  })
                )}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
};
