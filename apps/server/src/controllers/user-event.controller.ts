import { Controller } from './types';
import Event from '../models/event';
import User from '../models/user';
import serializer from '../serializer/user';

import { NotFoundError } from '../errors';
import getCurrentUrl from '../utils/getCurrentUrl';

export const getUser: Controller = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const doc = await User.findById(userId);

    if (!doc) {
      throw new NotFoundError('User is not found');
    }

    const currentUrl = getCurrentUrl(req);

    const user = serializer({
      self: currentUrl,
    }).serialize(doc);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getEventsByUser: Controller = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const doc = await User.findById(userId).populate('events');

    if (!doc) {
      throw new NotFoundError('User is not found');
    }

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

export const updateProfile: Controller = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const { username } = req.body;
    const doc = await User.findByIdAndUpdate(userId, { $set: { username } });

    if (!doc) {
      throw new NotFoundError('User is not found');
    }
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
