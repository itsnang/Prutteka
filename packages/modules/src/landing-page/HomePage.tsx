import { NextPage } from 'next';
import { CategorySelection } from '../shared';
import { useEffect, useState } from 'react';
import { Banner, Carousel, EventCard, SeoMeta } from 'ui';

// mock data
// will be removed
import { EVENTDATA } from '../constants';
const CAROUSEL = [
  { title: '32nd SEA Games', img: '/seagame-2023.jpg' },
  { title: 'HSC - Final 2022', img: '/football-cup.jpg' },
];

import { useTypeSafeTranslation } from '../shared-hooks';
import { useLocalInterestedEvent } from '../event';

export const HomePage: NextPage = () => {
  const { t } = useTypeSafeTranslation();
  const [interestedEvents, setInterestedEvents] = useLocalInterestedEvent();

  return (
    <>
      <SeoMeta title="Prutteka" description="" />
      <div className="mb-8 space-y-4 lg:space-y-8">
        <Carousel
          autoplay
          breakpoints={{
            640: {
              slidesPerView: 1.25,
            },
            768: {
              slidesPerView: 1.5,
            },
            1024: {
              slidesPerView: 1.75,
            },
          }}
          slidesPerView={1}
          title={t('home-page.spotlight-events') || ''}
          navigation
          pagination
          titleClassName="text-lg md:text-xl lg:text-3xl font-bold"
        >
          {(Slide) =>
            CAROUSEL.map((carousel, idx) => (
              <Slide key={idx} className="pb-8">
                <Banner img={carousel.img} title={carousel.title} />
              </Slide>
            ))
          }
        </Carousel>
        <CategorySelection title={t('home-page.spotlight-events') || ''} />
        <div className="flex justify-center">
          <div className="grid grid-cols-1 place-items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
            {EVENTDATA.map((event) => {
              const isActive = !!interestedEvents.find(
                (_event) => _event.id === event.id
              );
              return (
                <EventCard
                  key={event.id}
                  img={event.img}
                  date={event.date}
                  time={event.time}
                  location={event.location}
                  title={event.title}
                  href={`/event/${event.id}`}
                  isActive={isActive}
                  onInterested={() => {
                    try {
                      const newInterestedEvents = isActive
                        ? interestedEvents.filter(
                            (_event) => _event.id !== event.id
                          )
                        : [...interestedEvents, event];

                      setInterestedEvents(newInterestedEvents);
                    } catch (error) {
                      window.localStorage.removeItem('interested-event');
                      setInterestedEvents([event]);
                    }
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
