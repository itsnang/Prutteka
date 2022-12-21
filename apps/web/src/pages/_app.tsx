import type { AppProps } from 'next/app';
import type { ReactElement } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import { appWithTranslation } from 'next-i18next';

import '../styles/globals.css';

import 'swiper/swiper-bundle.min.css';
import { DesktopLayout } from 'modules';

type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactElement;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

// loading route style
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Router from 'next/router';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout ?? ((page) => <DesktopLayout>{page}</DesktopLayout>);

  return getLayout(
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default appWithTranslation(MyApp);
