import { SeoMeta, Typography, Modal } from 'ui';
import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { Button, EventCard } from 'ui';
import { useImageCrop, useTypeSafeTranslation } from 'shared-utils/hooks';
import { useLocalInterestedEvent } from '../event';
import { translateDate } from '../helpers';
import { translateTime } from '../helpers/translateTime';
import { PencilIcon } from '@heroicons/react/24/outline';
import { CameraIcon } from '@heroicons/react/24/solid';
import { EditProfileModal } from '../shared';
import { useState } from 'react';
import ReactCrop, { centerCrop, Crop, makeAspectCrop } from 'react-image-crop';
import getCroppedImg from '../event/form/cropImage';

interface MyProfilePageProps {
  userName?: string;
  followers?: string;
  events?: any;
  user: any;
  img?: string | StaticImageData;
  aspect?: number;
}

export const MyProfilePage: React.FC<MyProfilePageProps> = ({
  events,
  user,
  aspect = 2 / 1,
}) => {
  const { t, i18n } = useTypeSafeTranslation();
  const [editModal, setEditModal] = useState(false);

  const { ImageCropModal, openModal, imageFile, imageUrl } = useImageCrop({
    aspect: 1,
  });
  const [interestedEvents, setInterestedEvents] = useLocalInterestedEvent();

  return (
    <>
      {ImageCropModal}
      <div className="space-y-6 divide-y">
        <div className="flex gap-4">
          <div className="flex flex-[2] justify-center">
            <div className="relative h-32 w-32 md:h-40 md:w-40">
              <Image
                src={user.image_src}
                alt="Picture of the author"
                fill
                className="ring-primary rounded-full p-1 ring-[3px]"
              />
              <button
                onClick={openModal}
                className="bg-secondary-light absolute bottom-3 right-0 z-10 flex  h-9 w-9 items-center justify-center rounded-full"
              >
                {<CameraIcon className="text-secondary h-6 w-6" />}
              </button>
            </div>
          </div>
          <div className="flex flex-[4] flex-col items-start justify-center gap-2 md:gap-4 md:py-4">
            <Typography variant="h5">{user.username}</Typography>
            <Button
              icon={<PencilIcon />}
              variant="secondary"
              className="items-center px-6"
              onClick={() => setEditModal(true)}
            >
              Edit profile
            </Button>
            <EditProfileModal
              value={user.username}
              show={editModal}
              onClose={() => setEditModal(false)}
            />
            <div className="flexr flex gap-2">
              <Typography weight="medium">{events.length} events</Typography>
              <Typography weight="medium">5k followers</Typography>
            </div>
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
      </div>
    </>
  );
};
const centerAspectCrop = (
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) => {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 100,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
};
