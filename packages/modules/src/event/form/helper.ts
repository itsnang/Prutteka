import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { EventDetail } from '../../type/EventDetailType';
import { APIResponseEvent } from 'custom-types';
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
 * @param eventLength
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

//used to extract the "Date" part of a Date object and convert to a value that can be passed into an input
const convertDateToInputValue = (date: Date | string) => {
  date = new Date(date);
  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);

  return date.getFullYear() + '-' + month + '-' + day;
};

//used to extract the "Time" part of a Date object and convert to a value that can be passed into an input
const convertTimeToInputValue = (time: Date | string) => {
  time = new Date(time);

  const hour = ('0' + time.getHours()).slice(-2);
  const minute = ('0' + time.getMinutes()).slice(-2);

  return `${hour}:${minute}`;
};

export const getToday = () => {
  return convertDateToInputValue(new Date());
};

export const mergeTimeAndDate = (time: string, date: Date | string) => {
  date = new Date(date);
  date.setHours(0, 0, 0, 0);

  if (!time.includes(':')) return;
  const [hour, minute] = time.split(':');

  date.setHours(+hour, +minute);

  return date.toISOString();
};

export const getCurrentTime = () => {
  const now = new Date();
  const hour = ('0' + now.getHours()).slice(-2);
  const minute = ('0' + now.getMinutes()).slice(-2);
  return `${hour}:${minute}`;
};

export const getEditorStateText = (editorState: EditorState) =>
  editorState ? editorState.getCurrentContent().getPlainText('\u0001') : '';

export const getEditorStateHTML = (editorState: EditorState | string) => {
  if (editorState instanceof EditorState)
    return getEditorStateText(editorState).length > 0
      ? draftToHtml(convertToRaw(editorState.getCurrentContent()))
      : '';

  return '';
};

const recursiveFormData = (
  data: any,
  formData: FormData,
  parentKey = ''
): any => {
  if (
    data &&
    typeof data === 'object' &&
    !(data instanceof Date) &&
    !(data instanceof File) &&
    !(data instanceof Blob)
  ) {
    Object.keys(data).forEach((key) => {
      recursiveFormData(
        data[key],
        formData,
        parentKey ? `${parentKey}[${key}]` : key
      );
    });
  } else {
    const value = data == null ? '' : data;

    formData.append(parentKey, value);
  }
};

/*use this function to convert an object into form data
ex: 
const data = {...}
const formData = objToFormData(data)
await fetch(API_ENDPOINT, {
  body: formData,
  method: "POST"
})
*/
export const objToFormData = (obj: any) => {
  const formData = new FormData();
  recursiveFormData(obj, formData);
  return formData;
};

//used to convert the data from the "EventForm" formik into a format called multipart/form-data that can be then POST to the backend
export const buildFormData = (values: EventDetail) => {
  const {
    category,
    detail: initialDetail,
    name,
    img,
    nestedEvents,
    type,
    location,
  } = values.details;

  const modifiedData: { [key: string]: any } = {
    name: name,
    is_nested: nestedEvents,
    image_src: img,
    type: type,
    location: location,
    category: category,
    join_methods: values.joinMethods.filter(
      (method) => method.link || method.name.en || method.name.kh
    ),
    locations: values.locations.filter(
      (location) => location.link || location.name.en || location.name.kh
    ),
    detail: {
      en: getEditorStateHTML(initialDetail.en),
      kh: getEditorStateHTML(initialDetail.kh),
    },
  };

  const {
    start_date,
    end_date,
    start_time,
    end_time,
    hasCustomTime,
    customTimes,
  } = values.datetime;

  const eventDays = getEventDays(start_date, end_date);

  let times = [];

  if (hasCustomTime)
    times = customTimes.map((time, index) => {
      const day = eventDays[index];
      return {
        start_time: mergeTimeAndDate(time.start_time, day),
        end_time: mergeTimeAndDate(time.end_time, day),
      };
    });
  else
    times = [
      {
        start_time: mergeTimeAndDate(start_time, start_date),
        end_time: mergeTimeAndDate(end_time, start_date),
      },
    ];

  modifiedData.date_time = { start_date, end_date, times };

  const { customSchedules, sharedSchedules, hasCustomSchedule } =
    values.schedule;
  let schedules = [];

  if (hasCustomSchedule) schedules = customSchedules;
  else schedules = [{ date: null, schedules: sharedSchedules }];

  modifiedData.schedules = schedules.map(({ date, schedules }, idx) => ({
    date,
    schedules: schedules
      .filter((schedule) => !!(schedule.activity.en || schedule.activity.kh))
      .map((schedule) => ({
        start_time: mergeTimeAndDate(
          schedule.start_time,
          date || eventDays[idx]
        ),
        end_time: mergeTimeAndDate(schedule.end_time, date || eventDays[idx]),
        activity: schedule.activity,
      })),
  }));

  const formData = objToFormData(modifiedData);

  return formData;
};

type InitialValuesType = typeof import('./Constant');
type APIEventType = APIResponseEvent['data'];

//used to convert the data that is received from the backend into a format that can be passed into the "EvenForm" component
export const apiToFormData = (apiEvent: APIEventType) => {
  const apiEventData = apiEvent.attributes;
  const { INITIAL_VALUES } = require('./Constant') as InitialValuesType;

  INITIAL_VALUES.details.img = apiEventData.image_src;
  INITIAL_VALUES.details.name = apiEventData.name;
  INITIAL_VALUES.details.category = apiEventData.category[0];
  INITIAL_VALUES.details.detail = apiEventData.detail;
  INITIAL_VALUES.details.type = apiEventData.type;
  INITIAL_VALUES.details.location = apiEventData.location;
  INITIAL_VALUES.locations = apiEventData.locations;
  INITIAL_VALUES.joinMethods = apiEventData.join_methods;
  INITIAL_VALUES.datetime.start_date = convertDateToInputValue(
    apiEventData.date_time.start_date
  );
  INITIAL_VALUES.datetime.end_date = convertDateToInputValue(
    apiEventData.date_time.end_date
  );
  INITIAL_VALUES.datetime.start_time = convertTimeToInputValue(
    apiEventData.date_time.times[0].start_time
  );
  INITIAL_VALUES.datetime.end_time = convertTimeToInputValue(
    apiEventData.date_time.times[0].end_time
  );

  const hasCustomeTime = apiEventData.date_time.times.length > 1;

  if (hasCustomeTime) {
    INITIAL_VALUES.datetime.hasCustomTime = true;
    INITIAL_VALUES.datetime.customTimes = apiEventData.date_time.times.map(
      (time) => ({
        start_time: convertTimeToInputValue(time.start_time),
        end_time: convertTimeToInputValue(time.end_time),
      })
    );
  }

  const hasCustomSchedule = apiEventData.schedules.length > 1;

  if (hasCustomSchedule) {
    INITIAL_VALUES.schedule.hasCustomSchedule = true;
    INITIAL_VALUES.schedule.sharedSchedules;
    INITIAL_VALUES.schedule.customSchedules = apiEventData.schedules.map(
      (schedule) => ({
        date: schedule.date as never,
        schedules: schedule.schedules.map((s) => ({
          activity: s.activity,
          start_time: convertTimeToInputValue(s.start_time),
          end_time: convertTimeToInputValue(s.end_time),
        })),
      })
    );
  } else {
    INITIAL_VALUES.schedule.sharedSchedules =
      apiEventData.schedules[0].schedules.map((schedule) => ({
        activity: schedule.activity,
        start_time: convertTimeToInputValue(schedule.start_time),
        end_time: convertTimeToInputValue(schedule.end_time),
      }));
  }

  return { ...INITIAL_VALUES, id: apiEvent.id };
};
