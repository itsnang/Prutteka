import { Swiper, SwiperSlide, SwiperSlideProps } from 'swiper/react';
import { Autoplay, Keyboard, Pagination } from 'swiper';
import { CarouselHeader, CarouselHeaderProps } from './CarouselHeader';
import React from 'react';
interface CarouselProps {
  children: (
    Slide: React.FunctionComponent<SwiperSlideProps>
  ) => React.ReactNode;
  titleClassName?: string;
  pagination?: boolean;
  autoplay?: boolean | { delay: number };
  gap?: number;
  slidesPerView?: number;
  loop?: boolean;
  title?: string;
  navigation?: boolean;
}

export const Carousel: React.FC<CarouselProps> = ({
  titleClassName,
  pagination = false,
  autoplay = false,
  gap = 16,
  slidesPerView = 3,
  loop = false,
  title,
  navigation,
  children,
}) => {
  return (
    <Swiper
      modules={[Autoplay, Keyboard, Pagination]}
      spaceBetween={gap}
      autoplay={
        autoplay && {
          delay: autoplay !== true ? autoplay.delay : 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }
      }
      grabCursor
      loop={loop}
      pagination={pagination && { clickable: true }}
      slidesPerView={slidesPerView}
      keyboard
      className="relative mt-20 w-full"
    >
      <div slot="container-start" className="mb-6">
        &nbsp;
        <CarouselHeader
          title={title}
          className={titleClassName}
          navigation={navigation}
        />
      </div>
      <>{children(SwiperSlide)}</>
    </Swiper>
  );
};
