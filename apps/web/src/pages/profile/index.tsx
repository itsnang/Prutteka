import { MyProfilePage } from 'modules';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  try {
    return {
      props: {
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
