import React, { useState, useEffect } from 'react';
import { FieldArray, useFormikContext } from 'formik';
import { InitialValueType } from './form.types';

import {
  MapIcon,
  MinusIcon,
  PlusIcon,
  MapPinIcon,
} from '@heroicons/react/24/solid';
import { Field, GoogleMapField, Message } from 'ui';

export const LocationForm = () => {
  const { values } = useFormikContext<InitialValueType>();

  return (
    <div className="space-y-4 py-6">
      <h2 className="flex items-center space-x-4 text-3xl font-semibold">
        <span className="bg-secondary-light rounded-full p-3">
          <MapIcon className="text-secondary h-8 w-8" />
        </span>
        <span>Location</span>
      </h2>

      {/* Location Input */}
      <div className="space-y-4">
        <FieldArray name="locations">
          {({ push, remove }) => (
            <>
              {values.locations.map((location, index) => (
                <LocationOption
                  key={index}
                  location={location}
                  index={index}
                  remove={remove}
                />
              ))}
              <button
                className="text-primary active:text-primary-dark flex items-center space-x-2 transition-colors duration-150"
                type="button"
                onClick={() =>
                  push({
                    name: '',
                    address: '',
                    url: '',
                    place_id: '',
                    type: 'google',
                    image_src: '',
                    latlng: {
                      lat: 0,
                      lng: 0,
                    },
                  })
                }
              >
                <PlusIcon className="h-5 w-5" />
                <span>Add more location</span>
              </button>
            </>
          )}
        </FieldArray>
      </div>
    </div>
  );
};

const LocationOption = ({
  index,
  remove,
  location,
}: {
  index: number;
  remove: <T>(index: number) => T | undefined;
  location?: InitialValueType['locations'][0];
}) => {
  const [selected, setSelected] = useState<'google' | 'custom'>(
    (location?.type as 'google' | 'custom') ?? 'google'
  );
  const { setFieldValue, errors, touched } =
    useFormikContext<InitialValueType>();

  useEffect(() => {
    setFieldValue(`locations.${index}`, {
      name: '',
      address: '',
      place_id: '',
      url: '',
      image_src: '',
      type: selected,
      latlng: {
        lat: 0,
        lng: 0,
      },
    });
  }, [setFieldValue, index, selected]);

  useEffect(() => {
    setFieldValue(`locations.${index}`, location);
  }, [index, location, setFieldValue]);

  return (
    <div
      className={`flex flex-col space-y-2 ${
        index !== 0 ? 'rounded-xl border bg-white p-4' : ''
      }`}
    >
      {index !== 0 ? (
        <button type="button" onClick={() => remove(index)}>
          <MinusIcon className="text-primary h-6 w-6" />
        </button>
      ) : null}

      <div className="flex justify-between gap-4">
        <button
          className={`flex h-14 w-full items-center justify-center gap-2 rounded-2xl border font-medium transition-all duration-150 ${
            selected === 'google'
              ? 'bg-primary-light border-primary text-primary'
              : ''
          }`}
          type="button"
          onClick={() => {
            setSelected('google');
          }}
        >
          <MapPinIcon className="h-6 w-6" />
          <span>Google Map</span>
        </button>
        <button
          className={`h-14 w-full rounded-2xl border font-medium transition-all duration-150 ${
            selected === 'custom'
              ? 'bg-primary-light border-primary text-primary'
              : ''
          }`}
          type="button"
          onClick={() => {
            setSelected('custom');
          }}
        >
          Custom Address
        </button>
      </div>

      {/* Google Map */}
      {selected === 'google' ? (
        <GoogleMapField
          onSelect={(placeDetails, image_src) => {
            setFieldValue(`locations.${index}`, {
              name: placeDetails?.name,
              address: placeDetails?.formatted_address,
              url: placeDetails?.url,
              place_id: placeDetails?.place_id,
              image_src: image_src,
              type: 'google',
              latlng: {
                lat: placeDetails?.geometry?.location?.lat(),
                lng: placeDetails?.geometry?.location?.lng(),
              },
            });
          }}
          location={
            location?.type === 'google'
              ? {
                  image_src: location?.image_src,
                  name: location?.name,
                }
              : { image_src: '', name: '' }
          }
        />
      ) : null}

      {selected === 'custom' ? (
        <div className="flex flex-col gap-4 sm:flex-row">
          <Field
            label="Venue name"
            type="text"
            name={`locations.${index}.name`}
            placeholder="e.g.Aeon Mall Phnom Penh"
          />
          <Field
            label="Address"
            type="text"
            name={`locations.${index}.address`}
            placeholder="e.g.132 Samdach Sothearos Blvd, Phnom Penh, Cambodia"
          />
        </div>
      ) : null}

      {errors.locations && touched.locations ? (
        <Message variant="error">{errors.locations as string}</Message>
      ) : null}
    </div>
  );
};
