import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  image: Yup.object().shape({
    src: Yup.string().required(),
  }),
  name: Yup.object()
    .shape({
      en: Yup.string(),
      km: Yup.string(),
    })
    .test(
      'has-at-least-one-name',
      'Name must have at least en or ខ្មែរ',
      (value) => !!value.en || !!value.km
    )
    .required(),
  type: Yup.string().required('Type must be selected'),
  categories: Yup.array()
    .of(Yup.string().required())
    .test(
      'has-at-least-one-category',
      'Category must have at least one selected',
      (values) => !!values && values.length > 0
    ),
  detail: Yup.string().required(),
  date: Yup.object()
    .shape({
      start_date: Yup.date().required(),
      end_date: Yup.date().required(),
    })
    .test(
      'end_date-must-be-greater-than-start-date',
      'End date must be greater than Start date',
      (value) => {
        if (value.start_date && value.end_date)
          return value.end_date >= value.start_date;
        return false;
      }
    ),
  times: Yup.array()
    .of(
      Yup.object().shape({
        date: Yup.date(),
        start_time: Yup.string().required(),
        end_time: Yup.string().required(),
      })
    )
    .required(),
  custom_date: Yup.boolean(),
  locations: Yup.array().of(
    Yup.object()
      .shape({
        name: Yup.string(),
        address: Yup.string(),
        url: Yup.string().url(),
        location: Yup.object().shape({
          lat: Yup.number(),
          lng: Yup.number(),
        }),
      })
      .test(
        'has-required-fields',
        'Location must have a name and an address',
        (value) => !!value.name && !!value.address
      )
      .required()
  ),
  schedules: Yup.array()
    .of(
      Yup.object().shape({
        date: Yup.date(),
        schedules: Yup.array().of(
          Yup.object().shape({
            start_time: Yup.string(),
            end_time: Yup.string(),
            activity: Yup.object().shape({
              en: Yup.string(),
              km: Yup.string(),
            }),
          })
        ),
      })
    )
    .test(
      'has-at-least-one-name',
      'Name must have at least en or ខ្មែរ',
      (values) => {
        if (values && values.length === 1) {
          return true;
        }
        return false;
      }
    )
    .required(),
  custom_schedule: Yup.boolean(),
  join_methods: Yup.array().of(
    Yup.object().shape({
      name: Yup.object()
        .shape({
          en: Yup.string(),
          km: Yup.string(),
        })
        .test(
          'has-at-least-one-name',
          'Name must have at least en or ខ្មែរ',
          (value) => {
            return !!value.en || !!value.km;
          }
        )
        .required(),
      link: Yup.string().url(),
    })
  ),
  dynamic_contents: Yup.array().of(
    Yup.object().shape({
      name: Yup.object().shape({
        en: Yup.string(),
        km: Yup.string(),
      }),
      items: Yup.array().of(
        Yup.object().shape({
          image: Yup.object().shape({
            src: Yup.string(),
          }),
          name: Yup.object().shape({
            en: Yup.string(),
            km: Yup.string(),
          }),
          detail: Yup.object().shape({
            en: Yup.string(),
            km: Yup.string(),
          }),
        })
      ),
    })
  ),
});
