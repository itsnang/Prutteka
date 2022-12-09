import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard, Pagination } from 'swiper';
import { CarouselHeader } from './CarouselHeader';

interface CarouselProps {
  title?: { text: string; className: string };
  children?: React.ReactNode | string;
  className?: string;
  pagination?: boolean;
  navigation?: boolean;
  paginationSpacing?: number;
  autoplay?: boolean | { delay: number };
  gap?: number;
  slidesPerView?: number;

  items: { [key: string]: string | null }[];
  component: (props: any) => JSX.Element | null;
}

export const Carousel: React.FC<CarouselProps> = ({
  className,
  items,
  pagination = false,
  paginationSpacing = 0,
  navigation = false,
  autoplay = false,
  gap = 50,
  slidesPerView = 3,
  title,
  ...props
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
      pagination={pagination && { clickable: true }}
      slidesPerView={slidesPerView}
      keyboard
      className={'w-full ' + (className || '')}
    >
      <CarouselHeader title={title} navigation={navigation} />
      {items?.map((item, idx) => (
        <SwiperSlide
          key={item._id || idx}
          className={`pb-${paginationSpacing} ${navigation ? 'pt-12' : ''}`}
        >
          <props.component {...item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
