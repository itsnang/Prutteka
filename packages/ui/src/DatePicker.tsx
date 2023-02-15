import React, { forwardRef } from 'react';
import { useState } from 'react';

interface DatePickerProps {
  name: string;
  type?: string;
  label?: string;
  className?: string;
  containerClassName?: string;
  value: string;
  onChange?: (value: React.SetStateAction<string>) => void;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      name,
      label,
      type = 'date',
      className = '',
      containerClassName = '',
      value = '',
      onChange,
      ...props
    },
    ref
  ) => {
    const [input, setInput] = useState(value);

    return (
      <div className={`space-y-2 ${containerClassName}`}>
        <label className="flex flex-col">
          {label}
          <input
            onChange={(e) => {
              const value = e.target.value;
              setInput(e.target.value);
              onChange && onChange(value);
            }}
            value={input}
            type={type}
            className={`h-13 focus:ring-primary rounded-xl border border-gray-200 px-4 text-gray-900 focus:outline-none focus:ring ${className} ${
              label ? 'mt-2' : ''
            } ${type === 'date' ? 'form-input focus:border-none' : ''} `}
            ref={ref}
            {...props}
          />
        </label>
      </div>
    );
  }
);

DatePicker.displayName = 'Date Picker';
