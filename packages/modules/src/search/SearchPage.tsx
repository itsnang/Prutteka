import { useState, useMemo } from 'react';
import { AutoCompleteInput, EventCard, SearchBar, SeoMeta } from 'ui';
import { CategorySelection } from '../shared';
import { MapPinIcon } from '@heroicons/react/24/solid';
import { LOCATIONS } from '../constants';
import { useTypeSafeTranslation } from '../shared-hooks';
import { EventType, useLocalInterestedEvent } from '../event';
import { useRouter } from 'next/router';

interface SearchPageProps {
  events: EventType[];
}

export const Search = ({ events }: SearchPageProps) => {
  const { t } = useTypeSafeTranslation();

  const locations = useMemo(
    () =>
      LOCATIONS.map((value, idx) => ({
        name: t(value),
        value: value as string,
        id: idx,
      })),
    [t]
  );
  const [selected, setSelected] = useState(locations[0]);

  const [interestedEvents, setInterestedEvents] = useLocalInterestedEvent();
  const {
    query: { search },
    push,
  } = useRouter();

  // // fix language change translation
  // useEffect(() => {
  //   // will set translate-text when language change
  //   setSelected(
  //     (prev) => locations.find((v) => v.id === prev.id) || locations[0]
  //   );
  // }, [locations]);

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
                query: { search: input },
              });
            }}
            value={search as string}
          />
          <AutoCompleteInput
            items={locations}
            selected={selected}
            setSelected={setSelected}
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

            return (
              <EventCard
                isLandscape
                key={event.id}
                img={event.img}
                date={event.date}
                time={event.time}
                location={event.location}
                title={event.title}
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
            );
          })}
        </div>
      </div>
    </>
  );
};
