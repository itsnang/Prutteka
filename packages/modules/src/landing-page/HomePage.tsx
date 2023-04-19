import { useState } from 'react';
import { NextPage } from 'next';
import { CategorySelection } from '../shared';
import { EventCard, EventCardSkeleton, SeoMeta } from 'ui';

import { useTypeSafeTranslation } from 'shared-utils/hooks';
import { useLocalInterestedEvent } from '../event';
import { getTranslatedText, translateDate } from '../helpers';
import { translateTime } from '../helpers/translateTime';

import { APIResponseEvents } from 'custom-types';
import useSWRInfinite from 'swr/infinite';
import { fetcher } from '../helpers';
import InfiniteScroll from 'react-infinite-scroll-component';
import { format } from 'date-fns';

interface HomePageProps {
  initialData?: APIResponseEvents[];
}

const PAGE_SIZE = 8;

const getKey =
  (category: string) => (pageIndex: number, previousPageData: any) => {
    // date format as 2023-12-31
    const today = format(
      new Date(new Date().setHours(0, 0, 0, 0)),
      'yyyy-MM-dd'
    );

    if (previousPageData && !previousPageData?.data.length) return null; // reached the end
    return `/events?filter[category]=${category}&filter[start_date][gte]=${today}&filter[end_date][gte]=${today}&page[offset]=${pageIndex}&page[limit]=${PAGE_SIZE}`; // SWR key
  };

export const HomePage: NextPage<HomePageProps> = ({ initialData }) => {
  const { t, i18n } = useTypeSafeTranslation();
  const [interestedEvents, setInterestedEvents] = useLocalInterestedEvent();
  const [category, setCategory] = useState<string>('all');
  const { data, size, setSize } = useSWRInfinite<APIResponseEvents>(
    getKey(category),
    fetcher
  );

  const isEmpty = data?.[0]?.data.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.data.length < PAGE_SIZE);

  return (
    <>
      <SeoMeta
        title="ព្រឹត្តិការណ៍ - Prutteka"
        description="Experience the ultimate solution for events, venues, and attractions in Cambodia with ព្រឹត្តិការណ៍ - Prutteka. Revel in the our system, offering dynamic content to provide more information for your events, whether it is sports, concerts or conventions."
      />
      <div className="mb-8 space-y-4 lg:space-y-8">
        <CategorySelection
          title={t('home-page.explore')}
          onSelect={(category) => setCategory(category)}
        />
        <div className="flex flex-col">
          <InfiniteScroll
            dataLength={data?.length || 0}
            next={() => setSize(size + 1)}
            hasMore={!isReachingEnd}
            loader={
              <div className="mt-4 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <EventCardSkeleton key={index} />
                ))}
              </div>
            }
            scrollThreshold={0.6}
          >
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
