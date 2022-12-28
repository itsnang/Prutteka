import { useTranslation } from 'next-i18next';

import translations from '../../../apps/web/public/locales/en/translation.json';

type Join<S1, S2> = S1 extends string
  ? S2 extends string
    ? `${S1}.${S2}`
    : never
  : never;

type Paths<T> = {
  [K in keyof T]: T[K] extends Record<string, unknown>
    ? Join<K, Paths<T[K]>>
    : K;
}[keyof T];

export type TranslationKeys = Paths<typeof translations>;

export const useTypeSafeTranslation = () => {
  const { t } = useTranslation('translation');
  return {
    t: (s: TranslationKeys) => t(s),
  };
};
