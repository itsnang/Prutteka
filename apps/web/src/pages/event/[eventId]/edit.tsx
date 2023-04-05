// import { EditEventPage } from 'modules';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';
import { APIResponseEvent } from 'custom-types';

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  params,
}) => {
  try {
    const response = await axios.get(`/events/${params?.eventId}`);
    const event = response.data as APIResponseEvent;

    return {
      props: {
        event: event.data,
        ...(await serverSideTranslations(locale ?? 'en')),
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};

export default null;
