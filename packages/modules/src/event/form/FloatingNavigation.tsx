import { Menu, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  CalendarDaysIcon,
  ClockIcon,
  InformationCircleIcon,
  MapIcon,
  PhotoIcon,
  TicketIcon,
} from '@heroicons/react/24/solid';
import { Fragment } from 'react';

const items = [
  {
    page: 0,
    element: (
      <>
        <span className="bg-primary-light rounded-full p-2">
          <InformationCircleIcon className="text-primary h-6 w-6" />
        </span>
        <span>Detail</span>
      </>
    ),
  },
  {
    page: 1,
    element: (
      <>
        <span className="bg-tertiary-light rounded-full p-2">
          <ClockIcon className="text-tertiary h-6 w-6" />
        </span>
        <span>Date and time</span>
      </>
    ),
  },
  {
    page: 2,
    element: (
      <>
        <span className="bg-secondary-light rounded-full p-2">
          <MapIcon className="text-secondary h-6 w-6" />
        </span>
        <span>Location</span>
      </>
    ),
  },
  {
    page: 3,
    element: (
      <>
        <span className="bg-primary-light rounded-full p-2">
          <CalendarDaysIcon className="text-primary h-6 w-6" />
        </span>
        <span className="space-x-2">
          <span>Schedule</span>
          <span className="text-gray-500">(optional)</span>
        </span>
      </>
    ),
  },
  {
    page: 4,
    element: (
      <>
        <span className="bg-secondary-light rounded-full p-2">
          <TicketIcon className="text-secondary h-6 w-6" />
        </span>
        <span>Join Method</span>
      </>
    ),
  },
  {
    page: 5,
    element: (
      <>
        <span className="gradient-text from-primary-light to-secondary-light rounded-full bg-gradient-to-r bg-[length:200%] p-2">
          <PhotoIcon className="text-primary h-6 w-6" />
        </span>
        <span className="space-x-2">
          <span className="gradient-text from-primary to-secondary whitespace-nowrap bg-gradient-to-r bg-[length:200%] bg-clip-text font-bold text-transparent">
            Dynamic Content
          </span>
          <span className="text-gray-500">(optional)</span>
        </span>
      </>
    ),
  },
];

export const FloatingNavigation = ({
  setPage,
}: {
  setPage: (page: number) => void;
}) => {
  return (
    <div className="flex justify-end">
      <Menu as="div" className="fixed bottom-4 z-10 flex items-end justify-end">
        <Menu.Button
          type="button"
          className="border-primary-light bg-primary-light/50 text-primary flex h-14 w-14 items-center justify-center rounded-full border-2 font-medium shadow backdrop-blur-sm focus:outline-none"
        >
          <Bars3Icon className="h-6 w-6" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute bottom-full right-0 mb-2 w-screen max-w-xs divide-y divide-gray-100 rounded-xl bg-white shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
            {items.map((item, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <button
                    type="button"
                    className={`${
                      active ? 'bg-gray-50' : 'text-gray-700'
                    } flex w-full items-center space-x-4 rounded-lg px-4 py-2 font-medium`}
                    onClick={() => setPage(item.page)}
                  >
                    {item.element}
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
