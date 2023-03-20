import { Controller } from './types';

import Event from '../models/event';
import serializer from '../serializer/event';
import buildUrl from '../utils/build-url';
import { BadRequestError, NotFoundError, UnAuthorizedError } from '../errors';
import cloudinary from '../libs/cloudinary';
import getCurrentUrl from '../utils/getCurrentUrl';
import eventServices from '../services/event.services';
import userServices from '../services/user.services';
import imageUpload from '../utils/ImageUpload';

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

    res.status(200).json(allEvents);
  } catch (error) {
    next(error);
  }
};

export const createEvent: Controller = async (req, res, next) => {
  try {
    // @ts-ignore
    const image_file = req?.files?.image_src;

    if (!image_file) {
      throw new BadRequestError('Please provide an Image for your event');
    }

    await Event.validate({
      ...req.body,
      organizer: '012345678912',
      image_src: 'https://www.example.com/image.jpeg',
    });

    const image = await imageUpload.sharp(image_file[0]?.path);

    const result = await imageUpload.cloudinary(image, { folder: 'events' });

    const doc = await Event.create({
      ...req.body,
      organizer: '012345678912',
      image_src: result?.secure_url,
    });

    const currentUrl = new URL(
      req.protocol + '://' + req.get('host') + req.originalUrl
    );

    const newEvent = serializer({
      self: currentUrl,
    }).serialize(doc);

    res.status(201).json(newEvent);
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

export const updateEvent: Controller = async (req, res, next) => {
  try {
    // @ts-ignore
    const image_file = req?.files?.image_src;
    const eventId = req.params.eventId;

    let image_src: undefined | string;

    if (req.body.image_src) {
      image_src = req.body.image_src as string;
    } else {
      if (!image_file)
        throw new BadRequestError('Please provide an Image for your event');

      await Event.validate({
        ...req.body,
        organizer: '012345678912',
        image_src: 'https://www.example.com/image.jpeg',
      });

      const image = await imageUpload.sharp(image_file[0]?.path);

      const result = await imageUpload.cloudinary(
        image,
        req.body?.old_image_src
      );

      image_src = result.secure_url;
    }

    const doc = await Event.findByIdAndUpdate(eventId, {
      ...req.body,
      organizer: '012345678912',
      image_src,
    });

    const currentUrl = new URL(
      req.protocol + '://' + req.get('host') + req.originalUrl
    );

    const updatedEvent = serializer({
      self: currentUrl,
    }).serialize(doc);

    res.status(200).json(updatedEvent);
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

//not done
export const createNestedEvent: Controller = async (req, res, next) => {
  try {
    // @ts-ignore
    const image_file = req?.files?.image_src;
    const main_event = req.params.eventId;

    if (!image_file)
      throw new BadRequestError('Please provide an Image for your event');

    // await Event.validate({
    //   ...req.body,
    //   organizer: '012345678912',
    //   image_src: 'https://www.example.com/image.jpeg',
    // });

    const doc = await Event.create({
      ...req.body,
      main_event,
      organizer: '012345678912',
      image_src: 'https://www.example.com/image.jpeg',
    });

    res.json(doc);
  } catch (error) {
    next(error);
  }
};
