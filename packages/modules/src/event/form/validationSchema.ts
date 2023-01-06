import * as Yup from 'yup';
import { getEventLength } from './helper';

const errorMessage = {
  required: {
    en: 'This is a required field',
    kh: 'សូមបំពេញប្រអប់ខាងលើ',
  },
  startDateBeforeEndDate: {
    en: 'End date cannot be earlier than Start date',
    kh: 'ថ្ងៃបញ្ចប់នៃព្រឹត្តិការណ៍មិនអាចមុនថ្ងៃចាប់ផ្តើមទេ',
  },
  maxEventLength: {
    en: 'Event cannot be longer than 10 days',
    kh: 'ព្រឹត្តិការណ៍មិនអាចមានរយៈពេលយូរជាង១០ថ្ងៃទេ',
  },
};

export const genValidationSchema = (lang: 'en' | 'kh') =>
  Yup.object().shape({
    details: Yup.object().shape({
      name: Yup.object({
        en: Yup.string().required(errorMessage.required['en']),
        kh: Yup.string().required(errorMessage.required['kh']),
      }),
      type: Yup.string().required(errorMessage.required[lang]),
      category: Yup.string().required(errorMessage.required[lang]),
      detail: Yup.object({
        en: Yup.string().required(errorMessage.required['en']),
        kh: Yup.string().required(errorMessage.required['kh']),
      }),
      img: Yup.string(),
      nestedEvents: Yup.bool().required(errorMessage.required[lang]),
    }),
    datetime: Yup.object().shape({
      startDate: Yup.date().required(errorMessage.required[lang]),
      endDate: Yup.date()
        .required(errorMessage.required[lang])
        .min(Yup.ref('startDate'), errorMessage.startDateBeforeEndDate[lang])
        .test(
          'test_event_length_max_10days',
          errorMessage.maxEventLength[lang],
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
        otherwise: Yup.string().required(errorMessage.required[lang]),
      }),
      endTime: Yup.string().when('hasCustomTime', {
        is: true,
        then: Yup.string(),
        otherwise: Yup.string().required(errorMessage.required[lang]),
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
        name: Yup.object({ en: Yup.string(), kh: Yup.string() }),
        link: Yup.string(),
      })
    ),

    schedule: Yup.object().shape({
      hasCustomSchedule: Yup.bool(),
      sharedSchedules: Yup.array().of(
        Yup.object().shape({
          startTime: Yup.string(),
          endTime: Yup.string(),
          activity: Yup.object({
            en: Yup.string(),
            kh: Yup.string(),
          }),
        })
      ),
      customSchedules: Yup.array().of(
        Yup.object().shape({
          date: Yup.date(),
          schedules: Yup.array().of(
            Yup.object().shape({
              startTime: Yup.string(),
              endTime: Yup.string(),
              activity: Yup.object({
                en: Yup.string(),
                kh: Yup.string(),
              }),
            })
          ),
        })
      ),
    }),
    joinMethods: Yup.array().of(
      Yup.object().shape({
        method: Yup.object({
          en: Yup.string(),
          kh: Yup.string(),
        }),
        link: Yup.string(),
      })
    ),
  });
