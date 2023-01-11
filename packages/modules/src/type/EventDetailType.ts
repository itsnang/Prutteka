import { EditorState } from 'draft-js';

export interface EventDetail {
  details: {
    name: { en: string; kh: string };
    type: number;
    category: number;
    detail: { en: string | EditorState; kh: string | EditorState };
    img: string;
    nestedEvents: boolean;
  };
  datetime: {
    startDate: string | Date;
    endDate: string | Date;
    startTime: string;
    endTime: string;
    hasCustomTime: boolean;
    customTimes: {
      date?: Date;
      startTime: string;
      endTime: string;
    }[];
  };
  locations: {
    name: { en: string; kh: string };
    link: string;
  }[];
  schedule: {
    hasCustomSchedule: boolean;
    sharedSchedules: {
      startTime: string;
      endTime: string;
      activity: { en: string; kh: string };
    }[];
    customSchedules: {
      date?: Date;
      schedules: {
        startTime: string;
        endTime: string;
        activity: { en: string; kh: string };
      }[];
    }[];
  };
  joinMethods: {
    method: { en: string; kh: string };
    link: string;
  }[];
}

export interface EventDetailType {
  en: EventDetail;
  kh: EventDetail;
}
