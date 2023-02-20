import { useState } from 'react';
import { useRouter } from 'next/router';

import { Button, EventCard, SearchBar, Typography } from 'ui';
import { EventHeader } from './EventHeader';
import { DeleteModal } from '../shared';
import { ArrowLongLeftIcon } from '@heroicons/react/24/outline';
// import { EVENTDATA } from '../constants';
import { useDebounce, useTypeSafeTranslation } from 'shared-utils/hooks';
import { useLocalInterestedEvent } from './useLocalInterestedEvent';
import { NextPage } from 'next';

import { APIResponseEvent } from 'custom-types';
interface EventNestedPageProps {
  data: APIResponseEvent;
}

export const EventNestedPage: NextPage<EventNestedPageProps> = ({ data }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { query, push } = useRouter();

  const { t } = useTypeSafeTranslation();
  const [interestedEvents, setInterestedEvents] = useLocalInterestedEvent();

  const [searchQuery, setSearchQuery] = useState('');
  const debounceSearch = useDebounce(searchQuery, 500);
  // const queryEvents =
  //   debounceSearch === ''
  //     ? EVENTDATA
  //     : EVENTDATA.filter((event) =>
  //         event.title
  //           .toLowerCase()
  //           .replace(/\s+/g, '')
  //           .includes(debounceSearch.toLowerCase().replace(/\s+/g, ''))
  //       );

  const event = data.data;

  return (
    <div className="space-y-8">
      <EventHeader
        isHappening
        img={event.attributes.image_src}
        title={event.attributes.name.en}
        date={event.attributes.date_time.start_date}
      />
      <div className="space-y-4">
        <div className="flex w-full flex-col space-y-4 md:flex-row md:space-y-0">
          <div className="flex flex-[2] items-center space-x-4 md:justify-between">
            <Button
              as="link"
              href={`/event/${query?.eventId}`}
              variant="secondary"
              icon={<ArrowLongLeftIcon />}
            />
            <div className="flex">
              <div className="my-3 mx-2 hidden w-20 border-b-2 border-gray-200 md:block" />
              <Typography className="uppercase">
                {t('event-detail-page.in-this-event')}
              </Typography>
              <div className="my-3 mx-2 hidden w-20 border-b-2 border-gray-200 md:block" />
            </div>
          </div>
          <div className="flex flex-1 md:justify-end">
            <SearchBar
              className="w-full md:max-w-[12.5rem]"
              placeholder={t('common.search-event')}
              value={query.search as string}
              onChange={setSearchQuery}
              onSearch={(e, input) => {
                e.preventDefault();
                push({
                  pathname: '/event/[eventId]/nested',
                  query: { eventId: event.id, search: input },
                });
              }}
            />
          </div>
        </div>
        <Button hasShadow className="w-full">
          {t('event-detail-page.add-event')}
        </Button>
        {/* {queryEvents.map((event) => {
          const isActive = !!interestedEvents.find(
            (_event) => _event.id === event.id
          );

          return (
            <EventCard
              isLandscape
              key={event.id}
              img={event.img}
              date={event.date}
              time={event.time}
              location={event.location}
              title={event.title}
              href="/event"
              isActive={isActive}
              onInterested={() => {
                setInterestedEvents(event);
              }}
              onDelete={() => {
                setSelectedId(event.id);
                setDeleteModal(true);
              }}
            />
          );
        })} */}
        <DeleteModal
          show={deleteModal}
          onClose={() => setDeleteModal(false)}
          onDelete={() => {
            console.log(selectedId);
            setDeleteModal(false);
          }}
        />
      </div>
    </div>
  );
};
