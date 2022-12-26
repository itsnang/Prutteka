import React from 'react';

import { Typography, Button, EventCard, AutoCompleteInput, SeoMeta } from 'ui';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { useTypeSafeTranslation } from 'shared-utils/hooks';
import { useLocalInterestedEvent } from '../event';

export const InterestedEventPage: React.FC = () => {
  const { t } = useTypeSafeTranslation();
  const [interestedEvents, setInterestedEvents] = useLocalInterestedEvent();

  return (
    <>
      <SeoMeta title="Interested - Prutteka" description="" />

      <div>
        <div className="space-y-3">
          <Typography
            variant="h1"
            size="lg"
            weight="bold"
            className="md:text-xl lg:text-3xl"
          >
            {t('interested-event-page.interested')}
          </Typography>
          <div className="flex justify-between ">
            <div className="rounded-full border border-gray-200 bg-gray-100 py-2 px-4">
              3 {t('interested-event-page.item-count')}
            </div>
            <Button
              variant="secondary"
              icon={ArrowPathIcon}
              className="h-10  rounded-full px-4 py-2"
            >
              {t('interested-event-page.refresh')}
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="mt-4 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {interestedEvents.map((event) => {
              return (
                <EventCard
                  time={event.time}
                  date={event.date}
                  img={event.img}
                  href=""
                  location={event.location}
                  title={event.title}
                  key={event.id}
                  isActive
                  onInterested={() => {
                    setInterestedEvents(event);
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
