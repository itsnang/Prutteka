import { Typography } from 'ui';

import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'UI/Typography',
  component: Typography,
  args: {
    children: 'Typography',
  },
} as ComponentMeta<typeof Typography>;

export const Default: ComponentStory<typeof Typography> = (args) => {
  return <Typography {...args} />;
};
