import React, { useState } from 'react';
import dynamic from 'next/dynamic';
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

import { useField } from 'formik';
import { Message } from './Message';

const modules = {
  toolbar: [
    [{ header: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
  ],
  clipboard: {
    matchVisual: false,
  },
};

interface TextEditorFieldProps {
  label?: string;
  name: string;
}

export const TextEditorField: React.FC<TextEditorFieldProps> = ({
  label,
  name,
}) => {
  const [field, meta, helpers] = useField({ name });

  const handleChange = (value: string) => {
    helpers.setValue(value);
  };

  return (
    <label className="flex flex-col space-y-2">
      {label ? <span className="text-base font-medium">{label}</span> : null}
      <QuillNoSSRWrapper
        defaultValue={field.value}
        value={field.value}
        onChange={(value) => {
          handleChange(value);
        }}
        modules={modules}
        theme="snow"
      />
      {meta.error && meta.touched ? (
        <Message variant="error">{meta.error}</Message>
      ) : null}
    </label>
  );
};
