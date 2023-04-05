import React, { useEffect } from 'react';

import { FieldArray, useFormikContext } from 'formik';
import { format } from 'date-fns';

import { InitialValueType } from './form.types';
import { CheckboxField, TranslationField, Field } from 'ui';
import {
  CalendarDaysIcon,
  MinusIcon,
  PlusIcon,
} from '@heroicons/react/24/solid';

interface DateTimeFormProps {
  date: Date[];
}

export const ScheduleForm: React.FC<DateTimeFormProps> = ({ date }) => {
  const { setFieldValue, values } = useFormikContext<InitialValueType>();
  const { errors } = useFormikContext<InitialValueType>();

  useEffect(() => {
    if (date.length <= 0) return;

    const newSchedules = date.map((_date) => {
      const schedule = values.schedules.find(
        (schedule) =>
          new Date(schedule.date).toISOString() === _date.toISOString()
      );

      if (schedule) {
        return {
          date: schedule.date,
          schedules: schedule.schedules,
        };
      }

      return {
        date: _date,
        schedules: [
          {
            start_time: '07:00',
            end_time: '17:00',
            activity: {
              en: '',
              km: '',
            },
          },
        ],
      };
    });

    if (values.custom_schedule) {
      setFieldValue('schedules', newSchedules);
    } else {
      setFieldValue('schedules', newSchedules.slice(0, 1));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setFieldValue, date, values.custom_schedule]);

  return (
    <div className="space-y-6 py-6">
      <h2 className="flex items-center space-x-4 text-3xl font-semibold">
        <span className="bg-primary-light rounded-full p-3">
          <CalendarDaysIcon className="text-primary h-8 w-8" />
        </span>
        <span>Schedule</span>
      </h2>

      {/* Custom Schedule */}
      {values.custom_schedule ? (
        values.schedules.map((schedule, dateIndex) => (
          <div key={dateIndex} className="space-y-6">
            <span className="border-primary-light shadow-primary-light sticky top-16 rounded-full border bg-white py-3 px-4 text-xl font-semibold text-gray-900 shadow">
              {format(new Date(schedule.date), 'PPPP')}
            </span>

            <FieldArray name={`schedules.${dateIndex}.schedules`}>
              {({ push, remove }) => (
                <>
                  {schedule.schedules.map((_, scheduleIndex) => (
                    <div
                      key={scheduleIndex}
                      className={`flex flex-col space-y-2 ${
                        scheduleIndex !== 0
                          ? 'rounded-xl border bg-white p-4'
                          : ''
                      }`}
                    >
                      {scheduleIndex !== 0 ? (
                        <button
                          type="button"
                          onClick={() => remove(scheduleIndex)}
                        >
                          <MinusIcon className="text-primary h-6 w-6" />
                        </button>
                      ) : null}
                      <div className="flex flex-col gap-4 md:flex-row">
                        <div className="flex flex-1 space-x-4">
                          <Field
                            label="Start time"
                            type="time"
                            name={`schedules.${dateIndex}.schedules.${scheduleIndex}.start_time`}
                          />
                          <Field
                            label="End time"
                            type="time"
                            name={`schedules.${dateIndex}.schedules.${scheduleIndex}.end_time`}
                          />
                        </div>
                        <div className="flex-1">
                          <TranslationField
                            label="Activity"
                            km={{
                              name: `schedules.${dateIndex}.schedules.${scheduleIndex}.activity.km`,
                              placeholder: 'សកម្មភាព',
                            }}
                            en={{
                              name: `schedules.${dateIndex}.schedules.${scheduleIndex}.activity.en`,
                              placeholder: 'Activity',
                            }}
                            error={errors.schedules as string}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    className="text-primary active:text-primary-dark flex items-center space-x-2 transition-colors duration-150"
                    type="button"
                    onClick={() => {
                      push({
                        start_time: '07:00',
                        end_time: '17:00',
                        activity: {
                          en: '',
                          km: '',
                        },
                      });
                    }}
                  >
                    <PlusIcon className="h-5 w-5" />
                    <span>Add more schedule</span>
                  </button>
                </>
              )}
            </FieldArray>
          </div>
        ))
      ) : (
        <div className="space-y-2">
          <FieldArray name="schedules.0.schedules">
            {({ push, remove }) => (
              <>
                {values.schedules[0].schedules.map((_, index) => (
                  <div
                    key={index}
                    className={`flex flex-col space-y-2 ${
                      index !== 0 ? 'rounded-xl border bg-white p-4' : ''
                    }`}
                  >
                    {index !== 0 ? (
                      <button type="button" onClick={() => remove(index)}>
                        <MinusIcon className="text-primary h-6 w-6" />
                      </button>
                    ) : null}
                    <div className="flex flex-col gap-4 sm:flex-row">
                      <div className="flex flex-1 space-x-4">
                        <Field
                          label="Start time"
                          type="time"
                          name={`schedules.0.schedules.${index}.start_time`}
                        />
                        <Field
                          label="End time"
                          type="time"
                          name={`schedules.0.schedules.${index}.end_time`}
                        />
                      </div>
                      <div className="flex-1">
                        <TranslationField
                          label="Activity"
                          km={{
                            name: `schedules.0.schedules.${index}.activity.km`,
                            placeholder: 'សកម្មភាព',
                          }}
                          en={{
                            name: `schedules.0.schedules.${index}.activity.en`,
                            placeholder: 'Activity',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  className="text-primary active:text-primary-dark flex items-center space-x-2 transition-colors duration-150"
                  type="button"
                  onClick={() =>
                    push({
                      start_time: '07:00',
                      end_time: '17:00',
                      activity: {
                        en: '',
                        km: '',
                      },
                    })
                  }
                >
                  <PlusIcon className="h-5 w-5" />
                  <span>Add more schedule</span>
                </button>
              </>
            )}
          </FieldArray>
        </div>
      )}

      {/* Checkbox Custom Date */}
      <CheckboxField label="Custom schedule" name="custom_schedule" />
    </div>
  );
};
