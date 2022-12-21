import React from 'react';

import { Typography, Button, EventCard, AutoCompleteInput, SeoMeta } from 'ui';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { EVENTDATA } from '../constants';
import { useTypeSafeTranslation } from 'modules';
export const InterestedEventPage: React.FC = () => {
  const { t } = useTypeSafeTranslation();
  return (
    <>
      <SeoMeta title="Interested - Prutteka" description="" />

      <div>
        <div className="space-y-3">
          <Typography variant="h4" weight="bold" className="uppercase">
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
        <div className="mt-4 grid grid-cols-3 gap-4">
          {EVENTDATA.map((event) => {
            return (
              <EventCard
                time={event.time}
                date={event.date}
                img={event.img}
                href=""
                location={event.location}
                title={event.title}
                key={event.id}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
