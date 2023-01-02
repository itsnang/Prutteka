import { Footer } from 'ui';

import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'UI/Footer',
  component: Footer,
} as ComponentMeta<typeof Footer>;

export const Default = () => {
  return <Footer />;
};
