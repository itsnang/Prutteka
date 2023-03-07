interface Time {
  start_time: Date;
  end_time: Date;
}

interface ScheduleItem {
  start_time: Date;
  end_time: Date;
  activity: Translation;
}

export interface Translation {
  en: string;
  kh: string;
}

export interface DateTime {
  start_date: Date;
  end_date: Date;
  times: Time[];
}

export interface Location {
  name: Translation;
  link: string;
}

export interface JoinMethod {
  method: 'link' | 'ticket';
  link: string;
}

export interface Schedule {
  date: Date;
  schedules: ScheduleItem[];
}
