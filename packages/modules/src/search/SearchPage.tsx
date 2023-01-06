import { useState, useMemo, useEffect } from 'react';
import { AutoCompleteInput, EventCard, SearchBar, SeoMeta } from 'ui';
import { CategorySelection } from '../shared';
import { MapPinIcon } from '@heroicons/react/24/solid';
import { LOCATIONS } from '../constants';
import { useTypeSafeTranslation } from 'shared-utils/hooks';
import { EventType, useLocalInterestedEvent } from '../event';
import { useRouter } from 'next/router';
import { translateDate } from '../helpers';
import { translateTime } from '../helpers/translateTime';

interface SearchPageProps {
  events: EventType[];
}

export const Search = ({ events }: SearchPageProps) => {
  const { t, i18n } = useTypeSafeTranslation();

  const locations = LOCATIONS.map((value, idx) => ({
    name: t(value),
    value: value as string,
    id: idx,
  }));
  const [selected, setSelected] = useState(locations[0]);

  const [interestedEvents, setInterestedEvents] = useLocalInterestedEvent();
  const { query, push } = useRouter();

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
            leftIcon={MapPinIcon}
            leftIconClassName="text-secondary"
          />
        </div>
        <CategorySelection title={t('search-page.search-results')} />
        <div className="flex flex-col gap-[0.625rem]">
          {events.map((event) => {
            const isActive = !!interestedEvents.find(
              (_event) => _event.id === event.id
            );

            const date = translateDate(event.date, i18n.language);
            const time = translateTime(event.time, i18n.language);
            const location = t(('locations.' + event.location) as any);

            return (
              <EventCard
                isLandscape
                key={event.id}
                img={event.img}
                date={date}
                time={time}
                location={location}
                title={event.title}
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
