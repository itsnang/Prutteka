import { XMarkIcon } from '@heroicons/react/24/outline';
import { useField } from 'formik';
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

export const MultiSelect: React.FC<SelectProps> = ({
  label,
  name,
  options,
}) => {
  const [field, meta, helpers] = useField<string[]>({ name });

  return (
    <div className="w-full space-y-2">
      <label className="flex w-full flex-col space-y-2">
        {label ? <span className="text-base font-medium">{label}</span> : null}
        {field.value.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {field.value.map((option, index) => (
              <div
                key={index}
                className="border-primary-light flex items-center justify-center gap-2 rounded-full border px-4 py-2 capitalize"
              >
                <span>{option}</span>
                <XMarkIcon
                  className="hover:text-primary h-4 w-4"
                  onClick={() => {
                    const newOptions = field.value.filter(
                      (_option) => _option !== option
                    );
                    helpers.setValue(newOptions);
                  }}
                />
              </div>
            ))}
          </div>
        ) : null}
      </label>
      <select
        onChange={(e) => {
          helpers.setTouched(true);
          const value = e.currentTarget.value;
          if (!field.value.includes(value as any)) {
            helpers.setValue([...field.value, value]);
          }
        }}
        defaultValue=""
        className="form-select focus:ring-primary w-full rounded-2xl border border-gray-200 p-4 focus:border-gray-200 focus:outline-none focus:ring"
      >
        <option value="" disabled>
          {label}
        </option>
        {options.map((option, i) => (
          <option key={i} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
      {meta.error && meta.touched ? (
        <Message variant="error">{meta.error}</Message>
      ) : null}
    </div>
  );
};
