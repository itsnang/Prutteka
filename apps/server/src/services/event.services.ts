import { Types } from 'mongoose';
import { NotFoundError } from '../errors';
import Event, { EventType } from '../models/event';
import ApiFeature from '../utils/api-feature';

type RequestQuery = {
  [key: string]: string;
} & {
  page?: {
    offset: number;
    limit: number;
  };
};

class EventService {
  async getEvents(query: RequestQuery): Promise<EventType[] | EventType> {
    const events = new ApiFeature(Event, query);
    events.filter().sort().limitFields().paginate();

    return events.model.populate('organizer', '');
  }

  async getEvent(id: string): Promise<EventType | null> {
    return Event.findById(id).populate('organizer');
  }

  async deleteEvent(
    id: string,
    userId: Types.ObjectId
  ): Promise<EventType | null> {
    return Event.findOneAndDelete({ _id: id, organizer: userId });
  }

  async isNotEnd(id: string): Promise<boolean> {
    return Boolean(
      await Event.findOne({
        _id: id,
        'date_time.end_date': { $gte: Date.now() },
      })
    );
  }

  async userIsRegistered(
    eventId: string,
    userId: Types.ObjectId
  ): Promise<boolean> {
    return Boolean(
      await Event.findOne({ _id: eventId, attendees: { $in: [userId] } })
    );
  }

  async registerToAnEvent(
    eventId: string,
    userId: Types.ObjectId
  ): Promise<any> {
    return Event.findByIdAndUpdate(eventId, { $push: { attendees: userId } });
  }
}

export default new EventService();
