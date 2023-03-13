import { MyProfilePage } from 'modules';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';

const API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT || '';

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  params,
}) => {
  try {
    const res = await fetch(`${API_URL}/api/v1/users/${params?.userId}/events`);
    const { data } = await res.json();

    const user = { ...data?.attributes, id: data?.id };

    delete user.events;

    return {
      props: {
        events: data?.attributes?.events,
        user: user,
        ...(await serverSideTranslations(locale ?? 'en')),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default MyProfilePage;
