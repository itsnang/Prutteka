import { EventCard } from 'ui';

import { ComponentMeta, ComponentStory } from '@storybook/react';

const EVENT = {
  date: 'Sat, Nov 26',
  time: '9:00 AM',
  title: 'Business Development',
  location: 'Phnom Penh',
  img: '/event_poster1.jpg',
  id: 1,
};

export default {
  title: 'UI/EventCard',
  component: EventCard,
  args: {
    href: '/',
    location: EVENT.location,
    date: EVENT.date,
    time: EVENT.time,
    img: EVENT.img,
    title: EVENT.title,
  },
} as ComponentMeta<typeof EventCard>;

const Template: ComponentStory<typeof EventCard> = (args) => (
  <EventCard {...args} />
);

export const Default = Template.bind({});
Default.args = {};

export const Landscape = Template.bind({});
Landscape.args = {
  isLandscape: true,
  onDelete: undefined,
};
