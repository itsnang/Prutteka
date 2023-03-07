import { HomePage } from 'modules';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import axios from 'axios';
import { SWRConfig } from 'swr';
import { unstable_serialize } from 'swr/infinite';

const initialAPI = '/events?filter[category]=all&page[offset]=0&page[limit]=9';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const response = await axios.get(initialAPI);

  return {
    props: {
      fallback: {
        [unstable_serialize(() => initialAPI)]: [response.data],
      },
      ...(await serverSideTranslations(locale ?? 'en')),
    },
    revalidate: 10,
  };
};

export default function Home({
  fallback,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <SWRConfig
      value={{
        fallback,
      }}
    >
      <HomePage />
    </SWRConfig>
  );
}
