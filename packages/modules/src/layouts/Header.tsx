import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { SearchBar, Button } from 'ui';
import {
  StarIcon,
  Bars3BottomRightIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid';
import { useTypeSafeTranslation } from '../shared-hooks';
import { Sidebar } from './Sidebar';
import { useEffect } from 'react';

export const Header: React.FC = () => {
  const router = useRouter();
  const { t } = useTypeSafeTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => {
      setIsSidebarOpen(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

  const changeLocale = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, {
      locale: newLocale,
    });
  };

  const changeTo = router.locale === 'en' ? 'kh' : 'en';
  const isSearchPage = router.pathname === '/search';
  const isInterestedPage = router.asPath === '/user/interested';

  const searchComponent = isSearchPage ? null : (
    <div className="hidden lg:block">
      <SearchBar
        placeholder={t('common.search-event') || ''}
        onSearch={(e) => {
          e.preventDefault();
          router.push('/search');
        }}
      />
    </div>
  );

  const authButton = (
    <>
      <Button
        as="link"
        href="/login"
        variant="secondary"
        className="min-w-[8rem] px-8"
        fullWidth
      >
        {t('common.login')}
      </Button>
      <Button
        as="link"
        href="/register"
        variant="primary"
        className="min-w-[8rem] px-8"
        hasShadow
        fullWidth
      >
        {t('common.register')}
      </Button>
    </>
  );

  return (
    <nav className=" fixed top-0 z-10 w-screen border-b border-gray-100 bg-white">
      <div className="mx-auto flex max-w-5xl justify-between py-2 px-4">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image
              src="/Logo.png"
              alt="Logo"
              height={52}
              width={132.5}
              className="h-[30px] w-auto sm:h-auto sm:max-h-[3.25rem]"
            />
          </Link>
          {searchComponent}
        </div>
        <div className="flex divide-gray-300 md:space-x-4 md:divide-x">
          <div className="flex items-center gap-2">
            {isSearchPage ? null : (
              <Link href="/search" className="mr-1 lg:hidden">
                <MagnifyingGlassIcon className="h-6 w-6 text-gray-600 sm:h-9 sm:w-9" />
              </Link>
            )}

            <Button variant="secondary" onClick={() => changeLocale(changeTo)}>
              {t('common.language')}
            </Button>

            {isInterestedPage ? null : (
              <Button
                as="link"
                href="/user/interested"
                variant="secondary"
                icon={StarIcon}
                className="text-tertiary"
              />
            )}

            <button
              className="ml-1 md:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Bars3BottomRightIcon className="h-6 w-6 sm:h-9 sm:w-9" />
            </button>
          </div>

          <div className="hidden gap-2 pl-4 md:flex">{authButton}</div>
        </div>
      </div>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        authButton={authButton}
      />
    </nav>
  );
};
