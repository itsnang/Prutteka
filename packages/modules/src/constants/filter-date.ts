import translations from '../../../../apps/web/public/locales/en/translation.json';
import { convertJsonToObjectKey } from '../helpers';
import { TranslationKeys } from 'shared-utils/hooks';

export const FILTERDATE = convertJsonToObjectKey<TranslationKeys>(
  translations['filter-date'],
  (v) => ('filter-date.' + v) as TranslationKeys
);
