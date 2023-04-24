import React from 'react';
import { FormikErrors, useField } from 'formik';
import { Message } from './Message';

interface InputProperties {
  name: string;
  placeholder?: string;
}

interface TranslationFieldProps {
  label?: string;
  km: InputProperties;
  en: InputProperties;
  error?: FormikErrors<string> | null;
}

export const TranslationField: React.FC<TranslationFieldProps> = ({
  label,
  km,
  en,
  error,
}) => {
  const [khField, khMeta] = useField({ name: km.name });
  const [enField, enMeta] = useField({ name: en.name });

  return (
    <label className="flex w-full flex-col space-y-2">
      {label ? <span className="text-base font-medium">{label}</span> : null}
      <div className="focus-within:ring-primary group flex flex-col divide-y rounded-2xl border bg-white px-2 focus-within:ring">
        <label className="flex items-center">
          <input
            placeholder={km.placeholder}
            type="text"
            {...khField}
            className="peer w-full border-none bg-transparent p-4 focus:outline-none focus:ring-0"
          />
          <div className="peer-focus:bg-primary-light peer-focus:border-primary peer-focus:text-primary -order-1 flex select-none items-center space-x-2 rounded-full border bg-gray-100 px-1.5 py-1 transition-colors duration-200">
            <span className="fib fis fi-kh aspect-square w-6 rounded-full"></span>
            <span className="text-base">ខ្មែរ</span>
          </div>
        </label>
        <label className="flex items-center">
          <input
            placeholder={en.placeholder}
            type="text"
            {...enField}
            className="peer w-full border-none bg-transparent p-4 focus:outline-none focus:ring-0"
          />
          <div className="peer-focus:bg-primary-light peer-focus:border-primary peer-focus:text-primary -order-1 flex select-none items-center space-x-2 rounded-full border bg-gray-100 px-1.5 py-1 transition-colors duration-200">
            <span className="fib fis fi-gb aspect-square w-6 rounded-full"></span>
            <span className="text-sm">EN</span>
          </div>
        </label>
      </div>
      {error && (khMeta.touched || enMeta.touched) ? (
        <Message variant="error">{error}</Message>
      ) : null}
    </label>
  );
};
