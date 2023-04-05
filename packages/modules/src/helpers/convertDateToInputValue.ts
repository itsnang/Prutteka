export const convertDateToInputValue = (date: Date | string) => {
  date = new Date(date);
  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);

  return date.getFullYear() + '-' + month + '-' + day;
};
