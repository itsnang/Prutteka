import { Controller } from './types';

import Event from '../models/event';
import serializer from '../serializer/event';
import ApiFeature from '../utils/api-feature';
import buildUrl from '../utils/build-url';
import { BadRequestError } from '../errors';

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
    events.filter().sort().limitFields().paginate().include();

    const doc = await events.execute();

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
