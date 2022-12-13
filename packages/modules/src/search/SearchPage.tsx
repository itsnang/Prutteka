import { useState } from 'react';
import { AutoCompleteInput, EventCard, SearchBar } from 'ui';
import { CategorySelection } from '../shared';
import { MapPinIcon } from '@heroicons/react/24/solid';
import { EVENTDATA, LOCATIONS } from '../constants';

export const Search = () => {
  const [selected, setSelected] = useState({ name: '', id: 0 });
  return (
    <div>
      <div className="mx-auto max-w-[31.25rem]">
        <SearchBar
          placeholder="Search Events"
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
  );
};
