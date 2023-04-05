import User from '../models/user';
import serializer from '../serializer/user';
import { Controller } from './types';

import { NotFoundError, BadRequestError } from '../errors';
import imageUpload from '../utils/ImageUpload';
import getCurrentUrl from '../utils/getCurrentUrl';
import userServices from '../services/user.services';

export const updateUser: Controller = async (req, res, next) => {
  try {
    // @ts-ignore
    const imageFile = req?.files?.image;

    const userId = req.params.userId;

    if (!imageFile) {
      throw new BadRequestError('Please provide an image for your profile');
    }

    const image = await imageUpload.sharp(imageFile[0]?.path);

    const result = await imageUpload.cloudinary(image, {
      folder: 'profile',
      file_name: userId,
    });

    const { display_name, last_name, first_name, gender, date_of_birth } =
      req.body;

    const doc = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          image_src: result.url,
          display_name,
          last_name,
          first_name,
          gender,
          date_of_birth,
        },
      }
    );

    const currentUrl = getCurrentUrl(req);
    const user = serializer({ links: { self: currentUrl } }).serialize(doc);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getEventsByUser: Controller = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const doc = await userServices.getEventsByUser(userId);

    if (!doc) {
      throw new NotFoundError('User is not found');
    }

    const currentUrl = getCurrentUrl(req);

    const events = serializer({
      links: { self: currentUrl },
      populate: 'events',
    }).serialize(doc);

    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};
