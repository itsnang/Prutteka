import { EventType } from '../models/event';
import User, { UserType } from '../models/user';
import { Types } from 'mongoose';
import ApiFeature from '../utils/api-feature';

type RequestQuery = {
  [key: string]: string;
} & {
  page?: {
    offset: number;
    limit: number;
  };
};

class UserService {
  async getUserByUid(uid: string): Promise<UserType | null> {
    return User.findOne({ uid });
  }

  async getEventsByUser(userId: string): Promise<EventType | null> {
    return User.findById(userId)
      .select('display_name image_src events')
      .populate('events');
  }

  async addEventsToUser(
    userId: Types.ObjectId | string,
    eventId: Types.ObjectId | string
  ): Promise<null> {
    return User.findByIdAndUpdate(userId, {
      $push: { events: eventId },
    });
  }

  async removeEventsFromUser(
    userId: Types.ObjectId | string,
    eventId: Types.ObjectId | string
  ): Promise<null> {
    return User.findByIdAndUpdate(userId, {
      $pull: { events: eventId },
    });
  }
}

export default new UserService();
