import { useState } from 'react';
import { NextPage } from 'next';
import { CategorySelection } from '../shared';
import { EventCard, EventCardSkeleton, SeoMeta } from 'ui';

// mock data
// will be removed
// import { EVENTDATA } from '../constants';
// const CAROUSEL = [
//   { title: '32nd SEA Games', img: '/seagame-2023.jpg' },
//   { title: 'HSC - Final 2022', img: '/football-cup.jpg' },
// ];

import { useTypeSafeTranslation } from 'shared-utils/hooks';
import { useLocalInterestedEvent } from '../event';
import { translateDate } from '../helpers';
import { translateTime } from '../helpers/translateTime';

import { APIResponseEvents } from 'custom-types';
import useSWRInfinite from 'swr/infinite';
import { fetcher } from '../helpers';
import InfiniteScroll from 'react-infinite-scroll-component';

interface HomePageProps {
  initialData?: APIResponseEvents[];
}

const PAGE_SIZE = 9;

const getKey =
  (category: string) => (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData?.data.length) return null; // reached the end
    return `/events?filter[category]=${category}&page[offset]=${pageIndex}&page[limit]=${PAGE_SIZE}`; // SWR key
  };

export const HomePage: NextPage<HomePageProps> = ({ initialData }) => {
  const { t, i18n } = useTypeSafeTranslation();
  const [interestedEvents, setInterestedEvents] = useLocalInterestedEvent();
  const [category, setCategory] = useState<string>('all');
  const { data, size, setSize } = useSWRInfinite<APIResponseEvents>(
    getKey(category),
    fetcher,
    {
      fallbackData: initialData,
    }
  );

  const isEmpty = data?.[0]?.data.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.data.length < PAGE_SIZE);

  return (
    <>
      <SeoMeta title="Prutteka" description="" />
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
              <div className="mt-4 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 9 }).map((_, index) => (
                  <EventCardSkeleton key={index} />
                ))}
              </div>
            }
            scrollThreshold={0.6}
          >
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data &&
                data.map((events) =>
                  events.data.map((event) => {
                    const isActive = !!interestedEvents.find(
                      (_event) => _event.id === event.id
                    );

                    const date = translateDate(
                      event.attributes.date_time.start_date,
                      i18n.language
                    );
                    const time = translateTime(
                      event.attributes.date_time.times[0].start_time,
                      i18n.language
                    );
                    const location = t(
                      ('locations.' + event.attributes.location) as any
                    );

                    return (
                      <EventCard
                        key={event.id}
                        img={event.attributes.image_src}
                        date={date}
                        time={time}
                        location={location}
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
