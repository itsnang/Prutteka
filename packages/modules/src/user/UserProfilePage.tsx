import { SeoMeta, Typography } from 'ui';
import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { Button, EventCard } from 'ui';
import { useTypeSafeTranslation } from 'shared-utils/hooks';
import { useLocalInterestedEvent } from '../event';
import { translateDate } from '../helpers';
import { translateTime } from '../helpers/translateTime';
import { useState } from 'react';

interface ProfilePageProps {
  userName?: string;
  followers?: string;
  events?: any;
  user: any;
  img?: string | StaticImageData;
}

export const UserProfilePage: React.FC<ProfilePageProps> = ({
  events,
  user,
}) => {
  const { t, i18n } = useTypeSafeTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const [interestedEvents, setInterestedEvents] = useLocalInterestedEvent();

  return (
    <>
      <div className="space-y-6 divide-y">
        <div className="flex gap-4">
          <div className="flex flex-[2] justify-center">
            <div className="relative h-32 w-32 md:h-40 md:w-40">
              <Image
                src={user.image_src}
                alt="Picture of the author"
                fill
                className="ring-primary rounded-full p-1 ring-4"
              />
            </div>
          </div>
          <div className="flex flex-[4] flex-col items-start justify-center gap-2 md:gap-4 md:py-4">
            <Typography variant="h5">{user.username}</Typography>
            <div className="flexr flex gap-2">
              <Typography weight="medium">{events.length} events</Typography>
              <Typography weight="medium">5k followers</Typography>
            </div>

            <Button hasShadow className="px-16">
              Follow
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="my-6 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event: any) => {
              const isActive = !!interestedEvents.find(
                (_event) => _event.id === event.id
              );

              const date = translateDate(
                event.date_time.start_date,
                i18n.language
              );
              const time = translateTime(
                event.date_time.times[0].start_time,
                i18n.language
              );
              const location = t(('locations.' + event.location) as any);

              return (
                <EventCard
                  key={event._id}
                  img={event.image_src}
                  date={date}
                  time={time}
                  location={location}
                  title={event.name.en}
                  href={`/event/${event._id}`}
                  isActive={isActive}
                  onInterested={() => {
                    setInterestedEvents(event);
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* <pre>{JSON.stringify(user, null, 1)}</pre>
        <pre>{JSON.stringify(events, null, 1)}</pre> */}
      </div>
    </>
  );
};
