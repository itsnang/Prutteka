import React, { forwardRef } from 'react';

import { useField } from 'formik';

interface SelectFieldProps
  extends Partial<React.HTMLAttributes<HTMLSelectElement>> {
  name: string;
  label: string;
  className?: string;
  containerClassName?: string;
  options: { [key: string]: { en: string; kh: string } };
  // values: string[];
  lang: 'en' | 'kh';
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  (
    {
      name,
      label,
      className = '',
      containerClassName = '',
      options,
      placeholder,
      lang,
      ...props
    },
    ref
  ) => {
    const [field, meta] = useField(name);

    return (
      <div className={`space-y-2 ${containerClassName}`}>
        <label className="flex flex-col">
          {label}
          <select
            // defaultValue={placeholder}
            className={`form-select h-13 focus:ring-primary rounded-2xl border border-gray-200 px-4 text-gray-900 focus:border-gray-200 focus:outline-none focus:ring ${className} ${
              label ? 'mt-2' : ''
            }`}
            ref={ref}
            {...props}
            {...field}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {Object.keys(options).map((option, index) => (
              <option key={index} value={option}>
                {options[option][lang]}
              </option>
            ))}
          </select>
        </label>
        {meta.error && meta.touched && (
          <div className="text-red-600">{meta.error}</div>
        )}
      </div>
    );
  }
);

SelectField.displayName = 'select';
