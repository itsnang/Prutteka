import { NextPage } from 'next';
import Image from 'next/image';

import { Button, SeoMeta, Typography } from 'ui';
import notFound from '../../public/not-found.svg';
import { ArrowLongDownIcon } from '@heroicons/react/24/outline';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { useTypeSafeTranslation } from 'modules';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en')),
    },
  };
};

const Custom404: NextPage = () => {
  const { t } = useTypeSafeTranslation();

  return (
    <>
      <SeoMeta title="Page not found - Prutteka" description="" />

      <div className="flex flex-col items-center justify-center space-y-8 pt-20">
        <Image src={notFound} alt="not-found" width={250} />
        <Typography variant="h1" size="3xl">
          {t('404.not-found')}
        </Typography>
        <Typography className="text-center leading-loose">
          <>
            {t('404.nth-here')}
            <br />
            {t('404.go-home')}
          </>
        </Typography>
        <ArrowLongDownIcon className="h-6 w-6 text-gray-700" />
        <Button as="link" href="/" variant="secondary" className="px-8">
          {t('404.home')}
        </Button>
      </div>
    </>
  );
};

export default Custom404;
