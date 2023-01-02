import { Banner } from 'ui';

import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'UI/Banner',
  component: Banner,
} as ComponentMeta<typeof Banner>;

const Template: ComponentStory<typeof Banner> = (args) => <Banner {...args} />;

export const Default = Template.bind({});
Default.args = {
  img: '/event_poster1.jpg',
  title: 'Bussiness Development',
};
