import React from 'react';
import dynamic from 'next/dynamic';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

interface TextDisplay {
  value: string;
}

export const TextDisplay: React.FC<TextDisplay> = ({ value }) => {
  return (
    <QuillNoSSRWrapper
      className="w-full !p-0 text-gray-700"
      value={value}
      theme=""
    />
  );
};
