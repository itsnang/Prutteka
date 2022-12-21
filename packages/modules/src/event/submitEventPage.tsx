import { NextPage } from 'next';
import { Button, InputField, Typography } from 'ui';
import {
  PhotoIcon,
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
import { SelectField } from './SelectField';
import { CATEGORIES } from '../constants';

const initialValues = {
  details: {
    name: '',
    type: '',
    category: '',
    detail: '',
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

  locations: [{ name: '', link: '' }],

  schedule: {
    hasCustomSchedule: false,
    sharedSchedules: [
      { startTime: getCurrentTime(), endTime: getCurrentTime(), activity: '' },
    ],
    customSchedules: [
      {
        date: undefined,
        schedules: [
          {
            startTime: getCurrentTime(),
            endTime: getCurrentTime(),
            activity: '',
          },
        ],
      },
    ],
  },

  joinMethods: [{ method: '', link: '' }],
};

export const SubmitEventPage: NextPage = () => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={(values) => console.log(values)}
  >
    {({ values }) => {
      const [eventState, setEventState] = useState<{
        eventDays: Date[];
        isInvalidInput: boolean;
      }>({ eventDays: [], isInvalidInput: true });

      useEffect(() => {
        const { startDate, endDate } = values.datetime;
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
        <Form className="space-y-8 p-4">
          <div className="flex flex-col gap-6">
            <div className="flex justify-center">
              <button
                type="button"
                className="bg-primary rounded-xl rounded-r-none border-2 border-r-0 border-gray-200 px-16 py-2.5 text-white"
              >
                EN
              </button>
              <button
                type="button"
                className="rounded-xl rounded-l-none border-2 border-l-0 border-gray-200 bg-gray-100 px-16 py-2.5"
              >
                ខ្មែរ
              </button>
            </div>

            <Typography size="3xl" weight="bold">
              Event Details
            </Typography>

            <div className="p-2.5">
              <div className="relative mx-auto flex w-full max-w-[45rem] flex-col items-center justify-center gap-2.5 rounded-2xl border-2 bg-gray-100 py-20">
                <PhotoIcon className="h-20 w-20" />
                <Typography>Drag and drop or</Typography>
                <Button icon={PhotoIcon} variant="secondary" className="px-6">
                  Upload Image
                </Button>
                <Typography className="absolute bottom-2">
                  up to 10mb
                </Typography>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <InputField
                name="details.name"
                label="Event Name"
                placeholder="Event Name"
              />
              <div className="flex gap-4">
                <SelectField
                  name="details.type"
                  label="Type"
                  placeholder="Type"
                  containerClassName="flex-1"
                  options={['online', 'physical']}
                />

                <SelectField
                  name="details.category"
                  label="Category"
                  placeholder="Category"
                  containerClassName="flex-1"
                  options={CATEGORIES.slice(2)}
                />
              </div>

              <InputField
                name="details.detail"
                label="Details"
                placeholder="Details"
              />

              <label className="flex items-center gap-2">
                <Field
                  type="checkbox"
                  name="details.nestedEvents"
                  className="form-checkbox text-primary h-6 w-6 cursor-pointer overflow-hidden rounded-md border border-gray-300 outline-none focus:ring-0"
                />
                <Typography className="cursor-pointer">Nested Event</Typography>
                <div className="group relative flex justify-center">
                  <QuestionMarkCircleIcon className="h-6 w-6 cursor-pointer" />
                  <Typography
                    size="sm"
                    style={{ whiteSpace: 'nowrap' }}
                    className="pointer-events-none absolute -top-8 rounded-md bg-gray-600 py-1 px-2 text-center text-white opacity-0 transition-all group-hover:opacity-100"
                  >
                    This event contains other events within it
                  </Typography>
                </div>
              </label>
            </div>

            <Typography size="3xl" weight="bold">
              Date and Time
            </Typography>

            <DatetimeForm dateTimeState={values.datetime} {...eventState} />

            <Typography size="3xl" weight="bold">
              Location Info
            </Typography>

            <FieldArray name="locations">
              {(arrayHelpers) => (
                <div className="flex flex-col gap-4">
                  {values?.locations?.map((_location, idx) => (
                    <div className="flex gap-4" key={idx}>
                      {idx > 0 ? (
                        <button
                          type="button"
                          className="text-primary flex gap-1.5 self-center"
                          onClick={() => arrayHelpers.remove(idx)}
                        >
                          <MinusIcon className="h-6 w-6" />
                        </button>
                      ) : null}
                      <InputField
                        name={`locations.${idx}.name`}
                        label="Location name"
                        placeholder="Location name"
                        containerClassName="flex-1"
                      />

                      <InputField
                        name={`locations.${idx}.link`}
                        label="Location link (e.g Google maps)"
                        placeholder="Location link"
                        containerClassName="flex-1"
                      />
                    </div>
                  ))}

                  <button
                    type="button"
                    className="text-primary flex gap-1.5"
                    onClick={() =>
                      arrayHelpers.push(initialValues.locations[0])
                    }
                  >
                    <PlusIcon className="h-6 w-6" />
                    <Typography className="text-primary">
                      Add more location
                    </Typography>
                  </button>
                </div>
              )}
            </FieldArray>

            <Typography size="3xl" weight="bold">
              Schedule
            </Typography>

            <ScheduleForm
              scheduleState={values.schedule}
              {...eventState}
              startDate={values.datetime.startDate}
              endDate={values.datetime.endDate}
            />

            <Typography size="3xl" weight="bold">
              How to join
            </Typography>

            <FieldArray name="joinMethods">
              {(arrayHelpers) => (
                <div className="flex flex-col gap-4">
                  {values?.joinMethods?.map((_joinMethod, idx) => (
                    <div className="flex gap-4" key={idx}>
                      {idx > 0 ? (
                        <button
                          type="button"
                          className="text-primary flex gap-1.5 self-center"
                          onClick={() => arrayHelpers.remove(idx)}
                        >
                          <MinusIcon className="h-6 w-6" />
                        </button>
                      ) : null}
                      <InputField
                        name={`joinMethods.${idx}.method`}
                        label="Method"
                        placeholder="Method"
                        containerClassName="flex-1"
                      />

                      <InputField
                        name={`joinMethods.${idx}.link`}
                        label="Link"
                        placeholder="Link"
                        containerClassName="flex-1"
                      />
                    </div>
                  ))}

                  <button
                    type="button"
                    className="text-primary flex gap-1.5"
                    onClick={() =>
                      arrayHelpers.push(initialValues.joinMethods[0])
                    }
                  >
                    <PlusIcon className="h-6 w-6" />
                    <Typography className="text-primary">
                      Add more method
                    </Typography>
                  </button>
                </div>
              )}
            </FieldArray>
          </div>

          <Button className="w-full" type="submit">
            Submit Event
          </Button>
        </Form>
      );
    }}
  </Formik>
);
