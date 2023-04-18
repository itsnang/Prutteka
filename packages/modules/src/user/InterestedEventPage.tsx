import React, { useEffect, useState } from 'react';

import { Typography, EventCard, SeoMeta } from 'ui';
import { useTypeSafeTranslation } from 'shared-utils/hooks';
import { useLocalInterestedEvent } from '../event';
import { translateDate, translateNumber } from '../helpers';
import { useTranslation } from 'next-i18next';
import { translateTime } from '../helpers/translateTime';
import { APIResponseEvent } from 'custom-types';

interface interestedEventType {
  date: string;
  events: APIResponseEvent['data'][];
}

export const InterestedEventPage: React.FC = () => {
  const { t, i18n } = useTypeSafeTranslation();
  const [localInterestedEvents, setLocalInterestedEvents] =
    useLocalInterestedEvent();
  const [interestedEvents, setInterestedEvents] = useState<
    interestedEventType[]
  >([]);

  useEffect(() => {
    // empty array
    const newEvents: interestedEventType[] = [];
    // loop through local events
    for (const event of localInterestedEvents) {
      // find existing date
      let i = newEvents.findIndex(
        (x) => x.date === event.attributes.date.start_date
      );
      if (i <= -1) {
        // add new date with event
        newEvents.push({
          date: event.attributes.date.start_date,
          events: [event],
        });
      } else {
        // add event to existing date
        newEvents[i] = {
          ...newEvents[i],
          events: [...newEvents[i].events, event],
        };
      }
    }
    setInterestedEvents(
      // sort event by date
      newEvents.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
    );
  }, [localInterestedEvents]);

  return (
    <>
      <SeoMeta title="Interested | ព្រឹត្តិការណ៍ - Prutteka" description="" />

      <div className="space-y-3">
        <Typography
          variant="h1"
          size="lg"
          weight="bold"
          className="md:text-xl lg:text-3xl"
        >
          {t('interested-event-page.interested')}
        </Typography>
        <div className="flex items-center justify-between ">
          <div className="flex h-8 items-center rounded-full border border-gray-200 bg-gray-100 py-2 px-4 font-medium md:h-10">
            {translateNumber(localInterestedEvents.length, i18n.language) ?? 0}{' '}
            {t('interested-event-page.item-count')}
          </div>
        </div>
      </div>
      {interestedEvents.map((event, index) => {
        return (
          <div className="mt-4" key={index}>
            <div className="sticky top-20 z-10 inline-block rounded-full border bg-white px-4 py-2">
              <Typography
                variant="h2"
                size="lg"
                className="text-center md:text-xl"
              >
                {translateDate(event.date, i18n.language)}
              </Typography>
            </div>
            <div className="mt-4 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {event.events.map((_event) => {
                const date = translateDate(
                  _event.attributes.date.start_date,
                  i18n.language
                );
                const time = translateTime(
                  _event.attributes.date.start_date,
                  i18n.language
                );

                return (
                  <EventCard
                    key={_event.id}
                    time={time}
                    date={date}
                    img={_event.attributes.image_src}
                    href={`/event/${_event.id}`}
                    location={''}
                    title={_event.attributes.name.en}
                    isActive
                    onInterested={() => {
                      setLocalInterestedEvents(_event);
                    }}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};
