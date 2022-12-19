import 'i18next';

import common from '../../../apps/web/public/locales/en/common.json';
import translation from '../../../apps/web/public/locales/en/translation.json';

interface I18nNamespaces {
  translation: typeof translation;
}

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: I18nNamespaces;
  }
}
