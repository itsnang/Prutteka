import { NextPage } from 'next';
import { CategorySelection } from '../shared';
import { Banner, Carousel, EventCard, SeoMeta } from 'ui';

// mock data
// will be removed
import { EVENTDATA } from '../constants';
const CAROUSEL = [
  { title: '32nd SEA Games', img: '/seagame-2023.jpg' },
  { title: 'HSC - Final 2022', img: '/football-cup.jpg' },
];

import { useTypeSafeTranslation } from 'shared-utils/hooks';
import { useLocalInterestedEvent } from '../event';
import { translateDate } from '../helpers';
import { translateTime } from '../helpers/translateTime';

import { APIResponseEvents } from 'custom-types';

interface HomePageProps {
  data: APIResponseEvents;
}

export const HomePage: NextPage<HomePageProps> = ({ data }) => {
  const { t, i18n } = useTypeSafeTranslation();
  const [interestedEvents, setInterestedEvents] = useLocalInterestedEvent();

  const events = data.data;

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
          titleClassName="text-xl md:text-2xl font-bold"
        >
          {(Slide) =>
            CAROUSEL.map((carousel, idx) => (
              <Slide key={idx} className="pb-8">
                <Banner img={carousel.img} title={carousel.title} />
              </Slide>
            ))
          }
        </Carousel>
        <CategorySelection title={t('home-page.explore') || ''} />
        <div className="flex justify-center">
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => {
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
            })}
          </div>
        </div>
      </div>
    </>
  );
};
