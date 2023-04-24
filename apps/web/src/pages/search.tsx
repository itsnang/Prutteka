import { Search } from 'modules';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';

import axios from 'axios';

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  query,
}) => {
  const { search, location, category } = query;

  const searchQuery = `search=${search}`;
  const locationQuery = !!location ? `&filter[location]=${location}` : '';
  const categoryQuery = !!category ? `&filter[category]=${category}` : '';
  const fieldsQuery = '&fields=name,image_src,type,category,date_time,location';

  const response = await axios.get(
    `/events?${searchQuery}${locationQuery}${categoryQuery}${fieldsQuery}`
  );

  return {
    props: {
      initialData: response.data,
      ...(await serverSideTranslations(locale ?? 'en')),
    },
  };
};

export default Search;
