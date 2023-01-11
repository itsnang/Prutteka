import { number } from 'yup';
import { translateNumber } from './translateNumber';

export const getDuration = (
  startTime: string,
  endTime: string,
  lang: 'en' | 'kh' = 'en'
) => {
  const startTimes = startTime.split(':');
  const endTimes = endTime.split(':');

  let startHour = Number(startTimes[0]);
  let startMinute = Number(startTimes[1]);
  let endHour = Number(endTimes[0]);
  let endMinute = Number(endTimes[1]);
  if (endMinute < startMinute) {
    endHour = endHour - 1;
    endMinute = 60 + endMinute;
  }
  const minute = endMinute - startMinute;
  const hour = endHour - startHour;
  let h = 'h';
  let mns = 'mns';

  if (lang === 'kh') {
    h = 'ម៉ោង';
    mns = 'នាទី';
  }
  if (hour <= 0) {
    return translateNumber(minute, lang) + mns;
  } else if (minute <= 0) {
    return translateNumber(hour, lang) + h;
  } else {
    return `${translateNumber(hour, lang) + h} ${
      translateNumber(minute, lang) + mns
    }`;
  }
};
