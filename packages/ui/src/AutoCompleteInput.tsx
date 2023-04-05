import React, { Fragment, ReactElement, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

export interface ItemType {
  id: number;
  name: string;
  value: string;
}

interface AutoCompleteInputProps {
  items: ItemType[];
  leftIcon?: ReactElement;
  leftIconClassName?: string;
  selected: ItemType;
  setSelected: (item: ItemType) => ItemType;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filter?: boolean;
}

export const AutoCompleteInput: React.FC<AutoCompleteInputProps> = ({
  items,
  leftIcon,
  leftIconClassName,
  selected,
  setSelected,
  onChange,
  filter = true,
}) => {
  const [query, setQuery] = useState('');

  const filteredItems = filter
    ? query === ''
      ? items
      : items.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )
    : items;

  return (
    <Combobox value={selected} onChange={setSelected}>
      <div className="relative w-full">
        <div className="relative flex w-full cursor-default items-center overflow-hidden rounded-2xl border bg-white text-left">
          {leftIcon
            ? React.cloneElement(leftIcon, {
                className: `ml-3 h-5 w-5 sm:h-6 sm:w-6 ${
                  leftIconClassName ? leftIconClassName : ''
                }`,
              })
            : null}
          <Combobox.Input
            className={`w-full border-none py-3 pr-10 text-gray-900 outline-none sm:py-4 ${
              leftIcon ? 'pl-2' : 'pl-4'
            }`}
            displayValue={(item: ItemType) => item?.name}
            onChange={(event) => {
              setQuery(event.target.value);
              onChange && onChange(event);
            }}
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
          <Combobox.Options className="custom-scrollbar absolute z-10 mt-1 max-h-72 w-full overflow-y-auto rounded-xl border bg-white py-2 text-base focus:outline-none">
            {filteredItems.length === 0 && query !== '' ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                Nothing found.
              </div>
            ) : (
              filteredItems.map((item) => (
                <Combobox.Option
                  key={item.id}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-secondary text-white' : 'text-gray-900'
                    }`
                  }
                  value={item}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {item.name}
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
