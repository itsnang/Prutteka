import { EventCardSkeleton, SeoMeta, Typography } from 'ui';
import { UserEventCard } from './UserEventCard';
import { useTypeSafeTranslation } from 'shared-utils/hooks';
import useSWRInfinite from 'swr/infinite';
import { APIResponseEvents } from 'custom-types';
import { fetcher, translateDate } from '../helpers';
import InfiniteScroll from 'react-infinite-scroll-component';
import { translateTime } from '../helpers/translateTime';
import axios from 'axios';
import { auth } from 'firebase-config';
import { useAuth } from '../auth';

const PAGE_SIZE = 12;

const getKey =
  (userId: string) => (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData?.data.length) return null; // reached the end
    return `/events?filter[organizer]=${userId}&page[offset]=${pageIndex}&page[limit]=${PAGE_SIZE}`; // SWR key
  };

export const MyEventPage = () => {
  const { t, i18n } = useTypeSafeTranslation();
  const userId = useAuth((state) => state.id);

  const { data, size, setSize, mutate } = useSWRInfinite<APIResponseEvents>(
    getKey(userId),
    fetcher
  );

  console.log(data);

  const isEmpty = data?.[0]?.data.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.data.length < PAGE_SIZE);

  const handleDeleteEvent = async (id: string) => {
    try {
      await axios.delete(`/events/${id}`, {
        headers: {
          Authorization: 'Bearer ' + (await auth.currentUser?.getIdToken()),
        },
      });

      mutate();
    } catch (error) {
      console.log(error);
    }
  };

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
            <div className="mt-4 grid w-full grid-cols-1 gap-4">
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
                    event.attributes.date.start_date,
                    i18n.language
                  );
                  const time = translateTime(
                    event.attributes.times[0].start_time,
                    i18n.language
                  );

                  return (
                    <UserEventCard
                      id={event.id}
                      key={event.id}
                      img={event.attributes.image_src}
                      title={event.attributes.name.en}
                      location={''}
                      date={date}
                      time={time}
                      href=""
                      onDelete={() => handleDeleteEvent(event.id)}
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
