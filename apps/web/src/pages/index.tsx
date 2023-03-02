import { HomePage } from 'modules';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import axios from 'axios';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const response = await axios.get('/events');

  return {
    props: {
      initialData: [response.data],
      ...(await serverSideTranslations(locale ?? 'en')),
    },
    revalidate: 10,
  };
};

export default HomePage;
