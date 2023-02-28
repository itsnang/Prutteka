import { Controller } from './types';
import Event from '../models/event';
import User from '../models/user';
import serializer from '../serializer/user';

import { NotFoundError } from '../errors';

export const getEventsByUser: Controller = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const doc = await User.findById(userId).populate('events');

    if (!doc) {
      throw new NotFoundError('User is not found');
    }

    // if (doc.length === 0) throw new NotFoundError('No user found with this id');

    const currentUrl = new URL(
      req.protocol + '://' + req.get('host') + req.originalUrl
    );
    const user = serializer({
      self: currentUrl,
    }).serialize(doc);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
