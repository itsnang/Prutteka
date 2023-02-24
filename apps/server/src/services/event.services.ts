import { Types } from 'mongoose';
import Event from '../models/event';
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
  async getEvents(query: RequestQuery) {
    const events = new ApiFeature(Event, query);
    events.filter().sort().limitFields().paginate();

    return events.model.populate('organizer', '');
  }

  async getEvent(id: string) {
    return Event.findById(id).populate('organizer');
  }

  async deleteEvent(id: string, userId: Types.ObjectId) {
    return Event.findOneAndDelete({ _id: id, organizer: userId });
  }
}

export default new EventService();
