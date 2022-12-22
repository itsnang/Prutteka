import React from 'react';
import Image, { StaticImageData } from 'next/image';
import Link, { LinkProps } from 'next/link';
import { Typography } from 'ui';
import { useTypeSafeTranslation } from '../shared-hooks';

interface EventHeader {
  img: string | StaticImageData;
  isHappening?: boolean;
  title: string;
  date: string;
  source?: LinkProps['href'];
}

export const EventHeader: React.FC<EventHeader> = ({
  img,
  title,
  isHappening = false,
  date,
  source = '',
}) => {
  const { t } = useTypeSafeTranslation();

  return (
    <div className="space-y-4">
      <div className="flex justify-center overflow-hidden rounded-2xl bg-gray-100">
        <div className="relative aspect-[2/1] w-full md:h-96 md:w-auto">
          <Image
            src={img}
            className="rounded-2xl object-cover"
            fill
            alt={title}
          />
        </div>
      </div>
      <div className="pt-4">
        {isHappening ? (
          <Typography
            variant="span"
            size="base"
            color="white"
            weight="medium"
            className="bg-primary rounded-md py-1 px-2 uppercase"
          >
            {t('event-detail-page.happening')}
          </Typography>
        ) : null}
        <Typography variant="h1" size="4xl" className="md:text-5xl lg:text-6xl">
          {title}
        </Typography>
        <Typography size="base" color="primary">
          {date}
        </Typography>
        <Typography variant="span" size="base" color="dark" weight="medium">
          From
        </Typography>
        <Link href={source} className="text-secondary ml-2 underline">
          Source
        </Link>
      </div>
    </div>
  );
};
