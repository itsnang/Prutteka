import { EventDetailPage } from 'modules';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import axios from 'axios';

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  query,
  req,
}) => {
  try {
    const response = await axios.get(`/events/${query.eventId}`);

    return {
      props: {
        data: response.data,
        host: req.headers.host,
        ...(await serverSideTranslations(locale ?? 'en')),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default EventDetailPage;
