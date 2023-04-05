import React from 'react';
import { useField } from 'formik';
import { Message } from './Message';

interface FieldProps {
  label?: string;
  type: React.HTMLInputTypeAttribute;
  name: string;
  placeholder?: string;
}

export const Field: React.FC<FieldProps> = ({
  label,
  name,
  type,
  placeholder,
}) => {
  const [field, meta] = useField({ name });

  return (
    <label className="flex flex-col space-y-2 w-full">
      {label ? <span className="text-base font-medium">{label}</span> : null}
      <input
        type={type}
        placeholder={placeholder}
        {...field}
        className="border rounded-2xl p-4 border-gray-200 focus:border-gray-200 focus:ring focus:ring-primary focus:outline-none"
      />
      {meta.error ? <Message variant="error">{meta.error}</Message> : null}
    </label>
  );
};
