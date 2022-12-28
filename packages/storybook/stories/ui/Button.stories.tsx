import { ComponentStory, ComponentMeta } from '@storybook/react';
import * as Icon from '@heroicons/react/24/outline';
import { Button } from 'ui';

export default {
  title: 'UI/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
    hasShadow: {
      type: 'boolean',
    },
    className: {
      type: 'string',
    },
    fullWidth: {
      type: 'boolean',
    },
    icon: {
      control: 'select',
      options: Object.keys(Icon),
      mapping: Icon,
    },
    onClick: {
      action: { argTypesRegex: '^on.*' },
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Button',
  variant: 'primary',
  fullWidth: true,
  hasShadow: true,
  icon: Icon.BanknotesIcon,
};

export const Secondary = Template.bind({});
Secondary.args = {
  ...Primary.args,
  hasShadow: false,
  variant: 'secondary',
};
