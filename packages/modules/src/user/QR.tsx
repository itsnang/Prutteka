import { useState } from 'react';
import { QrCodeIcon } from '@heroicons/react/24/outline';
import { Modal } from 'ui';
import Image from 'next/image';
import { useRouter } from 'next/router';

export const QR = () => {
  const [openQR, setOpenQR] = useState(false);
  const router = useRouter();
  const hideOnEventDetailPage = router.asPath.includes('/event/');
  console.log(router.asPath);

  if (hideOnEventDetailPage) {
    return null;
  }

  return (
    <div className="fixed bottom-8 z-[5] mx-auto h-0 w-screen max-w-5xl cursor-none">
      <button
        className="bg-secondary absolute right-8 bottom-0 flex h-14 w-14 items-center justify-center rounded-xl text-white"
        onClick={() => setOpenQR(true)}
      >
        <QrCodeIcon className="h-8 w-8" />
      </button>
      <Modal show={openQR} onClose={() => setOpenQR(false)}>
        <div className="relative mt-8 rounded-3xl border-2 border-gray-200 p-8">
          <div className="relative aspect-square w-full">
            <Image
              src="https://res.cloudinary.com/dn4dfq8nt/image/upload/v1678435667/event_sample/qrcode_hapdjb.png"
              priority
              fill
              alt="user qr-code"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
