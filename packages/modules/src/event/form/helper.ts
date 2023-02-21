const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;

/**
 * Function to get the length of the event (endDate must be later then startDate or else the
 * function will return 0 or negative)
 * @param startDate the day that the event start
 * @param endDate the day that the event end
 * @returns {number} eventLength
 */
export const getEventLength = (
  startDate: string | Date,
  endDate: string | Date
): number => {
  /* because input[type='date'] return a string in 'YYYY-MM-DD' format so we have to convert 
  to Date() object to compare them */
  const startDateAsDate = new Date(startDate);
  const endDateAsDate = new Date(endDate);

  const timeDifference = endDateAsDate.getTime() - startDateAsDate.getTime();

  return timeDifference / MILLISECONDS_IN_A_DAY + 1;
};

/**
 * Function that take a Date(startDate) and a number and return a new Date after adding the day to it
 *
 * e.g. getDayAfter("12-Dec", 2) => "14-Dec"
 *
 * e.g. getDayAfter("7-Jan", 4) => "11-Jan"
 *
 * e.g. getDayAfter("1-Jan", 0) => "1-Jan"
 */
const getDayAfter = (startDate: string | Date, dayToAdd: number) => {
  const startDateAsDate = new Date(startDate);

  const dayAfter = startDateAsDate.getTime() + MILLISECONDS_IN_A_DAY * dayToAdd;

  return new Date(dayAfter);
};

/**
 * e.g. if startDate is "Mon,26 Dec" and eventLength is 3 then the function will return
 * [
 *  "Mon, 26 Dec",
 *  "Tue, 27 Dec",
 *  "Wed, 28 Dec"
 * ]
 * @param startDate
 * @param endDate
 * @returns
 */
export const getEventDays = (
  startDate: string | Date,
  endDate: string | Date
) => {
  const eventDays = [];

  const eventLength = getEventLength(startDate, endDate);

  for (let day = 0; day < eventLength; day++) {
    eventDays.push(getDayAfter(startDate, day));
  }

  return eventDays;
};

const convertDateToInputValue = (date: Date) => {
  var day = ('0' + date.getDate()).slice(-2);
  var month = ('0' + (date.getMonth() + 1)).slice(-2);

  return date.getFullYear() + '-' + month + '-' + day;
};

export const getToday = () => {
  return convertDateToInputValue(new Date());
};

export const getCurrentTime = () => {
  const now = new Date();
  const hour = ('0' + now.getHours()).slice(-2);
  const minute = ('0' + now.getMinutes()).slice(-2);
  return `${hour}:${minute}`;
};
