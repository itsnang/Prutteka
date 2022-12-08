import React, { forwardRef } from 'react';

import { useField } from 'formik';

interface InputFieldProps
  extends Partial<React.HTMLAttributes<HTMLInputElement>> {
  name: string;
  type?: string;
  label?: string;
  className?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ name, type = 'text', label, className, ...props }, ref) => {
    const [field, meta] = useField(name);

    return (
      <div className="space-y-2">
        <label className="flex flex-col">
          {label}
          <input
            className={`h-13 focus:ring-primary rounded-2xl border border-gray-200 px-4 text-gray-900 focus:outline-none focus:ring 
            ${className} ${label ? 'mt-2' : ''}`}
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
