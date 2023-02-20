import mongoose from 'mongoose';
import { Types, Model, Schema } from 'mongoose';

interface Message {
  message: string;
}

interface User {
  username: string;
  email: string;
  img_src?: string;
  followers?: Types.ObjectId[];
  following?: Types.ObjectId[];
  notifications?: Message[];
  events?: Types.ObjectId[];
}

const notificationsSchema = new Schema<Message, Model<Message>>({
  message: {
    type: String,
    required: [true, 'Notifications must be provided'],
  },
});

const userSchema = new Schema<User>({
  username: {
    type: String,
    required: [true, 'Username must be provided'],
    maxlength: [30, 'Username can not be more than 30 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email must be provided'],
    validate: [
      (value: string) => {
        const email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return email.test(value);
      },
      'Please provide a correct email',
    ],
  },
  img_src: {
    type: String,
  },
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  notifications: [notificationsSchema],
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Event',
    },
  ],
});

export default mongoose.model('User', userSchema);
