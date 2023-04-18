import mongoose, { Document } from 'mongoose';

import {
  TranslationStringType,
  Date,
  Time,
  JoinMethod,
  Location,
  Schedule,
  Dynamic_Content,
} from './event.types';

export interface EventType {
  _id: mongoose.Types.ObjectId;
  name: TranslationStringType;
  type: string;
  categories: string[];
  image_src: string;
  detail: TranslationStringType;
  date: Date;
  times: Time;
  location: String;
  locations: Location[];
  schedules: Schedule[];
  join_methods: JoinMethod[];
  dynamic_contents: Dynamic_Content[];
  organizer: mongoose.Types.ObjectId;
}

const translationSchema = new mongoose.Schema<TranslationStringType>(
  {
    en: {
      type: String,
      default: '',
    },
    km: {
      type: String,
      default: '',
    },
  },
  { _id: false }
);

const eventSchema = new mongoose.Schema<EventType>(
  {
    name: {
      type: translationSchema,
      required: [true, 'Event name must be provided'],
      validate: [
        {
          validator: (value: TranslationStringType) =>
            value.en.trim() || value.km.trim(),
          message: 'Event name must be provided in english or khmer',
        },
        {
          validator: (value: TranslationStringType) =>
            value.en.trim().length > 5 || value.km.trim().length > 5,
          message: 'Event name must be longer than 5 characters',
        },
        {
          validator: (value: TranslationStringType) =>
            value.en.trim().length < 100 || value.km.trim().length < 100,
          message: 'Event name must be shorter than 100 characters',
        },
      ],
    },
    type: {
      type: String,
      enum: ['physical', 'online', 'physical-online'],
      required: [true, 'Please provide event type'],
    },
    categories: {
      type: [
        {
          type: String,
          enum: [
            'free',
            'online',
            'education',
            'sport',
            'music',
            'exhibition',
            'technology',
            'food',
            'charity',
          ],
        },
      ],
      validate: [
        (value: string[]) => value.length > 0,
        'At least one category must be provided',
      ],
    },
    image_src: {
      type: String,
      required: [true, 'Event image source must be provided'],
      validate: [
        (value: string) => {
          const imageURLPattern =
            /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*\.(jpeg|jpg|png|jfif|webp)(\?.*)?)$/;
          return imageURLPattern.test(value);
        },
        'Image source must be a valid url',
      ],
    },
    detail: {
      type: translationSchema,
      required: [true, 'Event detail must be provided'],
      validate: [
        {
          validator: (value: TranslationStringType) =>
            value.en.trim() || value.km.trim(),
          message: 'Event detail must be provided in english or khmer',
        },
        {
          validator: (value: TranslationStringType) =>
            value.en.trim().length < 10000 || value.km.trim().length < 10000,
          message: 'Event detail must be shorter than 10000 characters',
        },
      ],
    },
    date: {
      start_date: {
        type: Date,
        required: [true, 'Event start date must be provided'],
      },
      end_date: {
        type: Date,
        required: [true, 'Event end date must be provided'],
      },
    },
    times: [
      {
        date: {
          type: Date,
          required: [true, 'Date of time must be provided'],
        },
        start_time: {
          type: Date,
          required: [true, 'Event start time must be provided'],
        },
        end_time: {
          type: Date,
          required: [true, 'Event end time must be provided'],
        },
      },
    ],
    locations: [
      {
        name: {
          type: String,
          required: [true, 'Location name must be provided'],
        },
        address: {
          type: String,
          required: [true, 'Location address must be provided'],
        },
        url: {
          type: String,
          required: false,
          match: [
            /^https:\/\/maps\.google\.com\//,
            'Location url must be a valid google map link',
          ],
        },
        latlng: {
          type: new mongoose.Schema(
            {
              lat: {
                type: Number,
              },
              lng: { type: Number },
            },
            { _id: false }
          ),
          required: false,
        },
        type: {
          type: String,
          required: [true, 'Location type must be provided'],
          enum: ['google', 'custom'],
        },
        place_id: {
          type: String,
          required: false,
        },
        image_src: {
          type: String,
          required: false,
          match: [
            /^https:\/\/maps\.googleapis\.com\/maps\/api\/staticmap/,
            'Location image source must be a valid google map static-map',
          ],
        },
      },
    ],
    schedules: [
      {
        date: {
          type: Date,
        },
        schedules: [
          {
            start_time: {
              type: Date,
            },
            end_time: {
              type: Date,
            },
            activity: translationSchema,
          },
        ],
      },
    ],
    join_methods: {
      type: [
        {
          name: { type: translationSchema },
          link: {
            type: String,
            required: [true, 'Please provide event method link'],
          },
        },
      ],
      required: true,
      validate: [
        (value: string[]) => value.length > 0,
        'Please provide at least one event join method',
      ],
    },
    dynamic_contents: [
      {
        name: { type: translationSchema },
        items: [
          {
            image_src: {
              type: String,
              required: false,
              match: [
                /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*\.(jpeg|jpg|png|jfif|webp)(\?.*)?)$/,
                'Image source must be a valid url',
              ],
            },
            name: {
              type: translationSchema,
            },
            detail: {
              type: translationSchema,
            },
          },
        ],
      },
    ],
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide authorize token'],
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

export default mongoose.model('Event', eventSchema);
