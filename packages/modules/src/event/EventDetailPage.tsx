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
  ItemContainer,
  EventInfoCard,
  RichEditorDisplay,
} from 'ui';
import { ShareModal } from '../shared';
import { AttendModal } from './AttendModal';
import { EVENTDATA } from '../constants';
import { EventHeader } from './EventHeader';
import { useRouter } from 'next/router';
import { useTypeSafeTranslation } from 'shared-utils/hooks';
import { useLocalInterestedEvent } from './useLocalInterestedEvent';
import { translateTime } from '../helpers/translateTime';
import { getDuration, translateDate } from '../helpers';
import { getEventDays } from './form/helper';

import { APIResponseEvent } from 'custom-types';
import Link from 'next/link';

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
  const { query } = useRouter();
  const { t, i18n } = useTypeSafeTranslation();
  const [interestedEvents, setInterestedEvents] = useLocalInterestedEvent();

  // const isActive = !!interestedEvents.find((_event) => _event.id === event.id);

  const event = data.data;

  const dateRange = getEventDays(
    event.attributes.date_time.start_date,
    event.attributes.date_time.end_date
  );
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
          isHappening
          img={event.attributes.image_src}
          title={event.attributes.name.en}
          date={event.attributes.date_time.start_date}
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
                // isActive={isActive}
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
          <div className="custom-scrollbar flex space-x-4 overflow-x-auto">
            {dateRange.map((date) => (
              <ButtonCategory>
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
                {translateTime('8:30', i18n.language)} -{' '}
                {translateTime('19:00', i18n.language)}
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
                {getDuration('10:30', '19:20', i18n.language)}
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
              <Typography>On-site (Phnom Penh) & Online</Typography>
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
              {event.attributes.locations.map((location) => (
                <div className="space-y-2">
                  <Typography>
                    {translateTextObject(location.name, i18n.language)}
                  </Typography>
                  <Link
                    href={location.link}
                    className="inline-flex rounded-lg border border-gray-200 py-2 px-4 font-normal"
                  >
                    {t('event-detail-page.view-on-map')}
                    <ArrowTopRightOnSquareIcon className="ml-2 h-5 w-5" />
                  </Link>
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
            <div className="mt-6 flex w-full flex-col items-stretch space-y-2">
              {event.attributes.schedules.map((schedule) =>
                schedule.schedules.map((schedule) => (
                  <div className="relative flex-1 rounded-xl border border-gray-200 px-4 py-4 text-gray-700">
                    <div className="absolute -top-4 left-6 rounded-lg border border-gray-200 bg-white px-2 py-1 text-sm">
                      {translateTime(
                        new Date(schedule.start_time).toTimeString(),
                        i18n.language
                      )}{' '}
                      -{' '}
                      {translateTime(
                        new Date(schedule.end_time).toTimeString(),
                        i18n.language
                      )}
                    </div>
                    <div>
                      {translateTextObject(
                        schedule.activity as any,
                        i18n.language
                      )}
                    </div>
                  </div>
                ))
              )}
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
              <Typography
                color="dark"
                weight="semibold"
                size="lg"
                className="md:text-xl lg:text-2xl"
              >
                {t('event-detail-page.event-detail')}
              </Typography>
            </div>
            <RichEditorDisplay
              className="mt-4 overflow-auto break-words text-gray-700"
              html={translateTextObject(event.attributes.detail, i18n.language)}
            />
          </ItemContainer>
        </div>
        <Carousel
          autoplay
          breakpoints={{
            460: {
              slidesPerView: 1.75,
            },
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 2.25,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          slidesPerView={1}
          title={t('event-detail-page.other-events')}
          navigation
          pagination
          titleClassName="text-lg md:text-xl lg:text-3xl font-bold"
        >
          {(Slide) =>
            EVENTDATA.map((event) => {
              // const isActive = !!interestedEvents.find(
              //   (_event) => _event.id === event.id
              // );
              return (
                <Slide key={event.id} className="pb-8">
                  <EventCard
                    img={event.img}
                    date={event.date}
                    time={event.time}
                    title={event.title}
                    location={event.location}
                    href={`/event/${event.id}`}
                    // isActive={isActive}
                    // onInterested={() => {
                    //   setInterestedEvents(event);
                    // }}
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

const translateTextObject = (
  textObj: { en: string; kh: string },
  lang: 'en' | 'kh'
) => {
  const isEN = lang === 'en';
  if (textObj?.[lang].trim() === '') {
    return textObj?.[isEN ? 'kh' : 'en'];
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
