import React from 'react';
import { EventCardSkeleton, SeoMeta, Typography } from 'ui';
import { UserEventCard } from './UserEventCard';
import { EVENTDATA } from '../constants';
import { useTypeSafeTranslation } from 'shared-utils/hooks';
import useSWRInfinite from 'swr/infinite';
import { APIResponseEvents } from 'custom-types';
import { fetcher, translateDate } from '../helpers';
import InfiniteScroll from 'react-infinite-scroll-component';
import { translateTime } from '../helpers/translateTime';

const PAGE_SIZE = 12;

const getKey = (pageIndex: number, previousPageData: any) => {
  if (previousPageData && !previousPageData?.data.length) return null; // reached the end
  return `/events?page[offset]=${pageIndex}&page[limit]=${PAGE_SIZE}`; // SWR key
};

export const MyEventPage = () => {
  const { t, i18n } = useTypeSafeTranslation();
  const { data, size, setSize } = useSWRInfinite<APIResponseEvents>(
    getKey,
    fetcher
  );

  const isEmpty = data?.[0]?.data.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.data.length < PAGE_SIZE);

  return (
    <>
      <SeoMeta title="My Events - Prutteka" description="" />
      <div className="flex flex-col gap-6">
        <Typography className="md:text-xl lg:text-3xl" variant="h1" size="lg">
          {t('my-event-page.my-event')}
        </Typography>
        <InfiniteScroll
          dataLength={data?.length || 0}
          next={() => setSize(size + 1)}
          hasMore={!isReachingEnd}
          loader={
            <div className="mt-4 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 9 }).map((_, index) => (
                <EventCardSkeleton key={index} isLandscape />
              ))}
            </div>
          }
          scrollThreshold={0.6}
        >
          <div className="space-y-4">
            {data &&
              data.map((events) =>
                events.data.map((event) => {
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
                    <UserEventCard
                      id={event.id}
                      key={event.id}
                      img={event.attributes.image_src}
                      title={event.attributes.name.en}
                      location={location}
                      date={date}
                      time={time}
                      href=""
                    />
                  );
                })
              )}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
};
