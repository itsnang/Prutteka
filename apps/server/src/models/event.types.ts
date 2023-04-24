export interface TranslationStringType {
  en: string;
  km: string;
}

export interface Date {
  start_date: Date;
  end_date: Date;
}

export interface Time {
  date: Date;
  start_time: Date;
  end_time: Date;
}

interface ScheduleItem {
  start_time: Date;
  end_time: Date;
  activity: TranslationStringType;
}

export interface Location {
  name: string;
  address: string;
  url: string;
  latlng: { lat: number; lng: number };
  type: 'google' | 'custom' | string;
  place_id: string;
  image_src: string;
}

export interface JoinMethod {
  name: TranslationStringType;
  link: string;
}

export interface Schedule {
  date: Date;
  schedules: ScheduleItem[];
}

export interface Dynamic_Content {
  name: TranslationStringType;
  items: {
    image_src: string;
    name: TranslationStringType;
    detail: TranslationStringType;
  }[];
}
