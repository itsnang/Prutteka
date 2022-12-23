import { useState } from 'react';
import { NextPage } from 'next';

import {
  ClockIcon,
  MapPinIcon,
  TicketIcon,
  MapIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/solid';
import {
  ShareIcon,
  ArrowTopRightOnSquareIcon,
  CalendarDaysIcon,
} from '@heroicons/react/24/outline';
import {
  Button,
  ButtonCategory,
  ButtonInterested,
  Carousel,
  EventCard,
  SeoMeta,
  Typography,
} from 'ui';
import { ShareModal } from '../shared';
import { ItemContainer } from './ItemContainer';
import { EventInfoCard } from './EventInfoCard';
import { AttendModal } from './AttendModal';
import { EVENTDATA } from '../constants';
import { EventHeader } from './EventHeader';
import { useRouter } from 'next/router';
import { useTypeSafeTranslation } from '../shared-hooks';
import { EventType, useLocalInterestedEvent } from './useLocalInterestedEvent';

interface EventDetailPageProps {
  event: EventType;
}

export const EventDetailPage: NextPage<EventDetailPageProps> = ({ event }) => {
  const [attendModal, setAttendModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const { query } = useRouter();
  const { t } = useTypeSafeTranslation();
  const [interestedEvents, setInterestedEvents] = useLocalInterestedEvent();

  const isActive = !!interestedEvents.find((_event) => _event.id === event.id);

  return (
    <>
      <SeoMeta title=" - Prutteka" description="" />
      <div className="space-y-8">
        <EventHeader
          isHappening
          img={event.img}
          title={event.title}
          date={event.date}
        />
        <div className="space-y-4">
          <ItemContainer className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <Button
              icon={TicketIcon}
              className="h-12 sm:h-14 md:flex-1"
              onClick={() => setAttendModal(true)}
            >
              {t('event-detail-page.how-to-attend')}
            </Button>
            <div className="flex flex-1 space-x-4">
              <ButtonInterested
                isDefault={false}
                className="flex flex-1 justify-between rounded-2xl px-4"
                hasText
                isActive={isActive}
                onClick={() => {
                  try {
                    const newInterestedEvents = isActive
                      ? interestedEvents.filter(
                          (_event) => _event.id !== event.id
                        )
                      : [...interestedEvents, event];

                    setInterestedEvents(newInterestedEvents);
                  } catch (error) {
                    window.localStorage.removeItem('interested-event');
                    setInterestedEvents([event]);
                  }
                }}
              />
              <Button
                variant="secondary"
                className="flex-1 justify-between px-4"
                onClick={() => setShareModal(true)}
              >
                {t('event-detail-page.share')} <ShareIcon className="h-6 w-6" />
              </Button>
            </div>
            <AttendModal
              show={attendModal}
              onClose={() => setAttendModal(false)}
            />
            <ShareModal
              show={shareModal}
              onClose={() => setShareModal(false)}
              img={event.img}
            />
          </ItemContainer>
          <div className="custom-scrollbar flex space-x-4 overflow-x-auto">
            <ButtonCategory>Fri, Nov 11</ButtonCategory>
            <ButtonCategory>Fri, Nov 11</ButtonCategory>
            <ButtonCategory>Fri, Nov 11</ButtonCategory>
          </div>
          <ItemContainer className="flex flex-col justify-between space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <EventInfoCard
              className="sm:flex-[3] lg:flex-1"
              icon={ClockIcon}
              iconClassName="bg-tertiary-light text-tertiary"
            >
              <Typography color="dark" weight="semibold" size="xl">
                {t('event-detail-page.time')}
              </Typography>
              <Typography>8:30 AM - 6:00 PM</Typography>
            </EventInfoCard>

            <EventInfoCard
              className="sm:flex-[2] lg:flex-1"
              icon={TimeIcon}
              iconClassName="bg-primary-light"
            >
              <Typography color="dark" weight="semibold" size="xl">
                {t('event-detail-page.duration')}
              </Typography>
              <Typography>9h 30mns</Typography>
            </EventInfoCard>

            <EventInfoCard
              className="sm:flex-[4] lg:flex-[2]"
              icon={MapPinIcon}
              iconClassName="bg-secondary-light text-secondary"
            >
              <Typography color="dark" weight="semibold" size="xl">
                {t('event-detail-page.location')}
              </Typography>
              <Typography>On-site (Phnom Penh) & Online</Typography>
            </EventInfoCard>
          </ItemContainer>
          <ItemContainer>
            <div className="flex items-center space-x-4">
              <div className="bg-secondary-light text-secondary rounded-xl p-2">
                <MapIcon className="h-7 w-7" />
              </div>
              <Typography color="dark" weight="semibold" size="2xl">
                {t('event-detail-page.map')}
              </Typography>
            </div>
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <Typography>
                  Venue1: (Building A-F) Diamond Island Convention and
                  Exhibition Center
                </Typography>
                <button className="flex rounded-lg border border-gray-200 py-2 px-4 font-normal">
                  {t('event-detail-page.view-on-map')}
                  <ArrowTopRightOnSquareIcon className="ml-2 h-5 w-5" />
                </button>
              </div>

              <div className="space-y-2">
                <Typography>
                  Venue1: (Building A-F) Diamond Island Convention and
                  Exhibition Center
                </Typography>
                <button className="flex rounded-lg border border-gray-200 p-2 px-4 font-normal">
                  {t('event-detail-page.view-on-map')}
                  <ArrowTopRightOnSquareIcon className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          </ItemContainer>

          <ItemContainer>
            <div className="flex items-center space-x-4">
              <div className="bg-primary-light text-primary rounded-xl p-2">
                <CalendarDaysIcon className="h-7 w-7" />
              </div>
              <Typography color="dark" weight="semibold" size="2xl">
                {t('event-detail-page.schedule')}
              </Typography>
            </div>
            <div className="mt-4 flex w-full flex-col items-stretch space-y-2">
              <div className="flex-1 rounded-xl border border-gray-200 p-4 text-gray-700">
                <span>8:30 AM - 6:00 PM</span>&nbsp;|&nbsp;
                <span>Exhibition</span>
              </div>
            </div>
          </ItemContainer>

          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="my-3 mx-2 w-20 border-b-2 border-gray-200" />
              <Typography className="uppercase">
                {t('event-detail-page.in-this-event')}
              </Typography>
              <div className="my-3 mx-2 w-20 border-b-2 border-gray-200" />
            </div>
            {EVENTDATA.slice(3).map((event) => (
              <EventCard
                isLandscape
                key={event.id}
                img={event.img}
                date={event.date}
                time={event.time}
                location={event.location}
                title={event.title}
                href="/event"
              />
            ))}
            <div className="flex space-x-4">
              <Button
                as="link"
                href={`/event/${query?.eventId}/nested`}
                variant="secondary"
                className="flex-1"
              >
                {t('common.view-all')}
              </Button>
              <Button className="flex-1" hasShadow>
                {t('event-detail-page.add-event')}
              </Button>
            </div>
          </div>

          <ItemContainer>
            <div className="flex items-center space-x-4">
              <div className="rounded-xl bg-gray-200 p-2 text-gray-700">
                <InformationCircleIcon className="h-7 w-7" />
              </div>
              <Typography color="dark" weight="semibold" size="2xl">
                {t('event-detail-page.event-detail')}
              </Typography>
            </div>
            <div className="mt-4 break-words text-gray-700">
              {`
            "Cambodia Tech Expo 2022" is the first, largest technology expo in Cambodia, held as an official sideline event of the ASEAN Summit 2022, and the first annual program hosted in the Kingdom of Cambodia by the Ministry of Industry, Science, Technology and Innovation (MISTI).
            The event is organized under the theme "Addressing Challenges Together through Tech Talents" which will take place at Diamond Island Convention and Exhibition Center, Koh Pich (Venue 1) and The Factory Phnom Penh (Venue 2) from 11th to 13th November 2022.
            Get ready to join the largest technology expo in Cambodia! Join us for free!
            Date: November 11-13, 2022
            Location: Diamond Island Convention and Exhibition Center and The Factory Phnom Penh
            Register now via https://ticket.cambodiatechex.gov.kh/
            For more information, follow us on our social media channels:
            Website: https://cambodiatechex.gov.kh/
            Facebook Page: https://web.facebook.com/cambodiatechexpo
            Instagram: https://www.instagram.com/cambodiatechexpo
            Telegram Channel: https://t.me/cambodiatechexpo
            YouTube Channel: https://www.youtube.com/channel/UCS1bGN882amxiIDxginl4ZA
            `}
            </div>
          </ItemContainer>
        </div>
        <Carousel
          autoplay
          breakpoints={{
            460: {
              slidesPerView: 1.75,
            },
            640: {
              slidesPerView: 2.5,
            },
            768: {
              slidesPerView: 2.75,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          slidesPerView={1.125}
          title={t('event-detail-page.other-events')}
          navigation
          pagination
          titleClassName="text-lg md:text-xl lg:text-3xl font-bold"
        >
          {(Slide) =>
            EVENTDATA.map((event) => {
              const isActive = !!interestedEvents.find(
                (_event) => _event.id === event.id
              );
              return (
                <Slide key={event.id} className="flex justify-center pb-8">
                  <EventCard
                    img={event.img}
                    date={event.date}
                    time={event.time}
                    title={event.title}
                    location={event.location}
                    href={`/event/${event.id}`}
                    isActive={isActive}
                    onInterested={() => {
                      try {
                        const newInterestedEvents = isActive
                          ? interestedEvents.filter(
                              (_event) => _event.id !== event.id
                            )
                          : [...interestedEvents, event];

                        setInterestedEvents(newInterestedEvents);
                      } catch (error) {
                        window.localStorage.removeItem('interested-event');
                        setInterestedEvents([event]);
                      }
                    }}
                  />
                </Slide>
              );
            })
          }
        </Carousel>
      </div>
    </>
  );
};

const TimeIcon = () => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_273_2023)">
        <path
          d="M21 25.6666L20.9883 18.6666L16.3333 13.9999L20.9883 9.32159L21 2.33325H7V9.33325L11.6667 13.9999L7 18.6549V25.6666H21ZM9.33333 8.74992V4.66659H18.6667V8.74992L14 13.4166L9.33333 8.74992Z"
          fill="#FF006E"
        />
      </g>
      <defs>
        <clipPath id="clip0_273_2023">
          <rect width="28" height="28" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
