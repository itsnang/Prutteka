import { Footer } from 'ui';

import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export const FacebookIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_249_1996)">
        <path
          d="M24 12.0735C24 5.4045 18.627 -0.00149536 12 -0.00149536C5.37001 4.63868e-06 -0.00299072 5.40451 -0.00299072 12.075C-0.00299072 18.1005 4.38601 23.0955 10.122 24.0015V15.564H7.07701V12.075H10.125V9.4125C10.125 6.387 11.9175 4.716 14.658 4.716C15.972 4.716 17.3445 4.9515 17.3445 4.9515V7.9215H15.831C14.3415 7.9215 13.8765 8.853 13.8765 9.8085V12.0735H17.2035L16.6725 15.5625H13.875V24C19.611 23.094 24 18.099 24 12.0735Z"
          fill="#3B5998"
        />
      </g>
      <defs>
        <clipPath id="clip0_249_1996">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const GoogleIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 256 262"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid"
  >
    <path
      d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
      fill="#4285F4"
    />
    <path
      d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
      fill="#34A853"
    />
    <path
      d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
      fill="#FBBC05"
    />
    <path
      d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
      fill="#EB4335"
    />
  </svg>
);

export const AuthLayout = (page: ReactElement) => (
  <div className="max-w-screen flex min-h-screen flex-col items-center justify-between">
    <div className="my-auto w-full max-w-[37.75rem] p-4">{page}</div>
    <Footer />
  </div>
);
