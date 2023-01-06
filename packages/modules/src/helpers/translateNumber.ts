const numberMapping = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];

export const translateNumber = (
  number: number | string,
  lang: 'en' | 'kh' = 'en'
) => {
  if (lang === 'en') {
    return number;
  }

  return String(number)
    .split('')
    .map((n) => numberMapping[Number(n)])
    .join('');
};
