import { Menu, Transition } from '@headlessui/react';
import { UserIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { Fragment } from 'react';

interface ProfileMenuProps {
  onLogout: () => void;
}

export const ProfileMenu: React.FC<ProfileMenuProps> = ({ onLogout }) => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="bg-primary-light text-primary flex h-12 w-12 items-center justify-center rounded-xl sm:h-14 sm:w-14">
        <UserIcon className="h-5 w-5 sm:h-6 sm:w-6" />
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
        <Menu.Items className="xs:max-w-xs absolute right-0 mt-2 flex w-screen max-w-[calc(100vw-32px)] flex-col space-y-2 rounded-xl border border-gray-100 bg-white p-4 shadow-lg">
          <div>Username: Huot Chhay</div>
          <Menu.Item>
            {({ active }) => (
              <Link
                className={`${
                  active ? 'bg-gray-100' : ''
                } rounded-xl border bg-white px-4 py-2`}
                href="/user/my-event"
              >
                My Events
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${
                  active ? 'bg-gray-100' : ''
                } rounded-xl border bg-white px-4 py-2 text-left`}
                onClick={onLogout}
              >
                Logout
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
