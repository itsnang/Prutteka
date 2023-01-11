import { appWithTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

const ns = ['common', 'translation'];
const locales = ['en', 'kh'];

const resources = ns.reduce((acc, n) => {
  locales.forEach((lng) => {
    if (!acc[lng]) acc[lng] = {};
    acc[lng] = {
      ...acc[lng],
      [n]: require(`../../../apps/web/public/locales/${lng}/${n}.json`),
    };
  });
  return acc;
}, {});

export default (Story, context) => {
  const [locale, setLocale] = useState('en');

  const _nextI18Next = {
    ns,
    initialLocale: locale,
    initialI18nStore: {
      [locale]: {
        ...resources[locale],
      },
    },
    userConfig: {
      resources,
      i18n: {
        locales,
        defaultLocale: 'en',
      },
    },
  };

  useEffect(() => {
    setLocale(context.globals.locale);
  }, [context.globals.locale]);

  const AppWithTranslation = appWithTranslation(Story);

  return (
    <AppWithTranslation
      pageProps={{
        _nextI18Next,
      }}
    />
  );
};
