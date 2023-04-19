import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';

import axios from 'axios';
import {
  ArrowLongRightIcon,
  ArrowLongLeftIcon,
} from '@heroicons/react/20/solid';
import { InitialValueType } from './form.types';

import { eachDayOfInterval, format } from 'date-fns';

import { ScheduleForm } from './ScheduleForm';
import { DateTimeForm } from './DatetimeForm';
import { LocationForm } from './LocationForm';
import { JoinMethodForm } from './JoinMethodForm';
import { DynamicContentForm } from './DynamicContentForm';
import { FloatingNavigation } from './FloatingNavigation';
import { DetailForm } from './DetailForm';
import { validationSchema } from './yup-validation';
import { buildEventForm } from './event-form';
import { auth } from 'firebase-config';
import { useRouter } from 'next/router';
import { APIResponseEvent } from 'custom-types';
import { SeoMeta } from 'ui';

const defaultValues = {
  image: { src: '', file: null },
  name: { en: '', km: '' },
  type: '',
  categories: [],
  detail: '',
  date: {
    start_date: format(new Date(new Date().setHours(0, 0, 0, 0)), 'yyyy-MM-dd'),
    end_date: format(new Date(new Date().setHours(0, 0, 0, 0)), 'yyyy-MM-dd'),
  },
  times: [
    {
      date: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
      start_time: format(new Date(new Date().setHours(6, 0, 0, 0)), 'HH:mm'),
      end_time: format(new Date(new Date().setHours(17, 0, 0, 0)), 'HH:mm'),
    },
  ],
  custom_date: false,
  locations: [
    {
      name: '',
      address: '',
      url: '',
      latlng: { lat: 0, lng: 0 },
      place_id: '',
      image_src: '',
      type: 'google',
    },
  ],
  schedules: [
    {
      date: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
      schedules: [
        {
          start_time: format(
            new Date(new Date().setHours(6, 0, 0, 0)),
            'HH:mm'
          ),
          end_time: format(new Date(new Date().setHours(17, 0, 0, 0)), 'HH:mm'),
          activity: {
            en: '',
            km: '',
          },
        },
      ],
    },
  ],
  custom_schedule: false,
  join_methods: [{ name: { en: '', km: '' }, link: '' }],
  dynamic_contents: [
    {
      name: { en: '', km: '' },
      items: [
        {
          image: { src: '', file: null },
          name: { en: '', km: '' },
          detail: { en: '', km: '' },
        },
      ],
    },
  ],
};

const initialValues = {
  image: { src: '', file: null },
  name: {
    en: 'Event Name',
    km: '',
  },
  type: 'online',
  categories: ['education', 'free'],
  detail:
    'This workshop will cover various topics related to web development, including HTML, CSS, and JavaScript.',
  date: {
    start_date: format(new Date(new Date().setHours(0, 0, 0, 0)), 'yyyy-MM-dd'),
    end_date: format(new Date(new Date().setHours(0, 0, 0, 0)), 'yyyy-MM-dd'),
  },
  times: [
    {
      date: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
      start_time: format(new Date(new Date().setHours(7, 0, 0, 0)), 'HH:mm'),
      end_time: format(new Date(new Date().setHours(18, 0, 0, 0)), 'HH:mm'),
    },
  ],
  custom_date: false,

  locations: [
    {
      name: 'Phnom Penh',
      address: 'Phnom Penh, Cambodia',
      url: 'https://maps.google.com/?q=Phnom+Penh,+Cambodia&ftid=0x3109513dc76a6be3:0x9c010ee85ab525bb',
      place_id: 'ChIJ42tqxz1RCTERuyW1WugOAZw',
      type: 'google',
      image_src:
        'https://maps.googleapis.com/maps/api/staticmap?center=11.5563738,104.9282099&size=640x320&scale=2&zoom=15&markers=icon:https://bit.ly/3TOXbm0%7C11.5563738,104.9282099&key=AIzaSyAGdMog3nwXfiqbuwtB5ZnHH0nnwiENf1w&map_id=971aa175b432867a',
      latlng: {
        lat: 11.5563738,
        lng: 104.9282099,
      },
    },
    {
      name: 'Phnom Penh',
      address: 'Phnom Penh, Cambodia',
      url: '',
      place_id: '',
      type: 'custom',
      image_src: '',
      latlng: {
        lat: 0,
        lng: 0,
      },
    },
  ],
  schedules: [
    {
      date: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
      schedules: [
        {
          start_time: format(
            new Date(new Date().setHours(7, 0, 0, 0)),
            'HH:mm'
          ),
          end_time: format(new Date(new Date().setHours(17, 0, 0, 0)), 'HH:mm'),
          activity: {
            en: 'Registration and Breakfast',
            km: '',
          },
        },
        {
          start_time: format(
            new Date(new Date().setHours(9, 0, 0, 0)),
            'HH:mm'
          ),
          end_time: format(
            new Date(new Date().setHours(10, 30, 0, 0)),
            'HH:mm'
          ),
          activity: {
            en: 'Introduction to HTML',
            km: '',
          },
        },
        {
          start_time: format(
            new Date(new Date().setHours(10, 30, 0, 0)),
            'HH:mm'
          ),
          end_time: format(new Date(new Date().setHours(12, 0, 0, 0)), 'HH:mm'),
          activity: {
            en: 'Introduction to CSS',
            km: '',
          },
        },
      ],
    },
  ],
  custom_schedule: false,
  join_methods: [
    {
      name: {
        en: 'Register Online',
        km: '',
      },
      link: 'https://www.abccompany.com/register',
    },
  ],
  dynamic_contents: [
    {
      name: {
        en: 'Featured Speakers',
        km: '',
      },
      items: [
        {
          image: { src: '', file: null },
          name: {
            en: 'John Smith',
            km: '',
          },
          detail: {
            en: 'John Smith is a web developer with over 10 years of experience in the industry.',
            km: '',
          },
        },
        {
          image: { src: '', file: null },
          name: {
            en: 'Jake Bill',
            km: '',
          },
          detail: {
            en: 'Jake Bill is a web developer with over 10 years of experience in the industry.',
            km: '',
          },
        },
      ],
    },
  ],
};

export function EventFormPage() {
  const { push } = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <>
      <SeoMeta
        title={`Submit Event | ព្រឹត្តិការណ៍​ - Prutteka`}
        description=""
      />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          try {
            setIsSubmitting(true);
            const formData = buildEventForm(values);
            // log
            // formData.forEach((data, key) => {
            //   console.log(key, ':', data);
            // });
            const response = await axios.post('/events', formData, {
              headers: {
                Authorization:
                  'Bearer ' + (await auth.currentUser?.getIdToken()),
              },
            });
            const { data } = response.data as APIResponseEvent;

            push('/event/' + data.id);
          } catch (error) {
            setIsSubmitting(false);
          }
        }}
      >
        {({ values }) => (
          <InnerForm values={values} isSubmitting={isSubmitting} />
        )}
      </Formik>
    </>
  );
}

const InnerForm: React.FC<{
  values: InitialValueType;
  isSubmitting: boolean;
}> = ({ values, isSubmitting }) => {
  const [eventDate, setEventDate] = useState<Date[]>([]);
  const [selectedPage, setSelectedPage] = useState(0);
  const [isValidated, setIsValidated] = useState(false);

  const date = values.date;

  useEffect(() => {
    const startDate = new Date(date.start_date);
    const endDate = new Date(date.end_date);
    if (endDate < startDate) return;

    const dateRange = eachDayOfInterval({
      start: startDate,
      end: endDate,
    });
    setEventDate(dateRange);
  }, [date.start_date, date.end_date]);

  useEffect(() => {
    const validateValue = async () => {
      try {
        await validationSchema.validate(values);

        setIsValidated(true);
      } catch (error) {
        setIsValidated(false);
      }
    };

    validateValue();
  }, [values]);

  return (
    <Form className="mx-auto max-w-6xl space-y-4 pb-16">
      <FloatingNavigation setPage={(page) => setSelectedPage(page)} />

      {selectedPage === 0 ? <DetailForm /> : null}

      {/* Date & Time */}
      {selectedPage === 1 ? <DateTimeForm date={eventDate} /> : null}

      {/* Location */}
      {selectedPage === 2 ? <LocationForm /> : null}

      {/* Schedule */}
      {selectedPage === 3 ? <ScheduleForm date={eventDate} /> : null}

      {/* How to join */}
      {selectedPage === 4 ? <JoinMethodForm /> : null}

      {/* Dynamic Content */}
      {selectedPage === 5 ? <DynamicContentForm /> : null}

      <div className="flex justify-between">
        {selectedPage !== 0 ? (
          <button
            type="button"
            className="text-primary border-primary-light bg-primary-light flex h-12 items-center justify-center gap-4 rounded-2xl border px-6"
            onClick={() => setSelectedPage((prev) => prev - 1)}
          >
            <ArrowLongLeftIcon className="h-6 w-6" />
            Previous
          </button>
        ) : null}
        {selectedPage < 5 ? (
          <button
            type="button"
            className="text-primary border-primary-light bg-primary-light flex h-12 items-center justify-center gap-4 rounded-2xl border px-6"
            onClick={() => setSelectedPage((prev) => prev + 1)}
          >
            Next <ArrowLongRightIcon className="h-6 w-6" />
          </button>
        ) : null}
      </div>

      {isValidated ? (
        <button
          type="submit"
          className="gradient-text from-primary to-secondary h-14 rounded-2xl bg-gradient-to-r bg-[length:200%] px-12 font-medium text-white shadow-md transition-all duration-200"
        >
          {isSubmitting ? (
            <svg
              className={`h-5 w-5 animate-spin text-white`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            'Submit'
          )}
        </button>
      ) : null}
    </Form>
  );
};
