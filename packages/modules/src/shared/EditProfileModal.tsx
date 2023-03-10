import React from 'react';
import { Modal, Typography, Button } from 'ui';
import { useTypeSafeTranslation } from 'shared-utils/hooks';
import Image, { StaticImageData } from 'next/image';
import axios from 'axios';
import useSWR from 'swr';
import { fetcher } from '../helpers';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

interface EditProfileModalProps {
  show: boolean;
  onClose: () => void;
  user?: any;
  value?: string;
  onChange?: (value: React.SetStateAction<string>) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  onClose,
  show,
  value = '',
  onChange,
  ...props
}) => {
  const { t, i18n } = useTypeSafeTranslation();
  const { query } = useRouter();
  const { data, isLoading } = useSWR(`/users/${query?.userId}`, fetcher);
  const [user, setUser] = useState([]);
  const [input, setInput] = useState(value);

  const UpdateUserHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await axios.patch(`/users/${query?.userId}`, {
      username: input,
    });
    console.log(response);

    onClose();
  };

  return (
    <Modal onClose={onClose} show={show} title="Edit profile">
      <div className="flex flex-col gap-4">
        <div className="mt-6 flex items-center gap-6">
          <div className="relative h-16 w-16">
            <Image
              src={!isLoading && data.data.attributes?.image_src}
              alt="Picture of the author"
              fill
              className="ring-primary rounded-full p-[3px] ring-2"
            />
          </div>
          <div>
            <Typography size="xl" weight="medium">
              {!isLoading && data.data.attributes?.username}
            </Typography>
          </div>
        </div>
        <form className="flex flex-col" onSubmit={UpdateUserHandler}>
          <label className="mb-2 text-lg" htmlFor="name">
            Name
          </label>
          <input
            onChange={(e) => {
              setInput(e.target.value);
            }}
            className="h-13 focus:ring-primary rounded-2xl border border-gray-200 px-4 text-gray-900 focus:outline-none focus:ring"
            id="name"
            type="text"
            value={input}
          />
          <div className="mt-6 flex space-x-4">
            <Button
              className="flex-1"
              variant="secondary"
              type="button"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button className="flex-1">Submit</Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
