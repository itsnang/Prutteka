import { InputField, Typography } from 'ui';
import { Field, FieldArray, useFormikContext } from 'formik';
import { useEffect } from 'react';
import { EventDetail } from '../type/EventDetailType';
import { getCurrentTime } from './helper';

interface DatetimeFormProps {
  dateTimeState: EventDetail['datetime'];
  isInvalidInput: boolean;
  eventDays: Date[];
}

export const DatetimeForm: React.FC<DatetimeFormProps> = ({
  dateTimeState,
  isInvalidInput,
  eventDays,
}) => {
  const { hasCustomTime, customTimes, startDate, endDate } = dateTimeState;
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    if (isInvalidInput) return;
    const newCustomTimes = eventDays.map((date) => ({
      startTime: getCurrentTime(),
      endTime: getCurrentTime(),
      date: date,
    }));

    setFieldValue('datetime', {
      ...dateTimeState,
      customTimes: newCustomTimes,
    });
  }, [isInvalidInput, startDate, endDate]);

  const timeForm = hasCustomTime ? (
    <FieldArray name="datetime.customTimes">
      {() => (
        <div className="flex flex-col gap-4">
          {customTimes?.map(({ date }, idx) => (
            <div key={idx}>
              <Typography size="xl" weight="bold">
                {date?.toDateString()}
              </Typography>
              <div className="flex gap-4">
                <InputField
                  name={`datetime.customTimes.${idx}.startTime`}
                  label="Start Time"
                  placeholder="Start Time"
                  containerClassName="flex-1"
                  type="time"
                />

                <InputField
                  name={`datetime.customTimes.${idx}.endTime`}
                  label="End Time"
                  placeholder="End Time"
                  containerClassName="flex-1"
                  type="time"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </FieldArray>
  ) : (
    <div className="flex gap-4">
      <InputField
        name="datetime.startTime"
        label="Start Time"
        placeholder="Start Time"
        containerClassName="flex-1"
        className="w-full"
        type="time"
      />
      <InputField
        name="datetime.endTime"
        label="End Time"
        placeholder="End Time"
        containerClassName="flex-1"
        className="w-full"
        type="time"
      />
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <InputField
          name="datetime.startDate"
          label="Start Date"
          placeholder="Start Date"
          containerClassName="flex-1"
          className="w-full"
          type="date"
        />
        <InputField
          name="datetime.endDate"
          label="End Date"
          placeholder="End Date"
          containerClassName="flex-1"
          className="w-full"
          type="date"
        />
      </div>

      {timeForm}

      <label
        className={`group relative flex items-center gap-2 ${
          isInvalidInput ? 'cursor-not-allowed' : 'cursor-pointer'
        }`}
      >
        <Field
          disabled={isInvalidInput}
          type="checkbox"
          name="datetime.hasCustomTime"
          className={`form-checkbox text-primary h-6 w-6 cursor-pointer overflow-hidden rounded-md border border-gray-300 outline-none focus:ring-0 ${
            isInvalidInput ? 'cursor-not-allowed' : ''
          }`}
        />
        <Typography color="base">
          Custom date and time (Different start and end time for each date)
        </Typography>
        {isInvalidInput ? (
          <Typography
            size="sm"
            style={{ whiteSpace: 'nowrap' }}
            className="pointer-events-none absolute -top-8 rounded-md bg-red-600 py-1 px-2 text-center text-white opacity-0 transition-all group-hover:opacity-100"
          >
            Please provide valid start date and end date for your event above
          </Typography>
        ) : null}
      </label>
    </div>
  );
};
