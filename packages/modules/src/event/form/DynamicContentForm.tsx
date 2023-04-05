import React from 'react';
import { FieldArray, useFormikContext } from 'formik';
import { InitialValueType } from './form.types';

import { PlusIcon, MinusIcon, PhotoIcon } from '@heroicons/react/24/solid';
import { TranslationField, ImageUpload } from 'ui';

export const DynamicContentForm = () => {
  const { values, setFieldValue } = useFormikContext<InitialValueType>();

  return (
    <div className="space-y-4 py-6">
      <h2 className="relative z-10 flex items-center space-x-4 text-3xl font-semibold">
        <span className="gradient-text from-primary-light to-secondary-light rounded-full bg-gradient-to-r bg-[length:200%] p-3">
          <PhotoIcon className="text-primary h-8 w-8" />
        </span>
        <span className="gradient-text from-primary to-secondary bg-gradient-to-r bg-[length:200%] bg-clip-text font-bold text-transparent">
          Dynamic Content
        </span>
      </h2>

      {/* Location Input */}
      <div className="space-y-6">
        <FieldArray name="dynamic_contents">
          {({ push, remove }) => (
            <>
              {values.dynamic_contents.map((content, contentIndex) => (
                <div
                  key={contentIndex}
                  className={`border-primary-light flex flex-col space-y-2 rounded-xl border-4 bg-white p-4`}
                >
                  {contentIndex !== 0 ? (
                    <button type="button" onClick={() => remove(contentIndex)}>
                      <MinusIcon className="text-primary h-6 w-6" />
                    </button>
                  ) : null}
                  <div className="flex flex-col gap-4">
                    <TranslationField
                      label="Content name"
                      km={{
                        name: `dynamic_contents.${contentIndex}.name.km`,
                        placeholder: 'ឈ្មោះមាតិកា',
                      }}
                      en={{
                        name: `dynamic_contents.${contentIndex}.name.en`,
                        placeholder: 'Content name',
                      }}
                    />

                    <FieldArray name={`dynamic_contents.${contentIndex}.items`}>
                      {({ push, remove }) => (
                        <>
                          {content.items.map((_, itemIndex) => (
                            <div
                              key={itemIndex}
                              className={`flex flex-col space-y-2 ${
                                itemIndex !== 0
                                  ? 'rounded-xl border bg-white p-4'
                                  : ''
                              }`}
                            >
                              {itemIndex !== 0 ? (
                                <button
                                  type="button"
                                  onClick={() => remove(itemIndex)}
                                >
                                  <MinusIcon className="text-primary h-6 w-6" />
                                </button>
                              ) : null}
                              <div key={itemIndex} className="space-y-4">
                                <ImageUpload
                                  imageSrc={
                                    values.dynamic_contents[contentIndex].items[
                                      itemIndex
                                    ].image.src
                                  }
                                  name={`dynamic_contents.${contentIndex}.items.${itemIndex}.image`}
                                  onCrop={(image) => {
                                    setFieldValue(
                                      `dynamic_contents.${contentIndex}.items.${itemIndex}.image`,
                                      {
                                        src: image?.url,
                                        file: image?.file,
                                      }
                                    );
                                  }}
                                />
                                <div className="flex flex-col gap-4 md:flex-row">
                                  <TranslationField
                                    label="Item name"
                                    km={{
                                      name: `dynamic_contents.${contentIndex}.items.${itemIndex}.name.km`,
                                      placeholder: 'ឈ្មោះមាតិកា',
                                    }}
                                    en={{
                                      name: `dynamic_contents.${contentIndex}.items.${itemIndex}.name.en`,
                                      placeholder: 'Item name',
                                    }}
                                  />
                                  <TranslationField
                                    label="Item detail"
                                    km={{
                                      name: `dynamic_contents.${contentIndex}.items.${itemIndex}.detail.km`,
                                      placeholder: 'លម្អិតមាតិកា',
                                    }}
                                    en={{
                                      name: `dynamic_contents.${contentIndex}.items.${itemIndex}.detail.en`,
                                      placeholder: 'Item detail',
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                          <button
                            className="text-primary active:text-primary-dark flex items-center space-x-2 transition-colors duration-150"
                            type="button"
                            onClick={() =>
                              push({
                                image: { src: '', file: null },
                                name: { en: '', km: '' },
                                detail: { en: '', km: '' },
                              })
                            }
                          >
                            <PlusIcon className="h-5 w-5" />
                            <span>Add more item</span>
                          </button>
                        </>
                      )}
                    </FieldArray>
                  </div>
                </div>
              ))}
              <button
                className="text-primary active:text-primary-dark flex items-center space-x-2 transition-colors duration-150"
                type="button"
                onClick={() =>
                  push({
                    name: { en: '', km: '' },
                    items: [
                      {
                        image: '',
                        name: { en: '', km: '' },
                        detail: { en: '', km: '' },
                      },
                    ],
                  })
                }
              >
                <PlusIcon className="h-5 w-5" />
                <span>Add more </span>{' '}
                <span className="gradient-text from-primary to-secondary bg-gradient-to-r bg-[length:200%] bg-clip-text font-bold text-transparent">
                  Dynamic Content
                </span>
              </button>
            </>
          )}
        </FieldArray>
      </div>
    </div>
  );
};
