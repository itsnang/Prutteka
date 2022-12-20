import { useState, useMemo, useEffect } from 'react';
import { AutoCompleteInput, EventCard, SearchBar, SeoMeta } from 'ui';
import { CategorySelection } from '../shared';
import { MapPinIcon } from '@heroicons/react/24/solid';
import { EVENTDATA, LOCATIONS } from '../constants';
import { useTypeSafeTranslation } from '../shared-hooks';

export const Search = () => {
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

      <div>
        <div className="mx-auto max-w-[31.25rem]">
          <SearchBar
            placeholder={t('common.search-event')}
            className="w-full"
            onSearch={(e) => e.preventDefault()}
          />
          <AutoCompleteInput
            items={locations}
            selected={selected}
            setSelected={setSelected}
            leftIcon={MapPinIcon}
            leftIconClassName="text-secondary"
          />
        </div>
        <CategorySelection title="SEARCH RESULTS" />
        <div className="flex flex-col gap-[0.625rem] p-4">
          {EVENTDATA.map((event) => (
            <EventCard {...event} key={event.id} href="" isLandscape />
          ))}
        </div>
      </div>
    </>
  );
};
