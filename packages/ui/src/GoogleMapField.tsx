import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import { AutoCompleteInput, ItemType } from './AutoCompleteInput';
import { ViewfinderCircleIcon } from '@heroicons/react/20/solid';

interface GoogleMapFieldProps {
  onSelect?: (
    placeDetails: google.maps.places.PlaceResult | null,
    image_src: string
  ) => void;
  location?: {
    name?: string;
    image_src?: string;
  };
}

const googleMapApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API;

export const GoogleMapField: React.FC<GoogleMapFieldProps> = ({
  onSelect,
  location,
}) => {
  const [mapImage, setMapImage] = useState<string | null>(
    location?.image_src ?? null
  );
  const [isLoading, setIsLoading] = useState(false);

  const [selected, setSelected] = useState<ItemType>({
    id: 1,
    name: location?.name ?? '',
    value: location?.name ?? '',
  });

  const { placesService, placePredictions, getPlacePredictions } =
    usePlacesService({
      apiKey: googleMapApiKey,
      options: {
        input: '',
        componentRestrictions: { country: 'kh' },
      },
    });

  function getPlaceDetail(index: number) {
    placesService?.getDetails(
      {
        placeId: placePredictions[index].place_id,
      },
      (placeDetails) => {
        const location = placeDetails?.geometry?.location;
        const image_src = getStaticMapUrl({
          lat: location?.lat() ?? 0,
          lng: location?.lng() ?? 0,
        });

        console.log(placeDetails?.address_components);

        if (image_src) {
          setMapImage(
            getStaticMapUrl({
              lat: location?.lat() ?? 0,
              lng: location?.lng() ?? 0,
            })
          );
          onSelect && onSelect(placeDetails, image_src);
        }
      }
    );
  }

  function getStaticMapUrl(location: { lat: number; lng: number }) {
    if (location) {
      const apiKey = googleMapApiKey;
      const size = '640x320';

      setIsLoading(true);

      return `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&size=${size}&scale=2&zoom=15&markers=icon:https://bit.ly/3TOXbm0%7C${location.lat},${location.lng}&key=${apiKey}&map_id=971aa175b432867a`;
    }

    return null;
  }

  useEffect(() => {
    if (placePredictions.length === 0) {
      getPlacePredictions({ input: 'Phnom Penh' });
    }
  }, [getPlacePredictions, placePredictions]);

  // useEffect(() => {});

  return (
    <div className="space-y-4">
      <label className="space-y-2">
        <span className="text-base font-medium">Search place</span>
        <div className="flex space-x-2">
          <AutoCompleteInput
            filter={false}
            items={placePredictions.map((item, index) => ({
              id: index,
              name: `${item.structured_formatting.main_text}, ${item.structured_formatting.secondary_text}`,
              value: item.structured_formatting.main_text,
            }))}
            selected={selected}
            setSelected={(item) => {
              setSelected(item);
              getPlaceDetail(item.id);
              return item;
            }}
            onChange={(e) => {
              getPlacePredictions({ input: e.target.value });
            }}
          />
          <button
            className="flex items-center justify-center rounded-2xl border px-4"
            onClick={() => {
              navigator.geolocation.getCurrentPosition((position) => {
                setMapImage(
                  getStaticMapUrl({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                  })
                );
              });
            }}
          >
            <ViewfinderCircleIcon className="h-6 w-6" />
          </button>
        </div>
      </label>

      {mapImage ? (
        <div className="relative mx-auto aspect-[2/1] max-w-5xl overflow-hidden rounded-2xl">
          <div
            className={`absolute inset-0 z-10 flex h-full items-center justify-center bg-white ${
              isLoading ? 'block' : 'hidden'
            }`}
          >
            <svg
              className="h-8 w-8 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="stroke-primary-light"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="fill-primary"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>

          <Image
            src={mapImage}
            alt="Map"
            fill
            className="object-cover"
            onLoad={() => {
              setIsLoading(false);
            }}
            quality={100}
          />
        </div>
      ) : null}
    </div>
  );
};
