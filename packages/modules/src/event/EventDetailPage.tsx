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
  SeoMeta,
  Typography,
  ItemContainer,
  EventInfoCard,
  TextDisplay,
} from 'ui';
import { ShareModal } from '../shared';
import { AttendModal } from './AttendModal';
// import { EVENTDATA } from '../constants';
import { EventHeader } from './EventHeader';
import { useRouter } from 'next/router';
import { useTypeSafeTranslation } from 'shared-utils/hooks';
import { useLocalInterestedEvent } from './useLocalInterestedEvent';
import { translateTime } from '../helpers/translateTime';
import { getDuration, translateDate, convertTime } from '../helpers';

import { APIResponseEvent } from 'custom-types';
import Link from 'next/link';
import Image from 'next/image';
import { eachDayOfInterval } from 'date-fns';

interface EventDetailPageProps {
  data: APIResponseEvent;
  host: string;
}

export const EventDetailPage: NextPage<EventDetailPageProps> = ({
  data,
  host,
}) => {
  const [attendModal, setAttendModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { query } = useRouter();
  const { t, i18n } = useTypeSafeTranslation();
  const [interestedEvents, setInterestedEvents] = useLocalInterestedEvent();

  const event = data.data;

  const currentDate = new Date();
  const startDate = new Date(event.attributes.date.start_date);
  const endDate = new Date(event.attributes.date.end_date);
  const isHappening = startDate <= currentDate && endDate >= currentDate;

  const isActive = !!interestedEvents.find((_event) => _event.id === event.id);

  // const dateRange = getEventDays(startDate, endDate);
  const dateRange = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const times = event.attributes.times;
  const startTime =
    selectedIndex >= times.length
      ? convertTime(times[0].start_time)
      : convertTime(times[selectedIndex].start_time);
  const endTime =
    selectedIndex >= times.length
      ? convertTime(times[0].end_time)
      : convertTime(times[selectedIndex].end_time);

  const user = data.included.find(
    (u) => u.id === event.relationships.organizer.data.id
  );

  let locationPhrase;
  const eventType = event.attributes.type;
  if (eventType === 'physical-online') {
    locationPhrase = 'Physical & Online';
  }
  if (eventType === 'physical') {
    locationPhrase = 'Physical';
  }
  if (eventType === 'online') {
    locationPhrase = 'Online';
  }
  console.log(eventType);

  return (
    <>
      <SeoMeta
        title={`${translateTextObject(
          event.attributes.name,
          i18n.language
        )} - Prutteka`}
        description=""
        img={event.attributes.image_src}
      />
      <div className="space-y-8">
        <EventHeader
          isHappening={isHappening}
          img={event.attributes.image_src}
          title={event.attributes.name.en}
          date={event.attributes.date.start_date}
          organizer={user?.attributes.display_name}
        />

        <div className="space-y-4">
          <ItemContainer className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <Button
              icon={<TicketIcon />}
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
                  setInterestedEvents(event);
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
              shareData={{
                title: event.attributes.name.en,
                text: event.attributes.name.en,
                url: `https://${host}/event/${event.id}`,
              }}
              show={shareModal}
              onClose={() => setShareModal(false)}
              img={event.attributes.image_src}
            />
          </ItemContainer>

          {/* Date Range */}
          <div className="custom-scrollbar flex space-x-4 overflow-x-auto">
            {dateRange.map((date, index) => (
              <ButtonCategory
                key={index}
                isActive={index === selectedIndex}
                onClick={() => setSelectedIndex(index)}
              >
                {translateDate(date, i18n.language)}
              </ButtonCategory>
            ))}
          </div>

          <ItemContainer className="grid grid-cols-12 gap-2">
            <EventInfoCard
              className="col-span-full sm:col-span-6 md:col-span-4"
              icon={<ClockIcon />}
              iconClassName="bg-tertiary-light text-tertiary"
            >
              <Typography
                color="dark"
                weight="semibold"
                size="base"
                className="md:text-xl"
              >
                {t('event-detail-page.time')}
              </Typography>
              <Typography>
                {translateTime(startTime, i18n.language)} -{' '}
                {translateTime(endTime, i18n.language)}
              </Typography>
            </EventInfoCard>

            <EventInfoCard
              className="col-span-full sm:col-span-6 md:col-span-3"
              icon={<TimeIcon />}
              iconClassName="bg-primary-light"
            >
              <Typography
                color="dark"
                weight="semibold"
                size="base"
                className="md:text-xl"
              >
                {t('event-detail-page.duration')}
              </Typography>
              <Typography>
                {getDuration(startTime, endTime, i18n.language)}
              </Typography>
            </EventInfoCard>

            <EventInfoCard
              className="col-span-full md:col-span-5"
              icon={<MapPinIcon />}
              iconClassName="bg-secondary-light text-secondary"
            >
              <Typography
                color="dark"
                weight="semibold"
                size="base"
                className="md:text-xl"
              >
                {t('event-detail-page.location')}
              </Typography>
              <Typography>{locationPhrase}</Typography>
            </EventInfoCard>
          </ItemContainer>
          <ItemContainer>
            <div className="flex items-center space-x-4">
              <div className="bg-secondary-light text-secondary rounded-xl p-2">
                <MapIcon className="h-6 w-6 md:h-7 md:w-7" />
              </div>
              <Typography
                color="dark"
                weight="semibold"
                size="lg"
                className="md:text-xl lg:text-2xl"
              >
                {t('event-detail-page.map')}
              </Typography>
            </div>
            <div className="mt-4 space-y-4">
              {event.attributes.locations.map((location, index) => (
                <div className="space-y-2" key={index}>
                  <Typography variant="h4">{location.name}</Typography>
                  <Typography>{location.address}</Typography>
                  {location.type === 'google' &&
                  location.image_src &&
                  location.url ? (
                    <>
                      <div className="relative mx-auto aspect-[2/1] max-w-5xl overflow-hidden rounded-2xl">
                        <Image
                          src={location.image_src}
                          alt="Map"
                          fill
                          className="object-cover"
                          // onLoad={() => {
                          //   setIsLoading(false);
                          // }}
                          quality={100}
                        />
                      </div>
                      <Link
                        href={location.url}
                        className="inline-flex rounded-lg border border-gray-200 py-2 px-4 font-normal"
                      >
                        {t('event-detail-page.view-on-map')}
                        <ArrowTopRightOnSquareIcon className="ml-2 h-5 w-5" />
                      </Link>
                    </>
                  ) : null}
                </div>
              ))}
            </div>
          </ItemContainer>

          <ItemContainer>
            <div className="flex items-center space-x-4">
              <div className="bg-primary-light text-primary rounded-xl p-2">
                <CalendarDaysIcon className="h-6 w-6 md:h-7 md:w-7" />
              </div>
              <Typography
                color="dark"
                weight="semibold"
                size="lg"
                className="md:text-xl lg:text-2xl"
              >
                {t('event-detail-page.schedule')}
              </Typography>
            </div>
            <div className="mt-6 flex w-full flex-col items-stretch space-y-4">
              {event.attributes.schedules.map((_schedule) =>
                _schedule.schedules.map((schedule) => {
                  const startTime = convertTime(schedule.start_time);
                  const endTime = convertTime(schedule.end_time);
                  return (
                    <div
                      key={schedule._id}
                      className="relative flex-1 rounded-xl border border-gray-200 px-4 py-4 text-gray-700"
                    >
                      <div className="border-primary-light shadow-primary-light absolute -top-4 left-6 rounded-lg border bg-white px-2 py-1 text-sm shadow">
                        {translateTime(startTime, i18n.language)} -{' '}
                        {translateTime(endTime, i18n.language)}
                      </div>
                      <div>
                        {translateTextObject(schedule.activity, i18n.language)}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </ItemContainer>

          <ItemContainer>
            <div className="flex items-center space-x-4">
              <div className="rounded-xl bg-gray-200 p-2 text-gray-700">
                <InformationCircleIcon className="h-7 w-7" />
              </div>
              <Typography
                color="dark"
                weight="semibold"
                size="lg"
                className="md:text-xl lg:text-2xl"
              >
                {t('event-detail-page.event-detail')}
              </Typography>
            </div>
            <div className="mt-6 flex w-full flex-col items-stretch space-y-4">
              <TextDisplay value={event.attributes.detail.en} />
            </div>
          </ItemContainer>
        </div>
      </div>
    </>
  );
};

const translateTextObject = (
  textObj: { en: string; km: string },
  lang: 'en' | 'km'
) => {
  if (!textObj) {
    return '';
  }
  const isEN = lang === 'en';
  if (textObj?.[lang].trim() === '') {
    return textObj?.[isEN ? 'km' : 'en'];
  }

  return textObj?.[lang];
};

const TimeIcon = () => {
  return (
    <svg
      className="h-6 w-6 md:h-7 md:w-7"
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
