import { NextPage } from 'next/types';
import { SeoMeta } from 'ui';
import { INITIAL_VALUES } from './Constant';
import { EventForm } from './EventForm';
import { buildFormData } from './helper';

const API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT || '';

const handleSubmit = async (
  values: typeof INITIAL_VALUES,
  push: (url: string) => Promise<boolean>,
  setIsSubmiting: (arg: boolean) => void
) => {
  try {
    const formData = buildFormData(values);

    setIsSubmiting(true);

    const res = await fetch(`${API_URL}/api/v1/events`, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();

    console.log(data);

    // push(`/event/${data?.data?.id}`);
  } catch (error) {
    console.log(error);
  } finally {
    setIsSubmiting(false);
  }
};

export const SubmitEventPage: NextPage = () => {
  return (
    <>
      <SeoMeta title="Submit an Event - Prutteka" description="" />

      <EventForm onSubmit={handleSubmit} initialValues={INITIAL_VALUES} />
    </>
  );
};
