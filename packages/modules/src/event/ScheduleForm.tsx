import { InputField, Typography } from 'ui';
import { Field, FieldArray, useFormikContext } from 'formik';
import { useEffect } from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import { EventDetail } from '../type/EventDetailType';
import { getCurrentTime } from './helper';
import { t } from './submitEventPage';

interface ScheduleFormProps {
  scheduleState: EventDetail['schedule'];
  isInvalidInput: boolean;
  eventDays: Date[];
  lang: 'en' | 'kh';
}

export const ScheduleForm: React.FC<ScheduleFormProps> = ({
  scheduleState,
  eventDays,
  isInvalidInput,
  lang,
}) => {
  const { hasCustomSchedule, customSchedules, sharedSchedules } = scheduleState;

  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    if (isInvalidInput) return;
    const newCustomSchedules = eventDays.map((date) => ({
      date: date,
      schedules: [
        {
          startTime: getCurrentTime(),
          endTime: getCurrentTime(),
          activity: { en: '', kh: '' },
        },
      ],
    }));

    setFieldValue('schedule', {
      ...scheduleState,
      customSchedules: newCustomSchedules,
    });
  }, [isInvalidInput, eventDays]);
  return (
    <div className="flex flex-col gap-4">
      {hasCustomSchedule ? (
        <FieldArray name="schedule.customSchedules">
          {() => (
            <div className="flex flex-col gap-4">
              {customSchedules?.map((customSchedule, idx) => (
                <div key={idx}>
                  <Typography size="xl" weight="bold">
                    {customSchedule?.date?.toDateString()}
                  </Typography>
                  <FieldArray
                    name={`schedule.customSchedules.${idx}.schedules`}
                  >
                    {(arrayHelpers) => (
                      <div className="flex flex-col gap-2">
                        {customSchedule?.schedules?.map((_schedule, index) => (
                          <div className="flex gap-4" key={index}>
                            {index > 0 ? (
                              <button
                                type="button"
                                className="text-primary flex gap-1.5"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                <MinusIcon className="h-6 w-6" />
                              </button>
                            ) : null}
                            <InputField
                              name={`schedule.customSchedules.${idx}.schedules.${index}.startTime`}
                              label={t.startTime[lang]}
                              placeholder={t.startTime[lang]}
                              type="time"
                            />
                            <InputField
                              name={`schedule.customSchedules.${idx}.schedules.${index}.endTime`}
                              label={t.endTime[lang]}
                              placeholder={t.endTime[lang]}
                              type="time"
                            />
                            <InputField
                              name={`schedule.customSchedules.${idx}.schedules.${index}.activity.${lang}`}
                              label={t.activity[lang]}
                              placeholder={t.activity[lang]}
                              containerClassName="flex-1"
                            />
                          </div>
                        ))}

                        <AddMoreScheduleBtn
                          lang={lang}
                          onClick={() =>
                            arrayHelpers.push({
                              startTime: getCurrentTime(),
                              endTime: getCurrentTime(),
                              activity: { en: '', kh: '' },
                            })
                          }
                        />
                      </div>
                    )}
                  </FieldArray>
                </div>
              ))}
            </div>
          )}
        </FieldArray>
      ) : (
        <FieldArray name="schedule.sharedSchedules">
          {(arrayHelpers) => (
            <div className="flex flex-col gap-4">
              {sharedSchedules?.map((schedule, idx) => (
                <div className="flex gap-4" key={idx}>
                  {idx > 0 ? (
                    <button
                      type="button"
                      className="text-primary flex gap-1.5"
                      onClick={() => arrayHelpers.remove(idx)}
                    >
                      <MinusIcon className="h-6 w-6" />
                    </button>
                  ) : null}
                  <InputField
                    name={`schedule.sharedSchedules.${idx}.startTime`}
                    label={t.startTime[lang]}
                    placeholder={t.startTime[lang]}
                    type="time"
                  />
                  <InputField
                    name={`schedule.sharedSchedules.${idx}.endTime`}
                    label={t.endTime[lang]}
                    placeholder={t.endTime[lang]}
                    type="time"
                  />
                  <InputField
                    name={`schedule.sharedSchedules.${idx}.activity.${lang}`}
                    label={t.activity[lang]}
                    placeholder={t.activity[lang]}
                    containerClassName="flex-1"
                  />
                </div>
              ))}

              <AddMoreScheduleBtn
                lang={lang}
                onClick={() =>
                  arrayHelpers.push({
                    startTime: getCurrentTime(),
                    endTime: getCurrentTime(),
                    activity: '',
                  })
                }
              />
            </div>
          )}
        </FieldArray>
      )}

      <label
        className={`group relative flex items-center gap-2 ${
          isInvalidInput ? 'cursor-not-allowed' : 'cursor-pointer'
        }`}
      >
        <Field
          disabled={isInvalidInput}
          type="checkbox"
          name="schedule.hasCustomSchedule"
          className={`form-checkbox text-primary h-6 w-6 cursor-pointer overflow-hidden rounded-md border border-gray-300 outline-none focus:ring-0 ${
            isInvalidInput ? 'cursor-not-allowed' : ''
          }`}
        />
        <Typography color="base">{t.customSchedule[lang]}</Typography>
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

const AddMoreScheduleBtn = ({
  onClick,
  lang,
}: {
  onClick: () => void;
  lang: 'en' | 'kh';
}) => (
  <button type="button" className="text-primary flex gap-1.5" onClick={onClick}>
    <PlusIcon className="h-6 w-6" />
    <Typography className="text-primary">{t.addMoreSchedule[lang]}</Typography>
  </button>
);
