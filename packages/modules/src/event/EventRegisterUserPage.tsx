import { ArrowLongLeftIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTypeSafeTranslation } from 'shared-utils/hooks';
import { Button, Table } from 'ui';

export const EventRegisterUserPage = () => {
  const { t } = useTypeSafeTranslation();
  const { push } = useRouter();

  return (
    <div className="space-y-4">
      <Button
        variant="secondary"
        className="px-4"
        onClick={() => push('/user/my-event')}
      >
        <ArrowLongLeftIcon className="mr-4 h-6 w-6" />
        Back
      </Button>
      <div className="flex space-x-4">
        <div className="relative aspect-[2/1] w-28 sm:w-56">
          <Image
            src={
              'https://res.cloudinary.com/dn4dfq8nt/image/upload/v1676452420/event_sample/Midnight_Masquerade_Ball_hhs9yx.png'
            }
            alt={'Hello'}
            className="rounded-xl object-cover"
            fill
          />
        </div>
        <div className="flex flex-col">
          <div className="line-clamp-2 text-sm font-medium text-gray-900 md:text-xl">
            Event Name
          </div>
          <div className="text-primary text-sm">Wed, Mar 1 | 12:00 AM</div>
        </div>
      </div>
      <div>
        <Table />
      </div>
    </div>
  );
};
