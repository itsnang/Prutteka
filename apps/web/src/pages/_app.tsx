import type { AppProps } from 'next/app';

import '../styles/globals.css';

import 'swiper/swiper-bundle.min.css';
import { DesktopLayout } from 'modules';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DesktopLayout>
      <Component {...pageProps} />
    </DesktopLayout>
  );
}
