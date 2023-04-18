import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { format } from 'date-fns';

import { InitialValueType } from './form.types';
import { Field, CheckboxField, Message } from 'ui';
import { ClockIcon } from '@heroicons/react/24/solid';

interface DateTimeFormProps {
  date: Date[];
}

export const DateTimeForm: React.FC<DateTimeFormProps> = ({ date }) => {
  const { setFieldValue, values, errors } =
    useFormikContext<InitialValueType>();

  useEffect(() => {
    if (date.length <= 0) return;

    const newTimes = date.map((_date) => {
      const time = values.times.find(
        (time) => new Date(time.date).toISOString() === _date.toISOString()
      );

      if (time) {
        return {
          date: time.date,
          start_time: time.start_time,
          end_time: time.end_time,
        };
      }

      return {
        date: _date.toISOString(),
        start_time: '07:00',
        end_time: '17:00',
      };
    });

    setFieldValue('times', newTimes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setFieldValue, date]);

  return (
    <div className="space-y-4 py-6">
      <h2 className="flex items-center space-x-4 text-3xl font-semibold">
        <span className="bg-tertiary-light rounded-full p-3">
          <ClockIcon className="text-tertiary h-8 w-8" />
        </span>
        <span>Date and time</span>
      </h2>

      {/* Start & End Date */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <Field label="Start date" type="date" name="date.start_date" />
        <Field label="End date" type="date" name="date.end_date" />
      </div>
      {errors.date ? (
        <Message variant="error">{errors.date as string}</Message>
      ) : null}

      {/* Start & End Time */}
      {values.custom_date ? (
        values.times.map((time, index) => (
          <div key={index} className="space-y-2">
            <span className="text-xl font-semibold text-gray-900">
              {format(new Date(time.date), 'PPPP')}
            </span>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Field
                label="Start time"
                type="time"
                name={`times.${index}.start_time`}
              />
              <Field
                label="End time"
                type="time"
                name={`times.${index}.end_time`}
              />
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col gap-4 sm:flex-row">
          <Field label="Start time" type="time" name="times.0.start_time" />
          <Field label="End time" type="time" name="times.0.end_time" />
        </div>
      )}

      {/* Checkbox Custom Date */}
      <CheckboxField label="Custom times" name="custom_date" />
    </div>
  );
};
