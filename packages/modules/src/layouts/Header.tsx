import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { SearchBar, Button } from 'ui';
import { StarIcon, Bars3Icon } from '@heroicons/react/24/solid';
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
  }, [router.events]);

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
        className="px-8 md:w-32"
        fullWidth
      >
        {t('common.login')}
      </Button>
      <Button
        as="link"
        href="/register"
        variant="primary"
        className="px-8 md:w-32"
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
              className="h-10 w-auto sm:h-auto sm:max-h-[3.25rem]"
            />
          </Link>

          {searchComponent}
        </div>
        <div className="flex divide-gray-300 md:space-x-4 md:divide-x">
          <div className="flex items-center gap-2">
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

            <Button
              variant="secondary"
              className="md:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Bars3Icon className="h-6 w-6" />
            </Button>
          </div>

          <div className="hidden gap-2 pl-4 md:flex">{authButton}</div>
        </div>
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}>
        <SearchBar
          className="w-full"
          placeholder={t('common.search-event') || ''}
          onSearch={(e) => {
            e.preventDefault();
            router.push('/search');
          }}
        />
        <div className="my-3 mx-2 w-full border-b-2 border-gray-100" />
        {authButton}
      </Sidebar>
    </nav>
  );
};
