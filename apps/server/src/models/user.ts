import mongoose from 'mongoose';
import { Types, Model, Schema } from 'mongoose';

interface Message {
  message: string;
}

interface User {
  username: string;
  email: string;
  password: string;
  notifications?: Message[];
}

const notificationsSchema = new Schema<Message, Model<Message>>({
  message: {
    type: String,
    required: [true, 'Notifications must be provided'],
  },
});

const userSchema = new Schema<User, Model<User>>({
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
  notifications: [notificationsSchema],
});

export default mongoose.model('user', userSchema);
