import mongoose from 'mongoose';
import { Types, Model, Schema } from 'mongoose';

interface Message {
  message: string;
}

export interface UserType {
  _id: Types.ObjectId;
  uid: string;
  display_name: string;
  first_name: string;
  last_name: string;
  gender: 'male' | 'female' | 'non-binary';
  date_of_birth: Date;
  email: string;
  image_src?: string;
  followers?: Types.ObjectId[];
  following?: Types.ObjectId[];
  notifications?: Message[];
  events?: Types.ObjectId[];
  interested_events?: Types.ObjectId[];
  registered_events?: Types.ObjectId[];
}

const notificationsSchema = new Schema<Message, Model<Message>>({
  message: {
    type: String,
    required: [true, 'Notifications must be provided'],
  },
});

const userSchema = new Schema<UserType>(
  {
    uid: {
      type: String,
      unique: true,
      required: [true, 'Uid must be provided through firebase token'],
    },
    display_name: {
      type: String,
      maxlength: [50, 'Display name can not be more than 50 characters'],
      default: '',
    },
    first_name: {
      type: String,
      maxlength: [30, 'Display name can not be more than 30 characters'],
      default: '',
    },
    last_name: {
      type: String,
      maxlength: [30, 'Display name can not be more than 30 characters'],
      default: '',
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'non-binary'],
      default: 'male',
    },
    date_of_birth: {
      type: Date,
      validate: {
        validator: function (value: Date) {
          const currentDate = new Date();
          const age = currentDate.getFullYear() - value.getFullYear();
          return age >= 13;
        },
        message: 'You must be at least 13 years old to register',
      },
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email must be provided'],
      validate: [
        (value: string) => {
          const email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          return email.test(value);
        },
        'Please provide a correct email',
      ],
    },
    image_src: {
      type: String,
      default: '',
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
    interested_events: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Event',
      },
    ],
    registered_events: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Event',
      },
    ],
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export default mongoose.model('User', userSchema);
