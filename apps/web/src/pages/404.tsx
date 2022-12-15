import { NextPage } from 'next';
import Image from 'next/image';

import { Button, Typography } from 'ui';
import notFound from '../../public/not-found.svg';
import { ArrowLongDownIcon } from '@heroicons/react/24/outline';

const Custom404: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 pt-20">
      <Image src={notFound} alt="not-found" width={250} />
      <Typography variant="h1" size="3xl">
        Not Found!
      </Typography>
      <Typography className="text-center">
        <>
          Nothing here.
          <br />
          Time to go home
        </>
      </Typography>
      <ArrowLongDownIcon className="h-6 w-6 text-gray-700" />
      <Button as="link" href="/" variant="secondary" className="px-8">
        Home
      </Button>
    </div>
  );
};

export default Custom404;
