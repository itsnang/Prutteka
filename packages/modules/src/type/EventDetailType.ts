export interface EventDetail {
  details: {
    name: string;
    type: string;
    category: string;
    detail: string;
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
    name: string;
    link: string;
  }[];
  schedule: {
    hasCustomSchedule: boolean;
    sharedSchedules: {
      startTime: string;
      endTime: string;
      activity: string;
    }[];
    customSchedules: {
      date?: Date;
      schedules: {
        startTime: string;
        endTime: string;
        activity: string;
      }[];
    }[];
  };
  joinMethods: {
    method: string;
    link: string;
  }[];
}

export interface EventDetailType {
  en: EventDetail;
  kh: EventDetail;
}
