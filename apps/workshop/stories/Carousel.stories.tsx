import { Banner, Carousel } from 'ui';

import 'swiper/swiper-bundle.min.css';

import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'UI/Carousel',
  component: Carousel,
  args: {
    autoplay: true,
    breakpoints: {
      640: {
        slidesPerView: 1.25,
      },
      768: {
        slidesPerView: 1.5,
      },
      1024: {
        slidesPerView: 1.75,
      },
    },
    slidesPerView: 1,
    children: (Slide) =>
      CAROUSEL.map((carousel, idx) => (
        <Slide key={idx} className="pb-8">
          <Banner img={carousel.img} title={carousel.title} />
        </Slide>
      )),
  },
  argTypes: {
    autoplay: { type: 'boolean' },
  },
} as ComponentMeta<typeof Carousel>;

const Template: ComponentStory<typeof Carousel> = (args) => (
  <Carousel {...args} />
);

const CAROUSEL = [
  { title: '32nd SEA Games', img: '/seagame-2023.jpg' },
  { title: 'HSC - Final 2022', img: '/football-cup.jpg' },
  { title: 'Business Development', img: '/event_poster1.jpg' },
];

export const Default = Template.bind({});
Default.args = {
  pagination: true,
};

export const WithHeader = Template.bind({});
WithHeader.args = {
  title: 'Carousel',
  titleClassName: 'text-xl md:text-2xl lg:text-3xl font-bold',
  navigation: true,
  pagination: true,
};
