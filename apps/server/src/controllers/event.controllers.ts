import { Controller } from './types';

import Event from '../models/event';
import serializer from '../serializer/event';
import ApiFeature from '../utils/api-feature';
import buildUrl from '../utils/build-url';
import { BadRequestError, NotFoundError } from '../errors';
import cloudinary from '../libs/cloudinary';

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

    const doc = await events.model.populate('created_by', '');

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
      created_by: '',
      image_src: 'https://www.example.com/image.jpeg',
    });

    const result = await cloudinary.uploader.upload(
      image_file[0].path as string
    );

    const newEvent = await Event.create({
      ...req.body,
      image_src: result,
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

    const doc = await Event.findById(eventId).populate('created_by');

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
