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
import { translateDate, fetcher } from '../helpers';
import { translateTime } from '../helpers/translateTime';

import { APIResponseEvents } from 'custom-types';
import useSWRInfinite from 'swr/infinite';
import InfiniteScroll from 'react-infinite-scroll-component';

interface SearchPageProps {
  initialData: APIResponseEvents;
}

const PAGE_SIZE = 9;

const getKey =
  (category: string) => (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData?.data.length) return null; // reached the end
    return `/events?filter[category]=${category}&page[offset]=${pageIndex}&page[limit]=${PAGE_SIZE}`; // SWR key
  };

export const Search = ({ initialData }: SearchPageProps) => {
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
      <SeoMeta title="Search | ព្រឹត្តិការណ៍​ - Prutteka" description="" />

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
            dataLength={data?.length || 0}
            next={() => setSize(size + 1)}
            hasMore={!isReachingEnd}
            loader={
              <div className="flex flex-col gap-[0.625rem]">
                {Array.from({ length: 9 }).map((_, index) => (
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
                      event.attributes.times[0].start_time,
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
                        title={event.attributes.name.en}
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
