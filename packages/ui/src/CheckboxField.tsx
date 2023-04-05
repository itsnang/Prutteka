import React from 'react';
import { Field } from 'formik';

interface CheckboxFieldProps {
  label: string;
  value?: string;
  name: string;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  label,
  name,
}) => {
  return (
    <label className="space-x-2 flex items-center">
      <Field
        name={name}
        type="checkbox"
        className="form-checkbox p-3 rounded-md border-gray-200 text-primary focus:ring-primary"
      />
      <span className="text-base text-gray-700">{label}</span>
    </label>
  );
};
