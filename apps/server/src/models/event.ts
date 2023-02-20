import mongoose, { Model } from 'mongoose';

import {
  Translation,
  DateTime,
  JoinMethod,
  Location,
  Schedule,
} from './event.types';

interface Event {
  name: Translation;
  type: string;
  category: string[];
  image_src: string;
  detail: Translation;
  is_nested: boolean;
  date_time: DateTime;
  location: String;
  locations: Location[];
  schedules: Schedule[];
  join_methods: JoinMethod[];
  created_by: mongoose.Types.ObjectId;
}

const translationSchema = new mongoose.Schema<Translation>(
  {
    en: {
      type: String,
      default: '',
    },
    kh: {
      type: String,
      default: '',
    },
  },
  { _id: false }
);

const eventSchema = new mongoose.Schema<Event>({
  name: {
    type: translationSchema,
    required: [true, 'Event name must not be empty'],
    validate: [
      {
        validator: (value: Translation) => value.en.trim() || value.kh.trim(),
        message: 'Please provide at least one event name in either language',
      },
      {
        validator: (value: Translation) =>
          value.en.trim().length > 5 || value.kh.trim().length > 5,
        message: 'Event name must be longer than 5 characters',
      },
      {
        validator: (value: Translation) =>
          value.en.trim().length < 100 || value.kh.trim().length < 100,
        message: 'Event name must be shorter than 100 characters',
      },
    ],
  },
  type: {
    type: String,
    enum: ['physical', 'online', 'physical-online'],
    required: [true, 'Please provide event type'],
  },
  category: {
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
          'charity',
        ],
      },
    ],
    validate: [
      (value: string[]) => value.length > 0,
      'Please provide at least one event category',
    ],
  },
  image_src: {
    type: String,
    required: [true, 'Please provide event image source'],
    validate: [
      (value: string) => {
        const imageURLPattern =
          /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*\.(jpeg|jpg|png|gif|webp)(\?.*)?)$/;
        return imageURLPattern.test(value);
      },
      'Please provide a valid image source url',
    ],
  },
  detail: {
    type: translationSchema,
    required: [true, 'Please provide event detail'],
    validate: [
      {
        validator: (value: Translation) => value.en.trim() || value.kh.trim(),
        message: 'Please provide at least one event name in either language',
      },
      {
        validator: (value: Translation) =>
          value.en.trim().length < 10000 || value.kh.trim().length < 10000,
        message: 'Event name must be shorter than 100 characters',
      },
    ],
  },
  is_nested: {
    type: Boolean,
    default: false,
  },
  date_time: {
    start_date: {
      type: Date,
      required: [true, 'Please provide event start date'],
    },
    end_date: {
      type: Date,
      required: [true, 'Please provide event end date'],
    },
    times: [
      {
        start_time: {
          type: Date,
          required: [true, 'Please provide event start time'],
        },
        end_time: {
          type: Date,
          required: [true, 'Please provide event end time'],
        },
      },
    ],
  },
  location: {
    type: String,
    enum: [
      'phnom-penh',
      'banteay-meanchey',
      'battambang',
      'kampong-cham',
      'kampong-chhnang',
      'kampong-speu',
      'kampo',
      'kandal',
      'kep',
      'koh-kong',
      'kratie',
      'mondulkiri',
      'oddor-meanchey',
      'pailin',
      'prev-veng',
      'pursat',
      'rattanakiri',
      'siem-reap',
      'sihanouk-ville',
      'stung-treng',
      'svay-rieng',
      'takeo',
      'kampong-thom',
      'preah-vihear',
      'tbong-khmum',
    ],
    required: [true, 'Please provide event location'],
  },
  locations: [
    {
      name: {
        type: String,
        required: [true, 'Please provide event location name'],
      },
      link: {
        type: String,
        required: [true, 'Please provide event location link'],
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
        name: translationSchema,
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
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide authorize token'],
  },
});

export default mongoose.model('Event', eventSchema);
