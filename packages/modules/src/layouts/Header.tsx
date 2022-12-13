import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { SearchBar, ButtonInterested, Button } from 'ui';
import { StarIcon } from '@heroicons/react/24/solid';
export const Header: React.FC = () => {
  return (
    <nav className=" fixed top-0 z-10 w-screen border-b border-gray-100 bg-white">
      <div className="mx-auto flex max-w-5xl justify-between py-2">
        <div className="flex gap-4">
          <Image src="/Logo.png" alt="Logo" height={52} width={132.5} />
          <SearchBar placeholder="Search Events" onSearch={() => {}} />
        </div>
        <div className="flex space-x-4 divide-x divide-gray-300">
          <div className="flex gap-2 ">
            <Button variant="secondary">EN</Button>
            <Button
              variant="secondary"
              icon={StarIcon}
              className="text-tertiary"
            />
          </div>

          <div className="flex gap-2 pl-4">
            <Button as="link" href="" variant="secondary" className="px-8">
              Log In
            </Button>
            <Button
              as="link"
              href=""
              variant="primary"
              className="px-8"
              hasShadow
            >
              Register
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
