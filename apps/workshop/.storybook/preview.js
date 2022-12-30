import i18n from './i18n';
import NextLink from 'next/link';

import '../../web/src/styles/globals.css';

const OriginalNextLink = NextLink;

Object.defineProperty(NextLink, 'default', {
  configurable: true,
  value: (props) => <OriginalNextLink {...props} legacyBehavior={false} />,
});

export const decorators = [
  // other decorators...
  i18n,
];

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', right: 'en', title: 'English' },
        { value: 'kh', right: 'kh', title: 'Khmer' },
      ],
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
