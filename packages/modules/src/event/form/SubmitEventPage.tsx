import { NextPage } from 'next';
import { Button, InputField, Typography } from 'ui';
import {
  QuestionMarkCircleIcon,
  PlusIcon,
  MinusIcon,
} from '@heroicons/react/24/outline';
import { Formik, Form, Field, FieldArray } from 'formik';
import { DatetimeForm } from './DatetimeForm';
import { validationSchema } from './validationSchema';
import { ScheduleForm } from './ScheduleForm';
import {
  getEventLength,
  getEventDays,
  getToday,
  getCurrentTime,
} from './helper';
import { useEffect, useState } from 'react';
import { SelectField } from 'ui/src/SelectField';
import { EventDetail } from '../../type/EventDetailType';

import { ImageUpload } from './ImageUpload';

const initialValues = {
  details: {
    name: { en: '', kh: '' },
    type: 0,
    category: 0,
    detail: { en: '', kh: '' },
    img: '',
    nestedEvents: false,
  },

  datetime: {
    startDate: getToday(),
    endDate: getToday(),
    startTime: getCurrentTime(),
    endTime: getCurrentTime(),
    hasCustomTime: false,
    customTimes: [{ startTime: getCurrentTime(), endTime: getCurrentTime() }],
  },

  locations: [{ name: { en: '', kh: '' }, link: '' }],

  schedule: {
    hasCustomSchedule: false,
    sharedSchedules: [
      {
        startTime: getCurrentTime(),
        endTime: getCurrentTime(),
        activity: { en: '', kh: '' },
      },
    ],
    customSchedules: [
      {
        date: undefined,
        schedules: [
          {
            startTime: getCurrentTime(),
            endTime: getCurrentTime(),
            activity: { en: '', kh: '' },
          },
        ],
      },
    ],
  },

  joinMethods: [{ method: { en: '', kh: '' }, link: '' }],
};

export const t = {
  eventDetails: { en: 'Event Details', kh: 'ព័ត៌មានលម្អិត' },
  dragAndDrop: { en: 'Drag and drop or', kh: 'ទម្លាក់រូបភាពលើទីនេះ ឬ' },
  uploadImage: { en: 'Upload Image', kh: 'បង្ហោះរូបភាព' },
  upTo10mb: { en: 'up to 10mb', kh: 'ធំបំផុត ១០mb' },
  eventName: { en: 'Event name', kh: 'ឈ្មោះព្រឹត្តិការណ៍' },
  type: { en: 'Type', kh: 'ព្រឹត្តិការណ៍ផ្ទាល់ឬអនឡាញ' },
  category: { en: 'Category', kh: 'ប្រភេទនៃព្រឹត្តិការណ៍' },
  details: { en: 'Details', kh: 'ពិពណ៌នាពីព្រឹត្តិការណ៍' },
  nestedEvents: { en: 'Nested Event', kh: 'Nested Event' },
  thisEventContainsOtherEvent: {
    en: 'This event contains other events within it',
    kh: 'This event contains other events within it',
  },
  dateAndTime: { en: 'Date and Time', kh: 'កាលបរិច្ឆេទ និង ពេលវេលា' },
  startDate: { en: 'Start Date', kh: 'ថ្ងៃចាប់ផ្តើម' },
  endDate: { en: 'End Date', kh: 'ថ្ងៃបញ្ចប់' },
  startTime: { en: 'Start Time', kh: 'ម៉ោងចាប់ផ្តើម' },
  endTime: { en: 'End Time', kh: 'ម៉ោងបញ្ចប់' },
  customDateAndTime: {
    en: 'Custom date and time (Different start and end time for each date)',
    kh: 'ពេលវេលាខុសគ្នាសម្រាប់ថ្ងៃនីមួយៗ',
  },
  invalidDateTime: {
    en: 'Please provide valid start date and end date for your event above',
    kh: 'សូមបំពេញថ្ងៃចាប់ផ្តើមនិងថ្ងៃបញ្ចប់ឲ្យបានត្រឹមត្រូវ',
  },
  locationInfo: { en: 'Location Info', kh: 'ទីតាំងនៃព្រឹត្តិការណ៍' },
  locationName: { en: 'Location name', kh: 'ឈ្មោះទីតាំង' },
  locationLink: {
    en: 'Location link (e.g Google maps)',
    kh: 'តំណភ្ជាប់ (ឧ. Google maps)',
  },
  locationLinkPlaceholder: { en: 'Location link', kh: 'តំណភ្ជាប់' },
  addMoreLocation: { en: 'Add more location', kh: 'បន្ថែមទីតាំងផ្សេងទៀត' },
  schedule: { en: 'Schedule', kh: 'កាលវិភាគ' },
  activity: { en: 'Activity', kh: 'សកម្មភាព' },
  addMoreSchedule: { en: 'Add more schedule', kh: 'បន្ថែមកាលវិភាគ' },
  customSchedule: {
    en: 'Custom schedule (Different schedule for each date)',
    kh: 'កាលវិភាគផ្សេងៗគ្នាសម្រាប់ថ្ងៃនីមួយៗ',
  },
  howToJoin: { en: 'How to join', kh: 'វិធីចូលរួមព្រឹត្តិការណ៍' },
  method: { en: 'Method', kh: 'មធ្យោបាយចូលរួម' },
  link: { en: 'Link', kh: 'តំណភ្ជាប់ (បើមាន)' },
  addMoreMethod: { en: 'Add more method', kh: 'បន្ថែមមធ្យោបាយផ្សេងទៀត' },
  submitEvent: { en: 'Submit Event', kh: 'បង្ហោះព្រឹត្តិការណ៍' },
};

const types = {
  en: ['Physical', 'Online'],
  kh: ['ព្រឹត្តិការណ៍ផ្ទាល់', 'ព្រឹត្តិការណ៍អនឡាញ'],
};

const categories = {
  en: [
    'Free',
    'Online',
    'Education',
    'Sport',
    'Music',
    'Exhibition',
    'Technology',
    'Charity',
  ],
  kh: [
    'ឥតគិតថ្លៃ',
    'អនឡាញ',
    'អប់រំ',
    'កីឡា',
    'តន្ត្រី',
    'ពិព័រណ៍',
    'បច្ចេកវិទ្យា',
    'សប្បុរធម៌',
  ],
};

export const SubmitEventPage: NextPage = () => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={(values) => console.log(values)}
  >
    {({ values }) => <InnerForm values={values} />}
  </Formik>
);

const InnerForm = ({ values }: { values: EventDetail }) => {
  const [eventState, setEventState] = useState<{
    eventDays: Date[];
    isInvalidInput: boolean;
  }>({ eventDays: [], isInvalidInput: true });

  const [lang, setLang] = useState<'en' | 'kh'>('en');

  useEffect(() => {
    const startDate = values.datetime.startDate;
    const endDate = values.datetime.endDate;
    const eventLength = getEventLength(startDate, endDate);
    if (eventLength <= 0 || !startDate || !endDate)
      return setEventState((prev) => ({ ...prev, isInvalidInput: true }));
    else
      setEventState({
        eventDays: getEventDays(startDate, eventLength),
        isInvalidInput: false,
      });
  }, [values.datetime.startDate, values.datetime.endDate]);

  return (
    <Form className="space-y-8 py-4 md:px-4">
      <div className="flex flex-col gap-6">
        <div className="flex justify-center">
          <button
            type="button"
            className={`rounded-xl rounded-r-none border-2 border-r-0 border-gray-200 px-16 py-2.5 ${
              lang === 'en' ? 'bg-primary text-white' : 'bg-white'
            }`}
            onClick={() => setLang('en')}
          >
            EN
          </button>
          <button
            onClick={() => setLang('kh')}
            type="button"
            className={`rounded-xl rounded-l-none border-2 border-l-0 border-gray-200 px-16 py-2.5 ${
              lang === 'kh' ? 'bg-primary text-white' : 'bg-white'
            }`}
          >
            ខ្មែរ
          </button>
        </div>

        <Typography size="3xl" weight="bold">
          {t.eventDetails[lang]}
        </Typography>

        <ImageUpload t={t} lang={lang} />

        <div className="flex flex-col gap-4">
          <InputField
            name={`details.name.${lang}`}
            label={t.eventName[lang]}
            placeholder={t.eventName[lang]}
          />
          <div className="flex flex-col gap-4 sm:flex-row">
            <SelectField
              name="details.type"
              label={t.type[lang]}
              placeholder={t.type[lang]}
              containerClassName="flex-1"
              options={types[lang]}
              values={types.en}
            />

            <SelectField
              name="details.category"
              label={t.category[lang]}
              placeholder={t.category[lang]}
              containerClassName="flex-1"
              options={categories[lang]}
              values={categories.en}
            />
          </div>

          <InputField
            name={`details.detail.${lang}`}
            label={t.details[lang]}
            placeholder={t.details[lang]}
          />

          <label className="flex items-center gap-2">
            <Field
              type="checkbox"
              name="details.nestedEvents"
              className="form-checkbox text-primary h-6 w-6 cursor-pointer overflow-hidden rounded-md border border-gray-300 outline-none focus:ring-0"
            />
            <Typography className="cursor-pointer">
              {t.nestedEvents[lang]}
            </Typography>
            <div className="group relative flex justify-center">
              <QuestionMarkCircleIcon className="h-6 w-6 cursor-pointer" />
              <Typography
                size="sm"
                style={{ whiteSpace: 'nowrap' }}
                className="pointer-events-none absolute -top-8 rounded-md bg-gray-600 py-1 px-2 text-center text-white opacity-0 transition-all group-hover:opacity-100"
              >
                {t.thisEventContainsOtherEvent[lang]}
              </Typography>
            </div>
          </label>
        </div>

        <Typography size="3xl" weight="bold">
          {t.dateAndTime[lang]}
        </Typography>

        <DatetimeForm
          dateTimeState={values.datetime}
          lang={lang}
          {...eventState}
        />

        <Typography size="3xl" weight="bold">
          {t.locationInfo[lang]}
        </Typography>

        <FieldArray name="locations">
          {(arrayHelpers) => (
            <div className="flex flex-col gap-4">
              {values?.locations?.map((_location, idx) => (
                <div
                  className="flex items-start gap-2 rounded-2xl border border-gray-100 bg-white p-2 md:gap-4 md:border-0 md:bg-gray-50 md:p-0"
                  key={idx}
                >
                  {idx > 0 ? (
                    <button
                      type="button"
                      className="text-primary mt-8 md:mt-0 md:self-center"
                      onClick={() => arrayHelpers.remove(idx)}
                    >
                      <MinusIcon className="h-6 w-6" />
                    </button>
                  ) : null}
                  <div className="flex flex-1 flex-col gap-4 md:flex-row">
                    <InputField
                      name={`locations.${idx}.name.${lang}`}
                      label={t.locationName[lang]}
                      placeholder={t.locationName[lang]}
                      containerClassName="flex-1"
                    />

                    <InputField
                      name={`locations.${idx}.link`}
                      label={t.locationLink[lang]}
                      placeholder={t.locationLinkPlaceholder[lang]}
                      containerClassName="flex-1"
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                className="text-primary flex gap-1.5"
                onClick={() => arrayHelpers.push(initialValues.locations[0])}
              >
                <PlusIcon className="h-6 w-6" />
                <Typography className="text-primary">
                  {t.addMoreLocation[lang]}
                </Typography>
              </button>
            </div>
          )}
        </FieldArray>

        <Typography size="3xl" weight="bold">
          {t.schedule[lang]}
        </Typography>

        <ScheduleForm
          scheduleState={values.schedule}
          {...eventState}
          lang={lang}
        />

        <Typography size="3xl" weight="bold">
          {t.howToJoin[lang]}
        </Typography>

        <FieldArray name="joinMethods">
          {(arrayHelpers) => (
            <div className="flex flex-col gap-4">
              {values?.joinMethods?.map((_joinMethod, idx) => (
                <div
                  className="flex items-start gap-2 rounded-2xl border border-gray-100 bg-white p-2 md:gap-4 md:border-0 md:bg-gray-50 md:p-0"
                  key={idx}
                >
                  {idx > 0 ? (
                    <button
                      type="button"
                      className="text-primary mt-8 md:mt-0 md:self-center"
                      onClick={() => arrayHelpers.remove(idx)}
                    >
                      <MinusIcon className="h-6 w-6" />
                    </button>
                  ) : null}
                  <div className="flex flex-1 flex-col gap-4 md:flex-row">
                    <InputField
                      name={`joinMethods.${idx}.method.${lang}`}
                      label={t.method[lang]}
                      placeholder={t.method[lang]}
                      containerClassName="flex-1"
                    />

                    <InputField
                      name={`joinMethods.${idx}.link`}
                      label={t.link[lang]}
                      placeholder={t.link[lang]}
                      containerClassName="flex-1"
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                className="text-primary flex gap-1.5"
                onClick={() => arrayHelpers.push(initialValues.joinMethods[0])}
              >
                <PlusIcon className="h-6 w-6" />
                <Typography className="text-primary">
                  {t.addMoreMethod[lang]}
                </Typography>
              </button>
            </div>
          )}
        </FieldArray>
      </div>

      <Button className="w-full" type="submit">
        {t.submitEvent[lang]}
      </Button>
    </Form>
  );
};
