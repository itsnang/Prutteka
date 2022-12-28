import translations from '../../../../apps/web/public/locales/en/translation.json';
import { convertJsonToObjectKey } from '../helpers';
import { TranslationKeys } from 'shared-utils/hooks';

export const LOCATIONS = convertJsonToObjectKey<TranslationKeys>(
  translations.locations,
  (v) => ('locations.' + v) as TranslationKeys
);
