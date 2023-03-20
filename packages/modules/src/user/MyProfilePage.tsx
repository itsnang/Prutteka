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
import { objToFormData } from 'shared-utils/form';
import { useAuth } from '../auth';
import { useRouter } from 'next/router';

interface MyProfilePageProps {
  userName?: string;
  followers?: string;
  events?: any;
  user: any;
  img?: string | StaticImageData;
  aspect?: number;
}

// const API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT || '';

// const handleChangeProfileImage = async (
//   newImage: Blob | null,
//   userId: string,
//   oldImageSrc: string
// ) => {
//   const formData = objToFormData({
//     image_src: newImage,
//     old_image_src: oldImageSrc,
//   });

//   console.log(formData);

//   try {
//     const res = await fetch(`${API_URL}/api/v1/users/${userId}/image`, {
//       method: 'PUT',
//       body: formData,
//     });

//     const data = await res.json();

//     return data.image_src as string;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const MyProfilePage: React.FC<MyProfilePageProps> = ({ events }) => {
  const { t, i18n } = useTypeSafeTranslation();
  const [editModal, setEditModal] = useState(false);
  const user = useAuth((state) => state);
  const [profile, setProfile] = useState(user?.image_src);

  // const { ImageCropModal, openCropModal, imageFile, imageUrl } = useImageCrop({
  //   aspect: 1,
  //   onSubmit: () => setPreviewModalOpen(true),
  // });
  const [interestedEvents, setInterestedEvents] = useLocalInterestedEvent();
  const { push } = useRouter();

  return (
    <>
      <SeoMeta title={user.display_name} description="" />

      {/* {ImageCropModal} */}

      {/* Start of preview image modal */}

      {/* <Modal
        title="Upate Profile"
        show={previewModalOpen}
        onClose={() => setPreviewModalOpen(false)}
      >
        <div className="flex justify-center">
          <div className="relative h-60 w-60 md:h-80 md:w-80">
            <Image
              className="ring-secondary mt-3 rounded-full p-2 ring-[5px]"
              src={imageUrl}
              fill
              alt="profile"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <Button
            className="px-6"
            variant="secondary"
            onClick={() => setPreviewModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className="px-6"
            isLoading={isLoading}
            onClick={async () => {
              setIsLoading(true);
              const image_src = await handleChangeProfileImage(
                imageFile,
                user.id,
                profile
              );

              setProfile(image_src);
              setPreviewModalOpen(false);
              setIsLoading(false);
            }}
          >
            Submit
          </Button>
        </div>
      </Modal> */}
      {/* End of preview image modal */}

      <div className="space-y-6 divide-y">
        <div className="flex gap-4">
          <div className="flex flex-[2] justify-center">
            <div className="relative h-32 w-32 md:h-40 md:w-40">
              <Image
                src={profile}
                alt="Picture of the author"
                fill
                className="ring-primary rounded-full p-1 ring-[3px]"
              />
              {/* <button
                onClick={openCropModal}
                className="bg-secondary-light absolute bottom-3 right-0 z-10 flex  h-9 w-9 items-center justify-center rounded-full"
              >
                {<CameraIcon className="text-secondary h-6 w-6" />}
              </button> */}
            </div>
          </div>
          <div className="flex flex-[4] flex-col items-start justify-center gap-2 md:gap-4 md:py-4">
            <Typography variant="h5">{user.display_name}</Typography>
            <Button
              icon={<PencilIcon />}
              variant="secondary"
              className="items-center px-6"
              onClick={() => push('/profile/edit')}
            >
              Edit profile
            </Button>
            {/* <EditProfileModal
              value={user.display_name}
              show={editModal}
              onClose={() => setEditModal(false)}
            /> */}
            <div className="flexr flex gap-2">
              <Typography weight="medium">
                {/* {events.length } events */}
              </Typography>
              <Typography weight="medium">5k followers</Typography>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="my-6 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {events &&
              events.map((event: any) => {
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
