import translations from '../../../../apps/web/public/locales/en/translation.json';
import { convertJsonToObjectKey } from '../helpers';

export const LOCATIONS = convertJsonToObjectKey(
  translations.locations,
  (v) => 'locations.' + v
);
