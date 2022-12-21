import { InputField, Typography } from 'ui';
import { Field, FieldArray, useFormikContext } from 'formik';
import { useEffect } from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import { EventDetail } from '../type/EventDetailType';
import { getCurrentTime } from './helper';

interface ScheduleFormProps {
  scheduleState: EventDetail['schedule'];
  isInvalidInput: boolean;
  eventDays: Date[];
  startDate: Date | string;
  endDate: Date | string;
}

export const ScheduleForm: React.FC<ScheduleFormProps> = ({
  scheduleState,
  eventDays,
  isInvalidInput,
  startDate,
  endDate,
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
          activity: '',
        },
      ],
    }));

    setFieldValue('schedule', {
      ...scheduleState,
      customSchedules: newCustomSchedules,
    });
  }, [isInvalidInput, startDate, endDate]);
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
                              label="Start Time"
                              placeholder="Start Time"
                              type="time"
                            />
                            <InputField
                              name={`schedule.customSchedules.${idx}.schedules.${index}.endTime`}
                              label="End Time"
                              placeholder="End Time"
                              type="time"
                            />
                            <InputField
                              name={`schedule.customSchedules.${idx}.schedules.${index}.activity`}
                              label="Activity"
                              placeholder="Activity"
                              containerClassName="flex-1"
                            />
                          </div>
                        ))}

                        <AddMoreScheduleBtn
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
                    label="Start Time"
                    placeholder="Start Time"
                    type="time"
                  />
                  <InputField
                    name={`schedule.sharedSchedules.${idx}.endTime`}
                    label="End Time"
                    placeholder="End Time"
                    type="time"
                  />
                  <InputField
                    name={`schedule.sharedSchedules.${idx}.activity`}
                    label="Activity"
                    placeholder="Activity"
                    containerClassName="flex-1"
                  />
                </div>
              ))}

              <AddMoreScheduleBtn
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

      <div className="flex">
        <label className="flex cursor-pointer items-center gap-2">
          <Field
            type="checkbox"
            name="schedule.hasCustomSchedule"
            className="form-checkbox text-primary h-6 w-6 cursor-pointer overflow-hidden rounded-md border border-gray-300 outline-none focus:ring-0"
          />
          <Typography>
            Custom schedule (Different schedule for each date)
          </Typography>
        </label>
      </div>
    </div>
  );
};

const AddMoreScheduleBtn = ({ onClick }: { onClick: () => void }) => (
  <button type="button" className="text-primary flex gap-1.5" onClick={onClick}>
    <PlusIcon className="h-6 w-6" />
    <Typography className="text-primary">Add more schedule</Typography>
  </button>
);
