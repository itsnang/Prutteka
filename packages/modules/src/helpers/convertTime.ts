export const convertTime = (date: Date | string) => {
  return new Date(date).toTimeString();
};
