import { EditorState } from 'draft-js';

export interface EventDetail {
  details: {
    name: { en: string; kh: string };
    type: string;
    category: string;
    location: string;
    detail: { en: string | EditorState; kh: string | EditorState };
    img: string;
    nestedEvents: boolean;
  };
  datetime: {
    start_date: string | Date;
    end_date: string | Date;
    start_time: string;
    end_time: string;
    hasCustomTime: boolean;
    customTimes: {
      date?: Date;
      start_time: string;
      end_time: string;
    }[];
  };
  locations: {
    name: { en: string; kh: string };
    link: string;
  }[];
  schedule: {
    hasCustomSchedule: boolean;
    sharedSchedules: {
      start_time: string;
      end_time: string;
      activity: { en: string; kh: string };
    }[];
    customSchedules: {
      date?: Date;
      schedules: {
        start_time: string;
        end_time: string;
        activity: { en: string; kh: string };
      }[];
    }[];
  };
  joinMethods: {
    name: { en: string; kh: string };
    link: string;
  }[];
}

export interface EventDetailType {
  en: EventDetail;
  kh: EventDetail;
}
