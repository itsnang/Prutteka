import { useCallback } from 'react';
import { getEditorStateHTML, objToFormData } from '../form/helper';
import { NestedEventForm } from './NestedEventForm';

export const INITIAL_VALUES = {
  image_src: '',
  name: { en: '', kh: '' },
  detail: { en: '', kh: '' },
};

interface SubmitNestedEventPageProps {
  main_event: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT || '';

export const SubmitNestedEventPage: React.FC<SubmitNestedEventPageProps> = ({
  main_event,
}) => {
  const handleSubmit = useCallback(
    async (values: typeof INITIAL_VALUES) => {
      try {
        console.log(values);

        const formData = objToFormData({
          ...values,
          detail: {
            kh: getEditorStateHTML(values.detail.kh),
            en: getEditorStateHTML(values.detail.en),
          },
        });

        const res = await fetch(
          `${API_URL}/api/v1/events/${main_event}/nested`,
          {
            method: 'POST',
            body: formData,
          }
        );
        const data = await res.json();

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },

    [main_event]
  );

  return (
    <NestedEventForm initialValues={INITIAL_VALUES} onSubmit={handleSubmit} />
  );
};
