const dayMapping = {
  Mon: 'ចន្ទ',
  Tue: 'អង្គារ',
  Wed: 'ពុធ',
  Thu: 'ព្រហស្បតិ៍',
  Fri: 'សុក្រ',
  Sat: 'សៅរ៍',
  Sun: 'អាទិត្យ',
};

const monthMapping = {
  Jan: 'មករា',
  Feb: 'កុម្ភៈ',
  Mar: 'មីនា',
  Apr: 'មេសា',
  May: 'ឧសភា',
  Jun: 'មិថុនា',
  Jul: 'កក្កដា',
  Aug: 'សីហា',
  Sep: 'កញ្ញា',
  Oct: 'តុលា',
  Nov: 'វិច្ឆិកា',
  Dec: 'ធ្នូ',
};

const numberMapping = {
  '0': '០',
  '1': '១',
  '2': '២',
  '3': '៣',
  '4': '៤',
  '5': '៥',
  '6': '៦',
  '7': '៧',
  '8': '៨',
  '9': '៩',
};

function translateNumber(number: number) {
  return (
    String(number)
      .split('')
      //@ts-ignore
      .map((num) => numberMapping[num])
      .join('')
  );
}

export function translateDate(
  date: Date | string | number,
  lang: 'en' | 'kh' = 'en'
) {
  date = new Date(date).toDateString();
  if (lang === 'en') return date;

  const [day, month, dayNumber, year] = date.split(' ');

  //@ts-ignore
  return `ថ្ងៃ${dayMapping[day]} ទី${translateNumber(dayNumber)} ខែ${
    //@ts-ignore
    monthMapping[month]
    //@ts-ignore
  } ឆ្នាំ${translateNumber(year)}`;
}
