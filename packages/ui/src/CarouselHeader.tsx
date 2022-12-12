import { useSwiper } from 'swiper/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

interface PropsType {
  title?: { text: string; className: string };
  navigation?: boolean;
}

export const CarouselHeader: React.FC<PropsType> = ({ title, navigation }) => {
  const swiper = useSwiper();

  return (
    <div className="absolute top-0 z-10 flex w-full items-center justify-between">
      {title ? <h1 className={title.className || ''}>{title.text}</h1> : null}
      {navigation ? (
        <div className="ml-auto flex cursor-pointer gap-4 justify-self-end">
          <button onClick={() => swiper.slidePrev()}>
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <button onClick={() => swiper.slideNext()}>
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </div>
      ) : null}
    </div>
  );
};
