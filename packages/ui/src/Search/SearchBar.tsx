import React from 'react';
import { useState } from 'react';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  onSearch: (e: React.FormEvent<HTMLFormElement>, input: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  className = '',
  onSearch,
}) => {
  const [input, setInput] = useState('');

  return (
    <form
      className={`flex items-center justify-between rounded-2xl border bg-white px-4 py-[0.875rem] ${className}`}
      onSubmit={(e) => onSearch(e, input)}
    >
      <input
        type="text"
        placeholder={placeholder}
        className="w-full border-gray-200 outline-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">
        <MagnifyingGlassIcon className="h-6 w-6 text-gray-600" />
      </button>
    </form>
  );
};
