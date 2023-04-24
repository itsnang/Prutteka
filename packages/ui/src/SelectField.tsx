import { Field, useField } from 'formik';
import React from 'react';
import { Message } from './Message';

interface Option {
  value: string;
  text: string;
}

interface SelectProps {
  label?: string;
  name: string;
  options: Option[];
}

export const SelectField: React.FC<SelectProps> = ({
  label,
  name,
  options,
}) => {
  const [field, meta] = useField({ name });

  return (
    <label className="flex w-full flex-col space-y-2">
      {label ? <span className="text-base font-medium">{label}</span> : null}
      <Field
        {...field}
        component="select"
        className="form-select focus:ring-primary rounded-2xl border border-gray-200 p-4 focus:border-gray-200 focus:outline-none focus:ring"
      >
        <option value="" disabled>
          {label}
        </option>
        {options.map((option, i) => (
          <option key={i} value={option.value}>
            {option.text}
          </option>
        ))}
      </Field>
      {meta.error && meta.touched ? (
        <Message variant="error">{meta.error}</Message>
      ) : null}
    </label>
  );
};
