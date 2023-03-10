import { SubmitNestedEventPage } from 'modules';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  params,
}) => {
  /**
   * @todo
   * @check_if_main_event_with_this_id_exist
   */

  return {
    props: {
      main_event: params?.eventId || '',
      ...(await serverSideTranslations(locale ?? 'en')),
    },
  };
};

export default SubmitNestedEventPage;
