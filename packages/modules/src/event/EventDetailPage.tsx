import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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

export const EventDetailPage = () => {
  const [attendModal, setAttendModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);

  return (
    <>
      <SeoMeta title=" - Prutteka" description="" />

      <div className="space-y-4">
        <div className="flex justify-center overflow-hidden rounded-2xl bg-gray-100">
          <div className="relative aspect-[2/1] h-96">
            <Image
              src="/event_poster1.jpg"
              className="rounded-2xl object-cover"
              fill
              alt="event-poster"
            />
          </div>
        </div>
        <div className="space-y-4">
          <div className="py-6">
            <Typography
              variant="span"
              size="base"
              color="white"
              weight="medium"
              className="bg-primary rounded-md py-1 px-2 uppercase"
            >
              Happening now
            </Typography>
            <Typography variant="h1">Cambodia Tech Expo 2022</Typography>
            <Typography size="base" color="primary">
              Fri, Nov 11 - Sun, Nov 13
            </Typography>
            <Typography variant="span" size="base" color="dark" weight="medium">
              From
            </Typography>
            <Link href="/" className="text-secondary ml-2 underline">
              Source
            </Link>
          </div>
          <ItemContainer className="flex space-x-4">
            <Button
              icon={TicketIcon}
              className="flex-[2]"
              onClick={() => setAttendModal(true)}
            >
              How to attend
            </Button>
            <ButtonInterested
              isDefault={false}
              className="flex-1 rounded-2xl"
              hasText
            />
            <Button
              variant="secondary"
              className="flex-1 justify-between px-4"
              onClick={() => setShareModal(true)}
            >
              Share <ShareIcon className="h-6 w-6" />
            </Button>
            <AttendModal
              show={attendModal}
              onClose={() => setAttendModal(false)}
            />
            <ShareModal
              show={shareModal}
              onClose={() => setShareModal(false)}
              img="/event_poster1.jpg"
            />
          </ItemContainer>
          <div className="custom-scrollbar flex space-x-4 overflow-x-auto">
            <ButtonCategory>Fri, Nov 11</ButtonCategory>
            <ButtonCategory>Fri, Nov 11</ButtonCategory>
            <ButtonCategory>Fri, Nov 11</ButtonCategory>
          </div>
          <ItemContainer className="flex justify-between space-x-4">
            <EventInfoCard
              className="flex-1"
              icon={ClockIcon}
              iconClassName="bg-tertiary-light text-tertiary"
            >
              <Typography color="dark" weight="semibold" size="xl">
                Time
              </Typography>
              <Typography>8:30 AM - 6:00 PM</Typography>
            </EventInfoCard>

            <EventInfoCard
              className="flex-1"
              icon={TimeIcon}
              iconClassName="bg-primary-light"
            >
              <Typography color="dark" weight="semibold" size="xl">
                Duration
              </Typography>
              <Typography>9h 30mns</Typography>
            </EventInfoCard>

            <EventInfoCard
              className="flex-[2]"
              icon={MapPinIcon}
              iconClassName="bg-secondary-light text-secondary"
            >
              <Typography color="dark" weight="semibold" size="xl">
                Location
              </Typography>
              <Typography>On-site (Phnom Penh) & Online</Typography>
            </EventInfoCard>
          </ItemContainer>
          <ItemContainer>
            <EventInfoCard
              icon={MapIcon}
              iconClassName="bg-secondary-light text-secondary"
            >
              <Typography color="dark" weight="semibold" size="2xl">
                Map
              </Typography>
              <div className="mt-2 space-y-4">
                <div className="space-y-2">
                  <Typography>
                    Venue1: (Building A-F) Diamond Island Convention and
                    Exhibition Center
                  </Typography>
                  <button className="flex rounded-lg border border-gray-200 py-2 px-4 font-normal">
                    View on map
                    <ArrowTopRightOnSquareIcon className="ml-2 h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-2">
                  <Typography>
                    Venue1: (Building A-F) Diamond Island Convention and
                    Exhibition Center
                  </Typography>
                  <button className="flex rounded-lg border border-gray-200 p-2 px-4 font-normal">
                    View on map
                    <ArrowTopRightOnSquareIcon className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>
            </EventInfoCard>
          </ItemContainer>

          <ItemContainer>
            <EventInfoCard
              icon={CalendarDaysIcon}
              iconClassName="bg-primary-light text-primary"
            >
              <Typography color="dark" weight="semibold" size="2xl">
                Schedule
              </Typography>
              <div className="mt-2 flex w-full flex-col space-y-2">
                <div className="flex-1 rounded-xl border border-gray-200 p-4 text-gray-700">
                  <span>8:30 AM - 6:00 PM</span>&nbsp;|&nbsp;
                  <span>Exhibition</span>
                </div>
              </div>
            </EventInfoCard>
          </ItemContainer>

          <ItemContainer>
            <div className="flex items-center space-x-4">
              <div className="rounded-xl bg-gray-200 p-2 text-gray-700">
                <InformationCircleIcon className="h-7 w-7" />
              </div>
              <Typography color="dark" weight="semibold" size="2xl">
                Event Detail
              </Typography>
            </div>
            <div className="mt-4 text-gray-700">
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
          loop
          slidesPerView={3}
          title="Other events"
          navigation
          pagination
          titleClassName="text-2xl font-bold uppercase"
        >
          {(Slide) =>
            EVENTDATA.map((event, idx) => (
              <Slide key={idx} className="pb-8">
                <EventCard
                  img={event.img}
                  date={event.date}
                  time={event.time}
                  title={event.title}
                  location={event.location}
                  href=""
                />
              </Slide>
            ))
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
