import * as Yup from 'yup';
import { getEventLength } from './helper';

const testRequiredCustomSchedules = {
  message: 'this is a required field',
  test: (value: any, ctx: any) => {
    const { hasCustomSchedule } = ctx?.options?.from[2].value;

    if (!hasCustomSchedule) return true;
    return !!value;
  },
};

const testRequiredSharedSchedule = {
  message: 'this is a required field',
  test: (value: any, ctx: any) => {
    const { hasCustomSchedule } = ctx?.options?.from[1].value;
    if (hasCustomSchedule) return true;
    return !!value;
  },
};

export const validationSchema = Yup.object().shape({
  details: Yup.object().shape({
    name: Yup.string().required('This is a required field'),
    type: Yup.string().required('This is a required field'),
    category: Yup.string().required('This is a required field'),
    detail: Yup.string().required('This is a required field'),
    img: Yup.string(),
    nestedEvents: Yup.bool().required('This is a required field'),
  }),
  datetime: Yup.object().shape({
    startDate: Yup.date().required('This is a required field'),
    endDate: Yup.date()
      .required('This is a required field')
      .min(Yup.ref('startDate'), 'End date cannot be earlier than Start date')
      .test(
        'test_event_length_max_10days',
        'Event must be shorter than 10 days',
        (endDate, ctx) => {
          const { startDate } = ctx.parent;
          if (!endDate) return true;
          const eventLength = getEventLength(startDate, endDate);
          if (eventLength > 10) return false;
          return true;
        }
      ),

    startTime: Yup.string().when('hasCustomTime', {
      is: true,
      then: Yup.string(),
      otherwise: Yup.string().required('This is a required field'),
    }),
    endTime: Yup.string().when('hasCustomTime', {
      is: true,
      then: Yup.string(),
      otherwise: Yup.string().required('This is a required field'),
    }),
    hasCustomTime: Yup.bool(),
    customTimes: Yup.array().of(
      Yup.object().shape({
        startTime: Yup.string().test(
          'test_required_when_hasCustomTime',
          'This field is required',
          (value, ctx: any) => {
            const { hasCustomTime } = ctx.options?.from[1].value;

            //if !hasCustomTime so this field is not required
            if (!hasCustomTime) return true;
            else return !!value;
          }
        ),
        endTime: Yup.string().test(
          'test_required_when_hasCustomTime',
          'This field is required',
          (value, ctx: any) => {
            const { hasCustomTime } = ctx.options?.from[1].value;

            //if not hasCustomTime so this field is not required
            if (!hasCustomTime) return true;
            else return !!value;
          }
        ),
      })
    ),
  }),
  locations: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('This is a required field'),
      link: Yup.string().required('This is a required field'),
    })
  ),

  schedule: Yup.object().shape({
    hasCustomSchedule: Yup.bool(),
    sharedSchedules: Yup.array().of(
      Yup.object().shape({
        startTime: Yup.string().test(testRequiredSharedSchedule),
        endTime: Yup.string().test(testRequiredSharedSchedule),
        activity: Yup.string().test(testRequiredSharedSchedule),
      })
    ),
    customSchedules: Yup.array().of(
      Yup.object().shape({
        date: Yup.date().test({
          message: 'This is a required field',
          test: (value, ctx: any) => {
            const { hasCustomSchedule } = ctx?.options?.from[1];

            if (!hasCustomSchedule) return true;
            return !!value;
          },
        }),
        schedules: Yup.array().of(
          Yup.object().shape({
            startTime: Yup.string().test(testRequiredCustomSchedules),
            endTime: Yup.string().test(testRequiredCustomSchedules),
            activity: Yup.string().test(testRequiredCustomSchedules),
          })
        ),
      })
    ),
  }),
  joinMethods: Yup.array().of(
    Yup.object().shape({
      method: Yup.string().required('This is a required field'),
      link: Yup.string().required('This is a required field'),
    })
  ),
});
