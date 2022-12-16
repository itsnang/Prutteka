import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { Button, EventCard, SearchBar, Typography } from 'ui';
import { EventHeader } from './EventHeader';
import { DeleteModal } from '../shared';
import { ArrowLongLeftIcon } from '@heroicons/react/24/outline';
import { EVENTDATA } from '../constants';

export const EventNestedPage = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { query } = useRouter();

  return (
    <div className="space-y-8">
      <EventHeader
        isHappening
        img="/event_poster1.jpg"
        title="Cambodia Tech Expo 2022"
        date="Fri, Nov 11 - Sun, Nov 13"
      />
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="w-full max-w-[12.5rem]">
            <Button
              as="link"
              href={`/event/${query?.eventId}`}
              variant="secondary"
              icon={ArrowLongLeftIcon}
            />
          </div>
          <div className="flex">
            <div className="my-3 mx-2 w-20 border-b-2 border-gray-200" />
            <Typography className="uppercase">In this event</Typography>
            <div className="my-3 mx-2 w-20 border-b-2 border-gray-200" />
          </div>
          <SearchBar
            className="w-full max-w-[12.5rem]"
            placeholder="Search"
            onSearch={(e) => {
              e.preventDefault();
            }}
          />
        </div>
        <Button hasShadow className="w-full">
          Add Event
        </Button>
        {EVENTDATA.map((event, idx) => (
          <EventCard
            isLandscape
            key={event.id}
            img={event.img}
            date={event.date}
            time={event.time}
            location={event.location}
            title={event.title}
            href="/event"
            onDelete={() => {
              setSelectedId(event.id);
              setDeleteModal(true);
            }}
          />
        ))}
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
