import { Button, InputField, RichEditor, Typography } from 'ui';
import { Formik, Form, Field, FieldArray } from 'formik';
import { DatetimeForm } from './DatetimeForm';
import { genValidationSchema } from './validationSchema';
import { ScheduleForm } from './ScheduleForm';
import { getEventLength, getEventDays } from './helper';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { SelectField } from 'ui/src/SelectField';
import { EventDetail } from '../../type/EventDetailType';
import { ImageUpload } from './ImageUpload';
import {
  QuestionMarkCircleIcon,
  PlusIcon,
  MinusIcon,
} from '@heroicons/react/24/outline';
import {
  CATEGORIES,
  INITIAL_VALUES,
  TRANSLATION as t,
  TYPES,
  LOCATIONS,
} from './Constant';
import { useRouter } from 'next/router';

type InitialValuesType = typeof INITIAL_VALUES & {
  id?: string;
};

interface EventFormProps {
  onSubmit: (
    values: InitialValuesType,
    push: (url: string) => Promise<boolean>,
    setIsSubmiting: Dispatch<SetStateAction<boolean>>
  ) => Promise<void>;
  initialValues: InitialValuesType;
}

export const EventForm: React.FC<EventFormProps> = ({
  onSubmit,
  initialValues,
}) => {
  const [lang, setLang] = useState<'en' | 'kh'>('en');
  const [isSubmiting, setIsSubmiting] = useState(false);
  const validationSchema = useMemo(() => genValidationSchema(lang), [lang]);
  const { push } = useRouter();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => onSubmit(values, push, setIsSubmiting)}
    >
      {({ values }) => (
        <InnerForm
          values={values}
          lang={lang}
          setLang={setLang}
          isSubmiting={isSubmiting}
        />
      )}
    </Formik>
  );
};

const InnerForm: React.FC<{
  values: EventDetail;
  lang: 'en' | 'kh';
  setLang: (lang: 'en' | 'kh') => void;
  isSubmiting: boolean;
}> = ({ values, lang, setLang, isSubmiting }) => {
  const [eventState, setEventState] = useState<{
    eventDays: Date[];
    isInvalidInput: boolean;
  }>({ eventDays: [], isInvalidInput: true });

  useEffect(() => {
    const start_date = values.datetime.start_date;
    const end_date = values.datetime.end_date;
    const eventLength = getEventLength(start_date, end_date);
    if (eventLength <= 0 || !start_date || !end_date || eventLength > 10)
      return setEventState((prev) => ({ ...prev, isInvalidInput: true }));
    else
      setEventState({
        eventDays: getEventDays(start_date, end_date),
        isInvalidInput: false,
      });
  }, [values.datetime.start_date, values.datetime.end_date]);

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

        <ImageUpload
          t={t}
          lang={lang}
          image_src={values.details.img}
          name="details.img"
        />

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
              options={TYPES}
              lang={lang}
            />

            <SelectField
              name="details.category"
              label={t.category[lang]}
              placeholder={t.category[lang]}
              containerClassName="flex-1"
              options={CATEGORIES}
              lang={lang}
            />
          </div>
          <SelectField
            name="details.location"
            label={t.location[lang]}
            placeholder={t.location[lang]}
            containerClassName="flex-1"
            options={LOCATIONS}
            lang={lang}
          />

          <RichEditor
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
                  className="flex items-start gap-2 rounded-2xl border border-gray-100 bg-white p-2 first:border-white/0 first:bg-white/0 md:gap-4 md:border-0 md:bg-gray-50 md:p-0"
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
                onClick={() => arrayHelpers.push(INITIAL_VALUES.locations[0])}
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
                  className="flex items-start gap-2 rounded-2xl border border-gray-100 bg-white p-2 first:border-white/0 first:bg-white/0 md:gap-4 md:border-0 md:bg-gray-50 md:p-0"
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
                      name={`joinMethods.${idx}.name.${lang}`}
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
                onClick={() => arrayHelpers.push(INITIAL_VALUES.joinMethods[0])}
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

      <Button className="w-full" type="submit" isLoading={isSubmiting}>
        {t.submitEvent[lang]}
      </Button>
    </Form>
  );
};
