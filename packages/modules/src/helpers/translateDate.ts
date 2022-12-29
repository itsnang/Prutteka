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

export function translateDate(
  date: Date | string | number,
  lang: 'en' | 'kh' = 'en'
) {
  date = new Date(date).toDateString();
  if (lang === 'en') return date;

  const [day, month, dayNumber, year] = date.split(' ');

  //@ts-ignore
  return `ថ្ងៃ${dayMapping[day]} ទី ${dayNumber} ខែ${monthMapping[month]} ឆ្នាំ${year}`;
}
