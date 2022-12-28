import { useSwiper } from 'swiper/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

export interface CarouselHeaderProps {
  title?: string;
  className?: string;
  navigation?: boolean;
}

export const CarouselHeader: React.FC<CarouselHeaderProps> = ({
  title,
  className,
  navigation,
}) => {
  const swiper = useSwiper();

  return (
    <div className="absolute top-0 z-10 flex w-full items-center justify-between">
      <h1 className={className || ''}>{title}</h1>
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
