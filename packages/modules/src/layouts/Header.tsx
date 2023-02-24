import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import { SearchBar, Button } from 'ui';
import { ProfileMenu } from './ProfileMenu';
import { StarIcon, Bars3Icon } from '@heroicons/react/24/solid';
import { useTypeSafeTranslation } from 'shared-utils/hooks';
import { Sidebar } from './Sidebar';
import { useTokenStore } from '../auth';

import { auth } from 'firebase-config';
import { signOut, onAuthStateChanged } from 'firebase/auth';

export const Header: React.FC = () => {
  const router = useRouter();
  const { t } = useTypeSafeTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const hasToken = useTokenStore((s) => !!s.refreshToken);
  const setToken = useTokenStore((state) => state.setToken);
  const clearToken = useTokenStore((state) => state.clearToken);

  useEffect(() => {
    const handleRouteChange = () => {
      setIsSidebarOpen(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setToken(token);
      } else {
        clearToken();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [setToken, clearToken]);

  const changeLocale = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, {
      locale: newLocale,
    });
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>, input: string) => {
    e.preventDefault();
    router.push({
      pathname: '/search',
      query: { search: input },
    });
  };

  const changeTo = router.locale === 'en' ? 'kh' : 'en';
  const isSearchPage = router.pathname === '/search';
  const isInterestedPage = router.asPath === '/user/interested';
  const isEventSubmitPage = router.asPath === '/event/submit';

  const searchComponent = isSearchPage ? null : (
    <div className="hidden lg:block">
      <SearchBar
        placeholder={t('common.search-event') || ''}
        onSearch={handleSearch}
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
    <nav className=" fixed top-0 z-20 w-screen border-b border-gray-100 bg-white">
      <div className="mx-auto flex max-w-5xl justify-between py-2 px-4">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              height={52}
              width={132.5}
              className="h-10 w-auto sm:h-auto sm:max-h-[3.25rem]"
              priority
            />
          </Link>

          {searchComponent}
        </div>
        <div className="flex divide-gray-300 md:space-x-4 md:divide-x">
          <div className="flex gap-2">
            {hasToken && !isEventSubmitPage ? (
              <div className="hidden sm:block">
                <Button
                  as="link"
                  href="/event/submit"
                  className="px-6"
                  hasShadow
                >
                  {t('common.submit-event')}
                </Button>
              </div>
            ) : null}

            <div className="xs:block hidden">
              <Button
                variant="secondary"
                onClick={() => changeLocale(changeTo)}
              >
                {t('common.language')}
              </Button>
            </div>

            {isInterestedPage ? null : (
              <Button
                as="link"
                href="/user/interested"
                variant="secondary"
                icon={<StarIcon />}
                className="text-tertiary"
              />
            )}

            <Button
              variant="secondary"
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Bars3Icon className="h-6 w-6" />
            </Button>
          </div>

          {hasToken ? (
            <div className="pl-2 md:pl-4">
              <ProfileMenu
                onLogout={async () => {
                  clearToken();
                  await signOut(auth);
                  router.push('/login');
                }}
              />
            </div>
          ) : (
            <div className="hidden gap-2 pl-2 md:flex md:pl-4">
              {authButton}
            </div>
          )}
        </div>
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}>
        <div className="xs:space-x-0 flex w-full space-x-2">
          <div className="xs:hidden block">
            <Button variant="secondary" onClick={() => changeLocale(changeTo)}>
              {t('common.language')}
            </Button>
          </div>
          <SearchBar
            className="w-full"
            placeholder={t('common.search-event') || ''}
            onSearch={handleSearch}
          />
        </div>
        <div className="my-3 mx-2 w-full border-b-2 border-gray-100 md:hidden" />
        <div className="flex w-full flex-col space-y-2 md:hidden">
          {hasToken ? (
            <Button
              as="link"
              href="/event/submit"
              className="px-6 sm:hidden"
              hasShadow
            >
              {t('common.submit-event')}
            </Button>
          ) : (
            authButton
          )}
        </div>
      </Sidebar>
    </nav>
  );
};
