import translations from '../../../../apps/web/public/locales/en/translation.json';
import { convertJsonToObjectKey } from '../helpers';

export const CATEGORIES = convertJsonToObjectKey(
  translations.categories,
  (v) => 'categories.' + v
);
