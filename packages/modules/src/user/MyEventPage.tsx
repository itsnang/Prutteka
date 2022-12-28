import React from 'react';
import { SeoMeta, Typography } from 'ui';
import { UserEventCard } from './UserEventCard';
import { EVENTDATA } from '../constants';
import { useTypeSafeTranslation } from 'shared-utils/hooks';

export const MyEventPage = () => {
  const { t } = useTypeSafeTranslation();
  return (
    <>
      <SeoMeta title="My Events - Prutteka" description="" />
      <div className="flex flex-col gap-6">
        <Typography className="md:text-xl lg:text-3xl" variant="h1" size="lg">
          {t('my-event-page.my-event')}
        </Typography>
        <div className="space-y-4">
          {EVENTDATA.map((eventData) => {
            return (
              <UserEventCard
                key={eventData.id}
                location={eventData.location}
                date={eventData.date}
                href=""
                img={eventData.img}
                title={eventData.title}
                time={eventData.time}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
