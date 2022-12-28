import translations from '../../../../apps/web/public/locales/en/translation.json';
import { convertJsonToObjectKey } from '../helpers';
import { TranslationKeys } from 'shared-utils/hooks';

export const CATEGORIES = convertJsonToObjectKey<TranslationKeys>(
  translations.categories,
  (v) => ('categories.' + v) as TranslationKeys
);
