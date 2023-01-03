import { AutoCompleteInput } from 'ui';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { StarIcon, UserIcon, MapPinIcon } from '@heroicons/react/24/outline';

const Icon = {
  StarIcon,
  UserIcon,
  MapPinIcon,
};

export default {
  title: 'Form/AutoCompleteInput',
  component: AutoCompleteInput,
  argTypes: {
    leftIcon: {
      control: 'select',
      options: Object.keys(Icon),
      mapping: Icon,
    },
  },
} as ComponentMeta<typeof AutoCompleteInput>;

const items = [
  { id: 1, name: 'Wade Cooper', value: 'Wade Cooper' },
  { id: 2, name: 'Arlene Mccoy', value: 'Arlene Mccoy' },
  { id: 3, name: 'Devon Webb', value: 'Devon Webb' },
  { id: 4, name: 'Tom Cook', value: 'Tom Cook' },
  { id: 5, name: 'Tanya Fox', value: 'Tanya Fox' },
  { id: 6, name: 'Hellen Schmidt', value: 'Hellen Schmidt' },
];
export const Default: ComponentStory<typeof AutoCompleteInput> = ({
  leftIcon,
}) => {
  const [selected, setSelected] = useState(items[0]);
  return (
    <AutoCompleteInput
      items={items}
      selected={selected}
      setSelected={(v) => {
        setSelected(v);
        return v;
      }}
      leftIcon={leftIcon}
    />
  );
};

Default.args = {
  leftIcon: Icon.UserIcon,
};
