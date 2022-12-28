import { EVENTDATA, Search } from 'modules';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  query,
}) => {
  const { search } = query;

  const events = !search
    ? EVENTDATA
    : EVENTDATA.filter((event) =>
        event.title
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes((search as string).toLowerCase().replace(/\s+/g, ''))
      );

  return {
    props: { events, ...(await serverSideTranslations(locale ?? 'en')) },
  };
};

export default Search;
