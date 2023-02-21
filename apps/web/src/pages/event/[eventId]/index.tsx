import { EventDetailPage } from 'modules';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';

const API_URL = process.env.API_ENDPOINT || '';

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  query,
  req,
}) => {
  const response = await fetch(`${API_URL}/api/v1/events/${query.eventId}`);

  const data = await response.json();
  console.log(data);

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: data,
      host: req.headers.host,
      ...(await serverSideTranslations(locale ?? 'en')),
    },
  };
};

export default EventDetailPage;
