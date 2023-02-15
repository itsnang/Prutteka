import { SeoMeta, Typography } from 'ui';
import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { Button, EventCard } from 'ui';
import { EVENTDATA } from '../constants';
import { useTypeSafeTranslation } from 'shared-utils/hooks';
import { useLocalInterestedEvent } from '../event';
import { translateDate } from '../helpers';
import { translateTime } from '../helpers/translateTime';
import { useState } from 'react';

interface ProfilePageProps {
  userName?: string;
  followers?: string;
  events?: string;
  img?: string | StaticImageData;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  events,
  followers,
  userName,
  img,
}) => {
  const { t, i18n } = useTypeSafeTranslation();

  const [interestedEvents, setInterestedEvents] = useLocalInterestedEvent();

  return (
    <>
      <div className="space-y-6 divide-y">
        <div className="flex gap-4">
          <div className="flex flex-[2] justify-center">
            <Image
              src="/profile2.jpg"
              alt="Picture of the author"
              width="166"
              height="166"
              className="bg-mint text-mint fill-currentp-1 ring-primary rounded-full p-1 ring-4"
            ></Image>
          </div>
          <div className="flex flex-[4] flex-col items-start gap-4 py-4">
            <Typography variant="h5">Huot Chhay</Typography>
            <div className="flexr flex gap-2">
              <Typography weight="medium">1,204 events</Typography>
              <Typography weight="medium">5k followers</Typography>
            </div>

            <Button hasShadow className="px-16">
              Follow
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="my-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {EVENTDATA.map((event) => {
              const isActive = !!interestedEvents.find(
                (_event) => _event.id === event.id
              );
              const date = translateDate(event.date, i18n.language);
              const time = translateTime(event.time, i18n.language);
              const location = t(('locations.' + event.location) as any);

              return (
                <EventCard
                  key={event.id}
                  img={event.img}
                  date={date}
                  time={time}
                  location={location}
                  title={event.title}
                  href={`/event/${event.id}`}
                  isActive={isActive}
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
