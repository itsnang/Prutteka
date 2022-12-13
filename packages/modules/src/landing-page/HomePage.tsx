import { NextPage } from 'next';
import { CategorySelection } from '../shared';
import { Banner, Carousel, EventCard } from 'ui';
import { EVENTDATA } from '../constants';

const CAROUSEL = [
  { title: '32nd SEA Games', img: '/seagame-2023.jpg' },
  { title: 'HSC - Final 2022', img: '/football-cup.jpg' },
];

export const HomePage: NextPage = () => {
  // const [selected, setSelected] = useState(LOCATIONS[0]);

  return (
    <div className="mb-8 space-y-8">
      <Carousel
        autoplay
        loop
        slidesPerView={1.75}
        title="Events"
        navigation
        titleClassName="text-3xl font-bold"
      >
        {(Slide) =>
          CAROUSEL.map((carousel, idx) => (
            <Slide key={idx}>
              <Banner img={carousel.img} title={carousel.title} />
            </Slide>
          ))
        }
      </Carousel>
      <CategorySelection title="Explore" />
      <div className="grid grid-cols-3 place-items-center gap-4">
        {EVENTDATA.map((event) => (
          <EventCard
            key={event.id}
            img={event.img}
            date={event.date}
            time={event.time}
            location={event.location}
            title={event.title}
            href="/"
          />
        ))}
      </div>
    </div>
  );
};
