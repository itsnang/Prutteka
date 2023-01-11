import { Button } from 'ui';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import {
  StarIcon,
  ArrowDownCircleIcon,
  ArrowLeftOnRectangleIcon,
  ArrowUpOnSquareIcon,
} from '@heroicons/react/24/outline';

const Icon = {
  StarIcon,
  ArrowDownCircleIcon,
  ArrowLeftOnRectangleIcon,
  ArrowUpOnSquareIcon,
};

export default {
  title: 'UI/Button',
  component: Button,
  args: {
    children: 'Button',
    className: 'px-4',
  },
  argTypes: {
    icon: {
      control: 'select',
      options: Object.keys(Icon),
      mapping: Icon,
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
};

export const WithShadow = Template.bind({});
WithShadow.args = {
  hasShadow: true,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  icon: Icon.StarIcon,
};

export const Link = Template.bind({});
Link.args = {
  as: 'link',
  href: '/',
};
