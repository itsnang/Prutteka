import type { AppProps } from 'next/app';

import '../styles/globals.css';

import 'swiper/swiper-bundle.min.css';
import { DesktopLayout } from 'modules';

// loading route style
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Router from 'next/router';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DesktopLayout>
      <Component {...pageProps} />
    </DesktopLayout>
  );
}
