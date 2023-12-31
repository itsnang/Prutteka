import React, { Children, useState } from 'react';
import { Modal } from 'ui';
import Image, { StaticImageData } from 'next/image';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { useTypeSafeTranslation } from 'shared-utils/hooks';
import Router, { useRouter } from 'next/router';

interface ShareDataType {
  title: string;
  text: string;
  url: string;
}

interface ShareModalProps {
  img: string | StaticImageData;
  show: boolean;
  onClose: () => void;
  shareData: ShareDataType;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  img,
  show,
  onClose,
  shareData,
}) => {
  const { t } = useTypeSafeTranslation();

  const handleShare = () => {
    if (navigator.canShare && navigator.canShare(shareData)) {
      navigator.share(shareData);
    }
  };

  return (
    <Modal onClose={onClose} show={show}>
      <div className="relative flex h-14 justify-center md:h-20">
        <div className="absolute bottom-8 mx-auto aspect-[2/1] h-32 rounded-2xl shadow-xl shadow-gray-300 sm:h-48 md:h-auto md:w-[27rem]">
          <Image
            alt="ShareModalImage"
            src={img}
            fill
            className="rounded-2xl object-cover"
          />
        </div>
      </div>
      <div className="space-y-6 text-center text-2xl font-medium">
        {t('modals.share-event')}
        <div className="mt-6 flex justify-center gap-4">
          <IconStyle
            onClick={() =>
              // Router.push(
              //   `https://www.facebook.com/sharer/sharer.php?u=${shareData.url}`
              // ,{},{})
              window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${shareData.url}`,
                '_blank',
                'toolbar=yes,scrollbars=yes,resizable=yes,top=200,left=520,width=600,height=600'
              )
            }
            color="bg-[#EBEEF5]"
          >
            <FacebookIcon />
          </IconStyle>

          <IconStyle
            onClick={() =>
              window.open(
                `https://telegram.me/share/?url=${shareData.url}`,
                '_blank',
                'toolbar=yes,scrollbars=yes,resizable=yes,top=200,left=520,width=600,height=600'
              )
            }
            color="bg-[#E6F3FA]"
          >
            <TelegramIcon />
          </IconStyle>
          <IconStyle onClick={handleShare}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </IconStyle>
        </div>
      </div>
    </Modal>
  );
};

const IconStyle = ({
  children,
  color,
  onClick,
}: {
  color?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 px-3 py-3 ${color}`}
    >
      {children}
    </button>
  );
};

const FacebookIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_249_1996)">
        <path
          d="M24 12.0735C24 5.4045 18.627 -0.00149536 12 -0.00149536C5.37001 4.63868e-06 -0.00299072 5.40451 -0.00299072 12.075C-0.00299072 18.1005 4.38601 23.0955 10.122 24.0015V15.564H7.07701V12.075H10.125V9.4125C10.125 6.387 11.9175 4.716 14.658 4.716C15.972 4.716 17.3445 4.9515 17.3445 4.9515V7.9215H15.831C14.3415 7.9215 13.8765 8.853 13.8765 9.8085V12.0735H17.2035L16.6725 15.5625H13.875V24C19.611 23.094 24 18.099 24 12.0735Z"
          fill="#3B5998"
        />
      </g>
      <defs>
        <clipPath id="clip0_249_1996">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

const TelegramIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_249_2002)">
        <path
          d="M24 12C24 15.1826 22.7357 18.2348 20.4853 20.4853C18.2348 22.7357 15.1826 24 12 24C8.8174 24 5.76516 22.7357 3.51472 20.4853C1.26428 18.2348 0 15.1826 0 12C0 8.8174 1.26428 5.76516 3.51472 3.51472C5.76516 1.26428 8.8174 0 12 0C15.1826 0 18.2348 1.26428 20.4853 3.51472C22.7357 5.76516 24 8.8174 24 12ZM12.4305 8.859C11.2635 9.345 8.9295 10.35 5.4315 11.874C4.8645 12.099 4.566 12.321 4.539 12.537C4.494 12.9015 4.9515 13.0455 5.574 13.242L5.8365 13.3245C6.4485 13.524 7.2735 13.7565 7.701 13.7655C8.091 13.7745 8.5245 13.6155 9.003 13.2855C12.2715 11.079 13.959 9.9645 14.064 9.9405C14.139 9.9225 14.244 9.9015 14.313 9.9645C14.3835 10.026 14.376 10.1445 14.3685 10.176C14.3235 10.3695 12.528 12.0375 11.5995 12.9015C11.31 13.1715 11.1045 13.362 11.0625 13.4055C10.97 13.5 10.876 13.593 10.7805 13.6845C10.2105 14.2335 9.7845 14.6445 10.803 15.3165C11.2935 15.6405 11.6865 15.906 12.078 16.173C12.504 16.464 12.93 16.7535 13.482 17.1165C13.6215 17.2065 13.7565 17.304 13.887 17.397C14.3835 17.751 14.832 18.069 15.3825 18.018C15.7035 17.988 16.035 17.688 16.203 16.788C16.6005 14.6625 17.382 10.059 17.562 8.1615C17.573 8.00376 17.5664 7.84529 17.5425 7.689C17.5284 7.56288 17.4673 7.44669 17.3715 7.3635C17.235 7.26928 17.0723 7.22047 16.9065 7.224C16.4565 7.2315 15.762 7.473 12.4305 8.859Z"
          fill="#0088CC"
        />
      </g>
      <defs>
        <clipPath id="clip0_249_2002">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
