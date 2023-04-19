import { HomePage } from 'modules';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import axios from 'axios';
import { SWRConfig } from 'swr';
import { unstable_serialize } from 'swr/infinite';
import { format } from 'date-fns';

// date format as 2023-12-31
const today = format(new Date(new Date().setHours(0, 0, 0, 0)), 'yyyy-MM-dd');

const initialAPI = `/events?filter[end_date][gte]=${today}&page[offset]=0&page[limit]=8`;

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
