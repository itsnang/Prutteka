import { SubmitEventPage } from 'modules';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en')),
    },
  };
};

export default SubmitEventPage;
