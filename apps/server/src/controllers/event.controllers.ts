import { Controller } from './types';

import Event from '../models/event';
import serializer from '../serializer/event';
import buildUrl from '../utils/build-url';
import { BadRequestError, NotFoundError, UnAuthorizedError } from '../errors';
import cloudinary from '../libs/cloudinary';
import getCurrentUrl from '../utils/getCurrentUrl';
import eventServices from '../services/event.services';
import userServices from '../services/user.services';

export const getAllEvents: Controller = async (req, res, next) => {
  try {
    const query = req.query as any;

    const doc = await eventServices.getEvents(query);

    const offset = query.page?.offset ? +query.page?.offset : 0;
    const limit = query.page?.limit ? +query.page?.limit : 10;

    const currentUrl = getCurrentUrl(req);
    const nextPage = buildUrl(currentUrl, {
      'page[offset]': `${offset + 1}`,
      'page[limit]': `${limit}`,
    });
    const previousPage = !!offset
      ? buildUrl(currentUrl, {
          'page[offset]': `${offset - 1}`,
          'page[limit]': `${limit}`,
        })
      : null;

    const allEvents = serializer({
      self: currentUrl,
      next: nextPage,
      prev: previousPage,
    }).serialize(doc);

    // setTimeout(() => {}, 1000);
    res.status(200).json(allEvents);
  } catch (error) {
    next(error);
  }
};

export const createEvent: Controller = async (req, res, next) => {
  try {
    // @ts-ignore
    // const image_file = req?.files?.image_src;

    // if (!image_file)
    //   throw new BadRequestError('Please provide an Image for your event');

    await Event.validate({
      ...req.body,
      created_by: '63ec58d01a38a046ed44afda',
    });

    // const result = await cloudinary.uploader.upload(
    //   image_file[0].path as string
    // );

    const newEvent = await Event.create({
      ...req.body,
    });

    res.json({
      type: 'events',
      id: newEvent._id,
      attributes: {
        ...newEvent.toJSON(),
        links: {
          self: `http://localhost:3000/events/${newEvent._id}`,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getEvent: Controller = async (req, res, next) => {
  try {
    const eventId = req.params.eventId;

    const doc = await eventServices.getEvent(eventId);

    if (!doc) {
      throw new NotFoundError('Event is not found');
    }

    const currentUrl = getCurrentUrl(req);

    const event = serializer({
      self: currentUrl,
    }).serialize(doc);

    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};

export const deleteEvent: Controller = async (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    const uid = req.user?.uid;
    if (!uid) {
      throw new UnAuthorizedError('Please provide token');
    }

    const user = await userServices.getUserByUid(uid);
    if (!user) {
      throw new UnAuthorizedError('User does not exist');
    }

    const doc = await eventServices.deleteEvent(eventId, user._id);
    if (!doc) {
      throw new NotFoundError('Event is not found');
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const registerToAnEvent: Controller = async (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    const uid = req.user?.uid;
    if (!uid) {
      throw new UnAuthorizedError('Please provide token');
    }

    const user = await userServices.getUserByUid(uid);
    if (!user) {
      throw new UnAuthorizedError('User does not exist');
    }

    if (await eventServices.userIsRegistered(eventId, user._id)) {
      throw new BadRequestError('User is already registered');
    }

    if (!(await eventServices.isNotEnd(eventId))) {
      throw new BadRequestError('Event is ended');
    }

    const event = await eventServices.registerToAnEvent(eventId, user._id);
    if (!event) {
      throw new NotFoundError('Register to an event is unsuccessful');
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
