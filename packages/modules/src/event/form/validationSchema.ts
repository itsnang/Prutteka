import * as Yup from 'yup';
import { getEventLength, getEditorStateText } from './helper';

export const errorMessage = {
  required: {
    en: 'This is a required field',
    kh: 'សូមបំពេញប្រអប់ខាងលើ',
  },
  start_dateBeforeend_date: {
    en: 'End date cannot be earlier than Start date',
    kh: 'ថ្ងៃបញ្ចប់នៃព្រឹត្តិការណ៍មិនអាចមុនថ្ងៃចាប់ផ្តើមទេ',
  },
  maxEventLength: {
    en: 'Event cannot be longer than 10 days',
    kh: 'ព្រឹត្តិការណ៍មិនអាចមានរយៈពេលយូរជាង១០ថ្ងៃទេ',
  },
  maxEventDetailTenThousand: {
    en: 'Event detail length must be shorter than 10000 characters',
    kh: 'សូមកាត់បន្ថយតួអក្សរ',
  },
  mustProvideDetailInOneLang: {
    en: 'Please provide detail in at least 1 language',
    kh: 'សូមបំពេញការបរិយាយពីព្រឹត្តិការណ៍យ៉ាងហោចណាស់១ភាសា',
  },
  mustProvideNameInOneLang: {
    en: 'Please provide name in at least 1 language',
    kh: 'សូមបំពេញឈ្មោះព្រឹត្តិការណ៍យ៉ាងហោចណាស់១ភាសា',
  },
  mustProvideJoinMethodLink: {
    en: 'Please provide a link to join this event',
    kh: 'សូមផ្តល់នូវតំណភ្ជាប់សម្រាប់ចូលរួមព្រឹត្តិការណ៍នេះ',
  },
  mustProvideImage: {
    en: 'Please provide an image for your event',
    kh: 'សូមបង្ហាញរូបភាពសម្រាប់ព្រឹត្តិការណ៍របស់អ្នក',
  },
};

export const genValidationSchema = (lang: 'en' | 'kh') =>
  Yup.object().shape({
    details: Yup.object().shape({
      name: Yup.object({
        en: Yup.string()
          .test(
            'Must have name in 1 language',
            errorMessage.mustProvideNameInOneLang.en,
            (value: any, ctx: any) => {
              const enText = value;
              const khText = ctx?.parent?.kh;
              return !!khText || !!enText;
            }
          )
          .test(
            'Test length longer than 5 characters',
            'Event name must be at least 5 characters long',
            (value?: string) => !value || value.length > 5
          ),
        kh: Yup.string()
          .test(
            'Must have name in 1 language',
            errorMessage.mustProvideNameInOneLang.kh,
            (value: any, ctx: any) => {
              const khText = value;
              const enText = ctx?.parent?.en;
              return !!khText || !!enText;
            }
          )
          .test(
            'Test length longer than 5 characters',
            'សូមបំពេញឈ្មោះព្រឹត្តិការណ៍ឲ្យវែងជាងនេះ',
            (value?: string) => !value || value.length > 5
          ),
      }),
      type: Yup.string().required(errorMessage.required[lang]),
      category: Yup.string().required(errorMessage.required[lang]),
      location: Yup.string().required(errorMessage.required[lang]),
      detail: Yup.object({
        en: Yup.object()
          .test(
            'Detail too long',
            errorMessage.maxEventDetailTenThousand.en,
            (value: any) => getEditorStateText(value).length < 10000
          )
          .test(
            'Must have detail in 1 language',
            errorMessage.mustProvideDetailInOneLang.en,
            (value: any, ctx: any) => {
              const khText = getEditorStateText(ctx?.parent?.kh).length;
              const enText = getEditorStateText(value).length;
              return !!khText || !!enText;
            }
          ),
        kh: Yup.object()
          .test(
            'Detail too long',
            errorMessage.maxEventDetailTenThousand.kh,
            (value: any) => getEditorStateText(value).length < 10000
          )
          .test(
            'Must have detail in 1 language',
            errorMessage.mustProvideDetailInOneLang.kh,
            (value: any, ctx: any) => {
              const khText = getEditorStateText(value).length;
              const enText = getEditorStateText(ctx.parent.en).length;
              return !!khText || !!enText;
            }
          ),
      }),
      img: Yup.object()
        .nullable()
        .test(
          'test_image_required',
          errorMessage.mustProvideImage[lang],
          //value could be undefined (no image) or null (image in the form of blob)
          (value: any) => value === null
        ),
      nestedEvents: Yup.bool().required(errorMessage.required[lang]),
    }),
    datetime: Yup.object().shape({
      start_date: Yup.date().required(errorMessage.required[lang]),
      end_date: Yup.date()
        .required(errorMessage.required[lang])
        .min(Yup.ref('start_date'), errorMessage.start_dateBeforeend_date[lang])
        .test(
          'test_event_length_max_10days',
          errorMessage.maxEventLength[lang],
          (end_date, ctx) => {
            const { start_date } = ctx.parent;
            if (!end_date) return true;
            const eventLength = getEventLength(start_date, end_date);
            if (eventLength > 10) return false;
            return true;
          }
        ),

      start_time: Yup.string().when('hasCustomTime', {
        is: true,
        then: Yup.string(),
        otherwise: Yup.string().required(errorMessage.required[lang]),
      }),
      end_time: Yup.string().when('hasCustomTime', {
        is: true,
        then: Yup.string(),
        otherwise: Yup.string().required(errorMessage.required[lang]),
      }),
      hasCustomTime: Yup.bool(),
      customTimes: Yup.array().of(
        Yup.object().shape({
          start_time: Yup.string().test(
            'test_required_when_hasCustomTime',
            'This field is required',
            (value, ctx: any) => {
              const { hasCustomTime } = ctx.options?.from[1].value;

              //if !hasCustomTime so this field is not required
              if (!hasCustomTime) return true;
              else return !!value;
            }
          ),
          end_time: Yup.string().test(
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
          start_time: Yup.string(),
          end_time: Yup.string(),
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
              start_time: Yup.string(),
              end_time: Yup.string(),
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
        name: Yup.object({
          en: Yup.string().test(
            'Test required one join_methods',
            'Please provide at least 1 join method and its link',
            (value: any, ctx: any) => {
              let hasMethodAndLink = false;

              for (const item of ctx.from[2].value.joinMethods) {
                if ((item?.name?.en || item?.name?.kh) && item.link)
                  hasMethodAndLink = true;
              }
              return hasMethodAndLink;
            }
          ),
          kh: Yup.string().test(
            'Test required one join_methods',
            'សូមបំពេញវិធីចូលរួមយ៉ាងហោចមួយដោយមានតំណភ្ជាប់ផង',
            (value: any, ctx: any) => {
              let hasMethodAndLink = false;

              for (const item of ctx.from[2].value.joinMethods) {
                if ((item?.name?.en || item?.name?.kh) && item.link)
                  hasMethodAndLink = true;
              }
              return hasMethodAndLink;
            }
          ),
        }),
        link: Yup.string().test(
          'test required when have name',
          errorMessage.mustProvideJoinMethodLink[lang],
          (value: any, ctx: any) => {
            return !((ctx.parent.name.en || ctx.parent.name.kh) && !value);
          }
        ),
      })
    ),
  });
