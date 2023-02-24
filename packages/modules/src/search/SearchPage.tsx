import { useState } from 'react';
import { AutoCompleteInput, EventCard, SearchBar, SeoMeta, Button } from 'ui';
import { CategorySelection, FilterModal } from '../shared';
import {
  MapPinIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/solid';
import { LOCATIONS } from '../constants';
import { useTypeSafeTranslation } from 'shared-utils/hooks';
import { useLocalInterestedEvent } from '../event';
import { useRouter } from 'next/router';
import { translateDate } from '../helpers';
import { translateTime } from '../helpers/translateTime';

import { APIResponseEvents } from 'custom-types';

interface SearchPageProps {
  data: APIResponseEvents;
}

export const Search = ({ data }: SearchPageProps) => {
  const { t, i18n } = useTypeSafeTranslation();

  const locations = LOCATIONS.map((value, idx) => ({
    name: t(value),
    value: value as string,
    id: idx,
  }));

  const [selected, setSelected] = useState(locations[0]);
  const [filterModal, setFilterModal] = useState(false);

  const [interestedEvents, setInterestedEvents] = useLocalInterestedEvent();
  const { query, push } = useRouter();

  const events = data.data;

  return (
    <>
      <SeoMeta title="Search - Prutteka" description="" />

      <div className="space-y-4">
        <div className="mx-auto max-w-[31.25rem]">
          <SearchBar
            placeholder={t('common.search-event')}
            className="w-full"
            onSearch={(e, input) => {
              e.preventDefault();
              push({
                pathname: '/search',
                query: { ...query, search: input },
              });
            }}
            value={(query?.search as string) ?? ''}
          />
          <div className="flex">
            <div className="mx-1 flex-1">
              <AutoCompleteInput
                items={locations}
                selected={
                  locations.find((v) => v.id === selected.id) || locations[0]
                }
                setSelected={(event) => {
                  setSelected(event);
                  push({
                    pathname: '/search',
                    query: { ...query, location: event.value.split('.')[1] },
                  });
                  return event;
                }}
                leftIcon={<MapPinIcon />}
                leftIconClassName="text-secondary"
              />
            </div>
            <Button
              className="mt-1 px-4"
              iconClassName="text-primary"
              variant="secondary"
              icon={<AdjustmentsHorizontalIcon />}
              onClick={() => setFilterModal(true)}
            >
              Filter
            </Button>
            <FilterModal
              show={filterModal}
              onClose={() => setFilterModal(false)}
            />
          </div>
        </div>
        <CategorySelection
          title={t('search-page.search-results')}
          onSelect={(category) =>
            push({ query: { ...query, category: category } })
          }
        />
        <div className="flex flex-col gap-[0.625rem]">
          {events.map((event) => {
            const isActive = !!interestedEvents.find(
              (_event) => _event.id === event.id
            );

            const date = translateDate(
              event.attributes.date_time.start_date,
              i18n.language
            );
            const time = translateTime(
              event.attributes.date_time.times[0].start_time,
              i18n.language
            );
            const location = t(
              ('locations.' + event.attributes.location) as any
            );

            return (
              <EventCard
                isLandscape
                key={event.id}
                img={event.attributes.image_src}
                date={date}
                time={time}
                location={location}
                title={event.attributes.name.en}
                href={`/event/${event.id}`}
                isActive={isActive}
                onInterested={() => {
                  setInterestedEvents(event);
                }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
