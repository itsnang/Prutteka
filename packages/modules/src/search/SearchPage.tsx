import { useState } from 'react';
import { AutoCompleteInput, EventCard, SearchBar, SeoMeta } from 'ui';
import { CategorySelection } from '../shared';
import { MapPinIcon } from '@heroicons/react/24/solid';
import { EVENTDATA, LOCATIONS } from '../constants';
import { useTypeSafeTranslation } from 'modules';

export const Search = () => {
  const { t } = useTypeSafeTranslation();
  const [selected, setSelected] = useState(LOCATIONS[0]);
  return (
    <>
      <SeoMeta title="Search - Prutteka" description="" />

      <div>
        <div className="mx-auto max-w-[31.25rem]">
          <SearchBar
            placeholder={t('common.search-event') || ''}
            className="w-full"
            onSearch={(e) => e.preventDefault()}
          />
          <AutoCompleteInput
            items={LOCATIONS}
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
