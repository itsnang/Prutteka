import React from 'react';
import Image, { StaticImageData } from 'next/image';
import Link, { LinkProps } from 'next/link';
import { Typography } from 'ui';
import { useTypeSafeTranslation } from 'shared-utils/hooks';
import { translateDate } from '../helpers';

interface EventHeader {
  img: string | StaticImageData;
  isHappening?: boolean;
  title: string;
  date: string;
  source?: LinkProps['href'];
  organizer?: string;
}

export const EventHeader: React.FC<EventHeader> = ({
  img,
  title,
  isHappening = false,
  date,
  source = '',
  organizer = '',
}) => {
  const { t, i18n } = useTypeSafeTranslation();

  return (
    <div className="space-y-4">
      <div className="flex justify-center overflow-hidden rounded-2xl bg-gray-100">
        <div className="relative aspect-[2/1] w-full md:h-[28rem] md:w-auto">
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
            size="sm"
            color="white"
            weight="medium"
            className="bg-primary rounded-md py-1 px-2"
          >
            {t('event-detail-page.happening')}
          </Typography>
        ) : null}
        <Typography variant="h1" size="3xl" className="md:text-4xl lg:text-5xl">
          {title}
        </Typography>
        <Typography size="lg" color="primary" className="">
          {translateDate(date, i18n.language)}
        </Typography>
        <Typography variant="span" size="base" color="dark" weight="medium">
          From
        </Typography>
        <Typography className="text-secondary ml-2 inline-block">
          {organizer}
        </Typography>
      </div>
    </div>
  );
};
