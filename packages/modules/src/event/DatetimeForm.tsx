import { InputField, Typography } from 'ui';
import { Field, FieldArray, useFormikContext } from 'formik';
import { useEffect } from 'react';
import { EventDetail } from '../type/EventDetailType';
import { getCurrentTime } from './helper';
import { t } from './submitEventPage';
import { translateDate } from '../helpers';

interface DatetimeFormProps {
  dateTimeState: EventDetail['datetime'];
  isInvalidInput: boolean;
  eventDays: Date[];
  lang: 'en' | 'kh';
}

export const DatetimeForm: React.FC<DatetimeFormProps> = ({
  dateTimeState,
  isInvalidInput,
  eventDays,
  lang,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInvalidInput, eventDays]);

  const timeForm = hasCustomTime ? (
    <FieldArray name="datetime.customTimes">
      {() => (
        <div className="flex flex-col gap-4">
          {customTimes?.map(({ date }, idx) => (
            <div key={idx}>
              <Typography size="xl" weight="bold">
                {translateDate(date as Date, lang)}
              </Typography>
              <div className="flex flex-col gap-2 rounded-2xl border border-gray-100 bg-white p-2 md:flex-row md:gap-4 md:border-0 md:bg-gray-50 md:p-0">
                <InputField
                  name={`datetime.customTimes.${idx}.startTime`}
                  label={t.startTime[lang]}
                  placeholder={t.startTime[lang]}
                  containerClassName="flex-1"
                  type="time"
                />

                <InputField
                  name={`datetime.customTimes.${idx}.endTime`}
                  label={t.endTime[lang]}
                  placeholder={t.endTime[lang]}
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
    <div className="flex flex-col gap-2 rounded-2xl border border-gray-100 bg-white p-2 md:flex-row md:gap-4 md:border-0 md:bg-gray-50 md:p-0">
      <InputField
        name="datetime.startTime"
        label={t.startTime[lang]}
        placeholder={t.startTime[lang]}
        containerClassName="flex-1"
        className="w-full"
        type="time"
      />
      <InputField
        name="datetime.endTime"
        label={t.endTime[lang]}
        placeholder={t.endTime[lang]}
        containerClassName="flex-1"
        className="w-full"
        type="time"
      />
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      {/* flex flex-col gap-2 rounded-2xl border border-gray-100 bg-white p-2 md:flex-row md:gap-4 md:border-0 md:bg-gray-50 md:p-0 */}

      <div className="flex flex-col gap-2 rounded-2xl border border-gray-100 bg-white p-2 md:flex-row md:gap-4 md:border-0 md:bg-gray-50 md:p-0">
        <InputField
          name="datetime.startDate"
          label={t.startDate[lang]}
          placeholder={t.startDate[lang]}
          containerClassName="flex-1"
          className="w-full"
          type="date"
        />
        <InputField
          name="datetime.endDate"
          label={t.endDate[lang]}
          placeholder={t.endDate[lang]}
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
        <Typography color="base">{t.customDateAndTime[lang]}</Typography>
        {isInvalidInput ? (
          <Typography
            size="sm"
            style={{ whiteSpace: 'nowrap' }}
            className="pointer-events-none absolute -top-8 rounded-md bg-red-600 py-1 px-2 text-center text-white opacity-0 transition-all group-hover:opacity-100"
          >
            {t.invalidDateTime[lang]}
          </Typography>
        ) : null}
      </label>
    </div>
  );
};
