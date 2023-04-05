interface TranslationStringType {
  en: string;
  km: string;
}

type Category =
  | 'free'
  | 'online'
  | 'education'
  | 'sport'
  | 'music'
  | 'exhibition'
  | 'technology'
  | 'food'
  | 'charity';

export interface InitialValueType {
  image: { src: string; file: Blob | null };
  name: TranslationStringType;
  type: string;
  categories: Category[] | string[];
  detail: string;
  date: {
    start_date: string;
    end_date: string;
  };
  times: {
    date: string;
    start_time: string;
    end_time: string;
  }[];
  custom_date: boolean;
  locations: {
    name: string;
    address: string;
    url: string;
    latlng: { lat: number; lng: number };
    type: 'google' | 'custom' | string;
    place_id: string;
    image_src: string;
  }[];
  schedules: {
    date: string;
    schedules: {
      start_time: string;
      end_time: string;
      activity: TranslationStringType;
    }[];
  }[];
  custom_schedule: boolean;
  join_methods: {
    name: TranslationStringType;
    link: string;
  }[];
  dynamic_contents: {
    name: TranslationStringType;
    items: {
      image: { src: string; file: Blob | null };
      name: TranslationStringType;
      detail: TranslationStringType;
    }[];
  }[];
}
