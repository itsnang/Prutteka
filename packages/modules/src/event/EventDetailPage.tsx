import { useState } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';

import {
  ClockIcon,
  MapPinIcon,
  TicketIcon,
  MapIcon,
  InformationCircleIcon,
  PhotoIcon,
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
import { EventHeader } from './EventHeader';
import { useRouter } from 'next/router';
import { useTypeSafeTranslation } from 'shared-utils/hooks';
import { useLocalInterestedEvent } from './useLocalInterestedEvent';
import { translateTime } from '../helpers/translateTime';
import {
  getDuration,
  translateDate,
  convertTime,
  getTranslatedText,
} from '../helpers';

import { APIResponseEvent } from 'custom-types';
import { eachDayOfInterval } from 'date-fns';
import { Disclosure, Transition } from '@headlessui/react';
import { Quill } from 'react-quill';

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

  const getTextFromQuill = (html: string): string => {
    // Create a temporary element to hold the HTML string
    if (typeof window === 'undefined') {
      return '';
    }
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;

    // Extract the plain text using the innerText property
    const plainText = tempElement.innerText;
    return plainText;
  };

  return (
    <>
      <SeoMeta
        title={`${getTranslatedText(
          event.attributes.name,
          i18n.language
        )} | ព្រឹត្តិការណ៍​ - Prutteka`}
        description={getTextFromQuill(
          getTranslatedText(event.attributes.detail, 'en')
        )}
        img={event.attributes.image_src}
      />
      <div className="mx-auto max-w-6xl space-y-8">
        <EventHeader
          isHappening={isHappening}
          img={event.attributes.image_src}
          title={getTranslatedText(event.attributes.name, i18n.language)}
          date={`${translateDate(
            event.attributes.date.start_date,
            i18n.language
          )} - ${translateDate(event.attributes.date.end_date, i18n.language)}`}
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
                onClick={() => {
                  setShareModal(true);
                }}
              >
                {t('event-detail-page.share')} <ShareIcon className="h-6 w-6" />
              </Button>
            </div>
            <AttendModal
              methods={event.attributes.join_methods}
              show={attendModal}
              onClose={() => setAttendModal(false)}
            />
            <ShareModal
              shareData={{
                title: getTranslatedText(event.attributes.name, 'en'),
                text: getTextFromQuill(
                  getTranslatedText(event.attributes.detail, 'en')
                ),
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

          <ItemContainer className="flex flex-col gap-4 md:flex-row">
            <div className="flex flex-[2]">
              <EventInfoCard
                className="flex-1"
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
                className="flex-1"
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
            </div>

            <EventInfoCard
              className="flex-1"
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

          {/* Location */}
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
                <div
                  className="flex flex-col justify-between gap-4 md:flex-row"
                  key={index}
                >
                  <div className="flex-1">
                    <Typography size="lg" weight="semibold">
                      {location.name}
                    </Typography>
                    <Typography>{location.address}</Typography>
                  </div>
                  {location.type === 'google' &&
                  location.image_src &&
                  location.url ? (
                    <div className="flex flex-1 flex-col items-center gap-4">
                      <Link
                        target="_blank"
                        href={location.url}
                        className="relative mx-auto inline-flex aspect-[2/1] w-full max-w-2xl overflow-hidden rounded-2xl"
                      >
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
                      </Link>
                      <Link
                        target="_blank"
                        href={location.url}
                        className="inline-flex rounded-lg border border-gray-200 py-2 px-4 font-normal"
                      >
                        {t('event-detail-page.view-on-map')}
                        <ArrowTopRightOnSquareIcon className="ml-2 h-5 w-5" />
                      </Link>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </ItemContainer>

          {/* Schedule */}
          {event.attributes.schedules.length > 0 ? (
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
                {event.attributes.schedules.length > 0 &&
                  event.attributes.schedules.map((_schedule) =>
                    _schedule.schedules.map((schedule) => {
                      const startTime = convertTime(schedule.start_time);
                      const endTime = convertTime(schedule.end_time);
                      return (
                        <div
                          key={schedule._id}
                          className="relative flex-1 rounded-xl border border-gray-200 px-4 py-4 text-gray-700"
                        >
                          <div className="border-primary-light shadow-primary-light absolute -top-4 left-6 inline-block rounded-lg border bg-white px-2 py-1 text-sm shadow">
                            {translateTime(startTime, i18n.language)} -{' '}
                            {translateTime(endTime, i18n.language)}
                          </div>
                          <div>
                            {getTranslatedText(
                              schedule.activity,
                              i18n.language
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
              </div>
            </ItemContainer>
          ) : null}

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
            <div
              dangerouslySetInnerHTML={{
                __html: getTranslatedText(
                  event.attributes.detail,
                  i18n.language
                ),
              }}
              className="mt-6 flex w-full flex-col items-stretch"
            ></div>
          </ItemContainer>

          {/* Dynamic Contents */}
          {event.attributes.dynamic_contents.length > 0 &&
          !!event.attributes.dynamic_contents[0].name.en &&
          !!event.attributes.dynamic_contents[0].name.km ? (
            <ItemContainer>
              <div className="flex items-center space-x-4">
                <div className="gradient-text from-primary-light to-secondary-light rounded-xl bg-gradient-to-r bg-[length:200%] p-2">
                  <PhotoIcon className="text-primary h-7 w-7" />
                </div>
                <Typography
                  color="dark"
                  weight="semibold"
                  size="lg"
                  className="gradient-text from-primary to-secondary bg-gradient-to-r bg-[length:200%] bg-clip-text font-bold text-transparent md:text-xl lg:text-2xl"
                >
                  Dynamic Contents
                </Typography>
              </div>
              {event.attributes.dynamic_contents.length > 0 &&
                event.attributes.dynamic_contents.map((content, index) => (
                  <Disclosure key={index} defaultOpen={index === 0}>
                    {({ open }) => (
                      <div className="mt-4">
                        <Disclosure.Button className="gradient-text from-primary to-secondary border-primary-light flex w-full justify-between rounded-2xl border bg-gradient-to-r bg-[length:200%] bg-clip-text px-4 py-2 text-xl font-bold text-transparent">
                          <span>
                            {getTranslatedText(content.name, i18n.language)}
                          </span>
                        </Disclosure.Button>
                        <Transition
                          enter="transition duration-100 ease-out"
                          enterFrom="transform scale-95 opacity-0"
                          enterTo="transform scale-100 opacity-100"
                          leave="transition duration-75 ease-out"
                          leaveFrom="transform scale-100 opacity-100"
                          leaveTo="transform scale-95 opacity-0"
                        >
                          <Disclosure.Panel className="flex justify-start gap-4 overflow-x-auto py-2 text-gray-700">
                            {content.items.map((item, index) => (
                              <div key={index}>
                                {item.image_src ? (
                                  <div className="relative z-0 aspect-[2/1] h-32 w-full md:h-64">
                                    <Image
                                      src={item.image_src}
                                      className="rounded-2xl object-cover"
                                      fill
                                      alt=""
                                    />
                                  </div>
                                ) : null}
                                <div
                                  className={`relative space-y-2 rounded-2xl bg-white px-4 py-2 shadow ${
                                    !!item.image_src ? '-mt-6' : ''
                                  }`}
                                >
                                  <div className="text-lg font-medium">
                                    {getTranslatedText(
                                      item.name,
                                      i18n.language
                                    )}
                                  </div>
                                  <div>
                                    {getTranslatedText(
                                      item.detail,
                                      i18n.language
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </Disclosure.Panel>
                        </Transition>
                      </div>
                    )}
                  </Disclosure>
                ))}
            </ItemContainer>
          ) : null}
        </div>
      </div>
    </>
  );
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
