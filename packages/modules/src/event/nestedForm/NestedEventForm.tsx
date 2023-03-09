import { useMemo, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ImageUpload } from '../form/ImageUpload';
import { TRANSLATION as t } from '../form/Constant';
import { INITIAL_VALUES } from './SubmitNestedEventPage';
import { Button, InputField, RichEditor } from 'ui';
import { errorMessage } from '../form/validationSchema';
import { getEditorStateText } from '../form/helper';

interface NestedEvenFormProps {
  initialValues: typeof INITIAL_VALUES;
  onSubmit: (
    values: typeof INITIAL_VALUES,
    setIsSubmiting: (arg: boolean) => void
  ) => Promise<void>;
}

const genValidationSchema = (lang: 'en' | 'kh') => {
  return Yup.object().shape({
    image_src: Yup.object()
      .nullable()
      .test(
        'test_image_required_provided',
        errorMessage.mustProvideImage[lang],
        //value could be undefined (no image) or null (image in the form of blob)
        (value: any) => value === null
      ),
    name: Yup.object({
      en: Yup.string()
        .test(
          'Must have name in 1 language',
          errorMessage.mustProvideNameInOneLang.en,
          (value: any, ctx: any) => {
            const enText = value;
            const khText = ctx?.parent?.kh;
            return !!khText || !!enText;
          }
        )
        .test(
          'Test length longer than 5 characters',
          'Event name must be at least 5 characters long',
          (value?: string) => !value || value.length > 5
        ),
      kh: Yup.string()
        .test(
          'Must have name in 1 language',
          errorMessage.mustProvideNameInOneLang.kh,
          (value: any, ctx: any) => {
            const khText = value;
            const enText = ctx?.parent?.en;
            return !!khText || !!enText;
          }
        )
        .test(
          'Test length longer than 5 characters',
          'សូមបំពេញឈ្មោះព្រឹត្តិការណ៍ឲ្យវែងជាងនេះ',
          (value?: string) => !value || value.length > 5
        ),
    }),
    detail: Yup.object({
      en: Yup.object()
        .test(
          'Detail too long',
          errorMessage.maxEventDetailTenThousand.en,
          (value: any) => getEditorStateText(value).length < 10000
        )
        .test(
          'Must have detail in 1 language',
          errorMessage.mustProvideDetailInOneLang.en,
          (value: any, ctx: any) => {
            const khText = getEditorStateText(ctx?.parent?.kh).length;
            const enText = getEditorStateText(value).length;
            return !!khText || !!enText;
          }
        ),
      kh: Yup.object()
        .test(
          'Detail too long',
          errorMessage.maxEventDetailTenThousand.kh,
          (value: any) => getEditorStateText(value).length < 10000
        )
        .test(
          'Must have detail in 1 language',
          errorMessage.mustProvideDetailInOneLang.kh,
          (value: any, ctx: any) => {
            const khText = getEditorStateText(value).length;
            const enText = getEditorStateText(ctx.parent.en).length;
            return !!khText || !!enText;
          }
        ),
    }),
  });
};

export const NestedEventForm: React.FC<NestedEvenFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  const [lang, setLang] = useState<'en' | 'kh'>('en');
  const [isSubmiting, setIsSubmiting] = useState(false);
  const validationSchema = useMemo(() => genValidationSchema(lang), [lang]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => onSubmit(values, setIsSubmiting)}
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

interface InnerFormProps {
  lang: 'en' | 'kh';
  setLang: (lang: 'en' | 'kh') => void;
  isSubmiting: boolean;
  values: typeof INITIAL_VALUES;
}

const InnerForm: React.FC<InnerFormProps> = ({ lang, values, setLang }) => {
  return (
    <Form className="flex flex-col gap-4">
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

      <ImageUpload
        t={t}
        lang={lang}
        image_src={values.image_src}
        name="image_src"
      />

      <InputField
        name={`name.${lang}`}
        label={t.eventName[lang]}
        placeholder={t.eventName[lang]}
      />

      <RichEditor
        name={`detail.${lang}`}
        label={t.details[lang]}
        placeholder={t.details[lang]}
      />

      <Button type="submit">{t.submitEvent[lang]}</Button>
    </Form>
  );
};
