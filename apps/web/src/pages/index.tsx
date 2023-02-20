import { HomePage } from 'modules';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';

const API_URL = process.env.API_ENDPOINT || '';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const response = await fetch(`${API_URL}/api/v1/events`);

  const data = await response.json();

  return {
    props: {
      data: data,
      ...(await serverSideTranslations(locale ?? 'en')),
    },
  };
};

export default HomePage;
