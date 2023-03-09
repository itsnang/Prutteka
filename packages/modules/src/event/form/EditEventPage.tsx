import { APIResponseEvent } from 'custom-types';
import { NextPage } from 'next/types';
import { useCallback, useMemo } from 'react';
import { SeoMeta } from 'ui';
import { INITIAL_VALUES } from './Constant';
import { EventForm } from './EventForm';
import { apiToFormData, buildFormData } from './helper';

const API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT || '';

type ValuesType = typeof INITIAL_VALUES & {
  id?: string;
};

interface EditEventPageInterface {
  event: APIResponseEvent['data'];
}

export const EditEventPage: React.FC<EditEventPageInterface> = ({ event }) => {
  const initialValues = useMemo(() => apiToFormData(event), [event]);

  const handleSubmit = useCallback(
    async (values: ValuesType) => {
      const formData = buildFormData(values);

      formData.append('previous_image_src', event.attributes.image_src);

      const res = await fetch(`${API_URL}/api/v1/events/${values.id}`, {
        method: 'PUT',
        body: formData,
      });

      const data = await res.json();

      console.log(data);
    },
    [event.attributes.image_src]
  );

  return (
    <>
      <SeoMeta title="Edit your event - Prutteka" description="" />

      <EventForm onSubmit={handleSubmit} initialValues={initialValues} />
    </>
  );
};
