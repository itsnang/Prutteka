import { useFormikContext } from 'formik';
import {
  ImageUpload,
  MultiSelect,
  SelectField,
  TextEditorField,
  TranslationField,
} from 'ui';
import { InitialValueType } from './form.types';

// types
const TYPES = [
  { value: 'physical', text: 'Physical' },
  { value: 'online', text: 'Online' },
  { value: 'physical-online', text: 'Physical-Online' },
];

// types
const CATEGORIES = [
  { value: 'free', text: 'Free' },
  { value: 'online', text: 'Online' },
  { value: 'education', text: 'Education' },
  { value: 'sport', text: 'Sport' },
  { value: 'music', text: 'Music' },
  { value: 'charity', text: 'Charity' },
  { value: 'exhibition', text: 'Exhibition' },
  { value: 'technology', text: 'Technology' },
];

export const DetailForm = () => {
  const { values, errors, setFieldValue } =
    useFormikContext<InitialValueType>();

  return (
    <>
      {/* Image Upload */}
      <ImageUpload
        imageSrc={values.image.src}
        name="image.src"
        onCrop={(image) => {
          setFieldValue('image', {
            src: image?.url,
            file: image?.file,
          });
        }}
      />

      {/* Event Name */}
      <TranslationField
        label="Event name"
        km={{ name: 'name.km', placeholder: 'ឈ្មោះព្រឹត្តិការណ៍' }}
        en={{ name: 'name.en', placeholder: 'Event name' }}
        error={errors.name as string}
      />

      {/* Type & Category */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <SelectField label="Type" name="type" options={TYPES} />
        <MultiSelect label="Category" name="categories" options={CATEGORIES} />
      </div>
      <TextEditorField label="Details" name="detail" />
    </>
  );
};
