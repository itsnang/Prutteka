import React, { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

export interface ItemType {
  id: number;
  name: string;
}

interface AutoCompleteInputProps {
  items: ItemType[];
  leftIcon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  leftIconClassName?: string;
}

export const AutoCompleteInput: React.FC<AutoCompleteInputProps> = ({
  items,
  leftIcon,
  leftIconClassName,
}) => {
  const [selected, setSelected] = useState(items[0]);
  const [query, setQuery] = useState('');

  const filteredItems =
    query === ''
      ? items
      : items.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  const LeftIcon = leftIcon;

  return (
    <Combobox value={selected} onChange={setSelected}>
      <div className="relative mt-1">
        <div className="relative flex w-full cursor-default items-center overflow-hidden rounded-2xl border bg-white text-left">
          {LeftIcon ? (
            <LeftIcon
              className={`ml-3 h-6 w-6 ${
                leftIconClassName ? leftIconClassName : ''
              }`}
            />
          ) : null}
          <Combobox.Input
            className={`w-full border-none py-4 pr-10 text-sm leading-5 text-gray-900 outline-none ${
              LeftIcon ? 'pl-2' : 'pl-4'
            }`}
            displayValue={(person: any) => person.name}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery('')}
        >
          <Combobox.Options className="absolute mt-1 w-full overflow-auto rounded-xl border bg-white py-2 text-base focus:outline-none">
            {filteredItems.length === 0 && query !== '' ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                Nothing found.
              </div>
            ) : (
              filteredItems.map((person) => (
                <Combobox.Option
                  key={person.id}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-secondary text-white' : 'text-gray-900'
                    }`
                  }
                  value={person}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {person.name}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? 'text-white' : 'text-teal-600'
                          }`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};
