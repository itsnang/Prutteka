import { EventFormPage } from 'modules';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';

import 'flag-icons/css/flag-icons.min.css';
import 'react-quill/dist/quill.snow.css';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en')),
    },
  };
};

export default EventFormPage;
