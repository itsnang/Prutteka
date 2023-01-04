import { Button, Modal } from 'ui';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

export default {
  title: 'UI/Modal',
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = ({ title }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className="px-4">
        Open Modal
      </Button>
      <Modal show={isOpen} onClose={() => setIsOpen(false)} title={title}>
        <p>This is a modal</p>

        <div className="flex justify-end">
          <Button
            onClick={() => setIsOpen(false)}
            variant="secondary"
            className="px-4"
          >
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const WithTitle = Template.bind({});
WithTitle.args = {
  title: 'Example Modal',
};
