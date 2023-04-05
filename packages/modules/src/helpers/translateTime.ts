import { translateNumber } from './translateNumber';

export const translateTime = (time: string, lang: 'en' | 'km' = 'en') => {
  const [hour, minute] = time.split(':');
  const twelveHours = Number(hour) % 12 || 12;

  let meridien;
  if (lang === 'km') {
    if (Number(hour) > 12) {
      meridien = Number(hour) > 18 ? 'យប់' : 'រសៀល';
    } else {
      meridien = 'ព្រឹក';
    }
  } else {
    meridien = Number(hour) > 12 ? 'PM' : 'AM';
  }

  return `${translateNumber(twelveHours, lang)}:${translateNumber(
    ('0' + minute).slice(-2),
    lang
  )} ${meridien}`;
};
