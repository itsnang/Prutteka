import { Controller } from './types';

import Event from '../models/event';
import serializer from '../serializer/event';
import ApiFeature from '../utils/api-feature';
import buildUrl from '../utils/build-url';
import { BadRequestError, NotFoundError } from '../errors';

import imageUpload from '../utils/ImageUpload';

type RequestQuery = {
  [key: string]: string;
} & {
  page?: {
    offset: number;
    limit: number;
  };
};

export const getAllEvents: Controller = async (req, res, next) => {
  try {
    const queryObj = { ...req.query } as RequestQuery;

    const events = new ApiFeature(Event, queryObj);
    events.filter().sort().limitFields().paginate();

    const doc = await events.model.populate('organizer', '');

    const offset = queryObj.page?.offset ? +queryObj.page?.offset : 0;
    const limit = queryObj.page?.limit ? +queryObj.page?.limit : 10;

    const currentUrl = new URL(
      req.protocol + '://' + req.get('host') + req.originalUrl
    );
    const nextPage = buildUrl(
      currentUrl,
      `page[offset]=${offset + 1}&page[limit]=${limit}`
    );
    const previousPage = buildUrl(
      currentUrl,
      `page[offset]=${offset - 1}&page[limit]=${limit}`
    );

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

    if (!image_file)
      throw new BadRequestError('Please provide an Image for your event');

    await Event.validate({
      ...req.body,
      organizer: '012345678912',
      image_src: 'https://www.example.com/image.jpeg',
    });

    const image = await imageUpload.sharp(image_file[0]?.path);

    const result = await imageUpload.cloudinary(image);

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

    const doc = await Event.findById(eventId).populate('organizer');

    if (!doc) {
      throw new NotFoundError('Event is not found');
    }

    const currentUrl = new URL(
      req.protocol + '://' + req.get('host') + req.originalUrl
    );

    const event = serializer({
      self: currentUrl,
    }).serialize(doc);

    res.status(200).json(event);
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
