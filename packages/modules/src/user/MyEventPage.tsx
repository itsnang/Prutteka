import React from 'react';
import { Typography } from 'ui';
import { UserEventCard } from './UserEventCard';
import { EVENTDATA } from '../constants';

export const MyEventPage = () => {
  return (
    <>
      <div className="flex flex-col gap-6">
        <Typography weight="bold" className="uppercase" variant="h4">
          My Event
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
