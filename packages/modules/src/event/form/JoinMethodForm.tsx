import React from 'react';
import { FieldArray, FormikErrors, useFormikContext } from 'formik';
import { InitialValueType } from './form.types';

import { MinusIcon, PlusIcon, TicketIcon } from '@heroicons/react/24/solid';
import { Field, TranslationField } from 'ui';

export const JoinMethodForm = () => {
  const { values, errors } = useFormikContext<InitialValueType>();

  return (
    <div className="space-y-4 py-6">
      <h2 className="flex items-center space-x-4 text-3xl font-semibold">
        <span className="bg-secondary-light rounded-full p-3">
          <TicketIcon className="text-secondary h-8 w-8" />
        </span>
        <span>How to join</span>
      </h2>

      {/* Location Input */}
      <div className="space-y-2">
        <FieldArray name="join_methods">
          {({ push, remove }) => (
            <>
              {values.join_methods.map((_, index) => (
                <div
                  key={index}
                  className={`flex flex-col space-y-2 ${
                    index !== 0 ? 'rounded-xl border bg-white p-4' : ''
                  }`}
                >
                  {index !== 0 ? (
                    <button type="button" onClick={() => remove(index)}>
                      <MinusIcon className="text-primary h-6 w-6" />
                    </button>
                  ) : null}
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <TranslationField
                      label="Method name"
                      km={{
                        name: `join_methods.${index}.name.km`,
                        placeholder: 'វិធីចូលរួម',
                      }}
                      en={{
                        name: `join_methods.${index}.name.en`,
                        placeholder: 'Method name',
                      }}
                      error={
                        (
                          errors.join_methods?.[index] as FormikErrors<{
                            name: { en: string; km: string };
                            link: string;
                          }>
                        )?.name as string
                      }
                    />
                    <Field
                      label="Method link (optional)"
                      type="text"
                      name={`join_methods.${index}.link`}
                      placeholder="e.g.http://example.com/signup"
                    />
                  </div>
                </div>
              ))}
              <button
                className="text-primary active:text-primary-dark flex items-center space-x-2 transition-colors duration-150"
                type="button"
                onClick={() =>
                  push({
                    name: { en: '', km: '' },
                    link: '',
                  })
                }
              >
                <PlusIcon className="h-5 w-5" />
                <span>Add more method</span>
              </button>
            </>
          )}
        </FieldArray>
      </div>
    </div>
  );
};
