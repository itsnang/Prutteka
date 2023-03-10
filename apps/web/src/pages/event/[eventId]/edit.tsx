import { EditEventPage } from 'modules';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const API_URL = process.env.API_ENDPOINT || '';

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  params,
}) => {
  try {
    const url = `${API_URL}/api/v1/events/${params?.eventId}`;
    const res = await fetch(url);
    const data = await res.json();
    return {
      props: {
        event: data?.data,
        ...(await serverSideTranslations(locale ?? 'en')),
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};

export default EditEventPage;
