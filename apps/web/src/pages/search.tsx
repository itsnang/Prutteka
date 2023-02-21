import { Search } from 'modules';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';

const API_URL = process.env.API_ENDPOINT || '';

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  query,
}) => {
  const { search } = query;

  const reponse = await fetch(`${API_URL}/api/v1/events?search=${search}`);

  const data = await reponse.json();

  return {
    props: { data: data, ...(await serverSideTranslations(locale ?? 'en')) },
  };
};

export default Search;
