import React, { forwardRef } from 'react';

interface DatePickerProps
  extends Partial<React.HTMLAttributes<HTMLInputElement>> {
  name: string;
  type?: string;
  label?: string;
  className?: string;
  containerClassName?: string;
  value: string;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      name,
      label,
      type = 'date',
      className = '',
      containerClassName = '',
      ...props
    },
    ref
  ) => {
    return (
      <div className={`space-y-2 ${containerClassName}`}>
        <label className="flex flex-col">
          {label}
          <input
            type={type}
            className={`h-13 focus:ring-primary rounded-xl border border-gray-200 px-4 text-gray-900 focus:outline-none focus:ring ${className} ${
              label ? 'mt-2' : ''
            } ${type === 'date' ? 'form-input focus:border-none' : ''} `}
            {...props}
            ref={ref}
          />
        </label>
      </div>
    );
  }
);

DatePicker.displayName = 'Date Picker';
