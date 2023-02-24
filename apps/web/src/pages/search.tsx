import { Search } from 'modules';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';

const API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT || '';

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  query,
}) => {
  const { search, location, category } = query;

  const searchQuery = `search=${search}`;
  const locationQuery = !!location ? `&filter[location]=${location}` : '';
  const categoryQuery = !!category ? `&filter[category]=${category}` : '';
  const fieldsQuery = '&fields=name,image_src,type,category,date_time,location';

  const reponse = await fetch(
    `${API_URL}/api/v1/events?${searchQuery}${locationQuery}${categoryQuery}${fieldsQuery}`
  );

  const data = await reponse.json();

  return {
    props: { data: data, ...(await serverSideTranslations(locale ?? 'en')) },
  };
};

export default Search;
