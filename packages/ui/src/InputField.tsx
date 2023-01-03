import React, { forwardRef } from 'react';

import { useField } from 'formik';

interface InputFieldProps
  extends Partial<React.HTMLAttributes<HTMLInputElement>> {
  name: string;
  type?: string;
  label?: string;
  className?: string;
  containerClassName?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      name,
      type = 'text',
      label,
      className = '',
      containerClassName = '',
      ...props
    },
    ref
  ) => {
    const [field, meta] = useField(name);

    return (
      <div className={`space-y-2 ${containerClassName}`}>
        <label className="flex flex-col">
          {label}
          <input
            className={`h-13 focus:ring-primary rounded-2xl border border-gray-200 px-4 text-gray-900 focus:outline-none focus:ring ${className} ${
              label ? 'mt-2' : ''
            } ${
              type === 'time' || type === 'date'
                ? 'form-input focus:border-none'
                : ''
            }`}
            ref={ref}
            type={type}
            {...field}
            {...props}
          />
        </label>
        {meta.error && meta.touched && (
          <div className="text-red-600">{meta.error}</div>
        )}
      </div>
    );
  }
);

InputField.displayName = 'input';
