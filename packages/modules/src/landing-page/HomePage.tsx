import { useState } from 'react';
import { NextPage } from 'next';
import { CategorySelection } from '../shared';
import { EventCard, EventCardSkeleton, SeoMeta } from 'ui';

import { useTypeSafeTranslation } from 'shared-utils/hooks';
import { useLocalInterestedEvent } from '../event';
import { convertTime, getTranslatedText, translateDate } from '../helpers';
import { translateTime } from '../helpers/translateTime';

import { APIResponseEvents } from 'custom-types';
import useSWRInfinite from 'swr/infinite';
import { fetcher } from '../helpers';
import InfiniteScroll from 'react-infinite-scroll-component';
import { format } from 'date-fns';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

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
    return `/events?filter[category]=${category}&filter[end_date][gte]=${today}&page[offset]=${pageIndex}&page[limit]=${PAGE_SIZE}`; // SWR key
  };
const getPrevKey = (pageIndex: number, previousPageData: any) => {
  if (previousPageData && !previousPageData?.data.length) return null; // reached the end
  return `/events?page[offset]=${pageIndex}&page[limit]=${PAGE_SIZE}`; // SWR key
};

export const HomePage: NextPage<HomePageProps> = ({ initialData }) => {
  const { t, i18n } = useTypeSafeTranslation();
  const [interestedEvents, setInterestedEvents] = useLocalInterestedEvent();
  const [category, setCategory] = useState<string>('all');
  const { data, size, setSize } = useSWRInfinite<APIResponseEvents>(
    getKey(category),
    fetcher
  );

  const {
    data: prevData,
    size: preSize,
    setSize: prevSetSize,
  } = useSWRInfinite<APIResponseEvents>(getPrevKey, fetcher);

  const isEmpty = data?.[0]?.data.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.data.length < PAGE_SIZE);
  const isPrevEmpty = prevData?.[0]?.data.length === 0;
  const isPrevReachingEnd =
    isPrevEmpty ||
    (prevData && prevData[prevData.length - 1]?.data.length < PAGE_SIZE);

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
            {data && data[0].data.length === 0 && (
              <div className="my-12 flex flex-col text-center">
                <span className="text-[80px] md:text-[100px]">😵</span>
                <span className="text-gray-600">
                  {t('home-page.no-events')}
                </span>
              </div>
            )}
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
                      convertTime(event.attributes.times[0].start_time),
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

      <div className="mb-8 space-y-4 lg:space-y-8">
        <Disclosure defaultOpen={true}>
          {({ open }) => (
            <div className="mt-4">
              <Disclosure.Button className="gradient-text from-primary to-secondary border-primary-light flex items-center justify-between space-x-4 rounded-2xl border-2 bg-gradient-to-r bg-[length:200%] bg-clip-text px-4 py-2 text-transparent md:border-4">
                <span className="text-md font-medium md:text-xl">
                  {t('home-page.previously-on-prutteka')}
                </span>
                <ChevronDownIcon className="text-primary h-4 w-4 md:h-6 md:w-6" />
              </Disclosure.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className="mt-4">
                  <InfiniteScroll
                    dataLength={prevData?.length || 0}
                    next={() => prevSetSize(preSize + 1)}
                    hasMore={!isPrevReachingEnd}
                    loader={
                      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {Array.from({ length: 8 }).map((_, index) => (
                          <EventCardSkeleton key={index} />
                        ))}
                      </div>
                    }
                    scrollThreshold={0.6}
                  >
                    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {prevData &&
                        prevData.map((events) =>
                          events.data.map((event, index) => {
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
                </Disclosure.Panel>
              </Transition>
            </div>
          )}
        </Disclosure>
      </div>
    </>
  );
};
