import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { SearchBar, Button } from 'ui';
import { StarIcon } from '@heroicons/react/24/solid';

export const Header: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation('translation');

  const changeLocale = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, {
      locale: newLocale,
    });
  };

  const changeTo = router.locale === 'en' ? 'kh' : 'en';

  return (
    <nav className=" fixed top-0 z-10 w-screen border-b border-gray-100 bg-white">
      <div className="mx-auto flex max-w-5xl justify-between py-2">
        <div className="flex gap-4">
          <Link href="/">
            <Image src="/Logo.png" alt="Logo" height={52} width={132.5} />
          </Link>
          <SearchBar
            placeholder={t('common.search-event')}
            onSearch={(e) => {
              e.preventDefault();
              router.push('/search');
            }}
          />
        </div>
        <div className="flex space-x-4 divide-x divide-gray-300">
          <div className="flex gap-2 ">
            <Button variant="secondary" onClick={() => changeLocale(changeTo)}>
              {t('common.language')}
            </Button>
            <Button
              as="link"
              href="/user/interested"
              variant="secondary"
              icon={StarIcon}
              className="text-tertiary"
            />
          </div>

          <div className="flex gap-2 pl-4">
            <Button
              as="link"
              href="/login"
              variant="secondary"
              className="px-8"
            >
              Log In
            </Button>
            <Button
              as="link"
              href="/register"
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
