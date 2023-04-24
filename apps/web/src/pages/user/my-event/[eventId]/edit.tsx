import { EditEventFormPage } from 'modules';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';

import 'flag-icons/css/flag-icons.min.css';
import 'react-quill/dist/quill.snow.css';

import axios from 'axios';

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  query,
}) => {
  const response = await axios.get(`/events/${query.eventId}`);

  return {
    props: {
      data: response.data,
      ...(await serverSideTranslations(locale ?? 'en')),
    },
  };
};

export default EditEventFormPage;
