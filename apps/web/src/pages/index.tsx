import { HomePage } from 'modules';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { SWRConfig, unstable_serialize } from 'swr';

// const API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT || '';
// const API = `${API_URL}/api/v1/events?filter[category]=all`;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  // const response = await fetch(API);

  // const data = await response.json();

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en')),
    },
    revalidate: 10,
  };
};

export default HomePage;
