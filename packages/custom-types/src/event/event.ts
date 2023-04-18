export interface APIResponseEvents {
  links: Links;
  data: Data[];
  included: Included[];
}
export interface APIResponseEvent {
  links: Links;
  data: Data;
  included: Included[];
}

interface Data {
  type: string;
  id: string;
  attributes: EventType;
  relationships: Relationships;
}

interface EventType {
  name: Detail;
  type: 'online' | 'physical' | 'physical-online';
  categories: string[];
  image_src: string;
  detail: Detail;
  date: Date;
  times: Time[];
  locations: Location[];
  schedules: AllSchedules[];
  join_methods: JoinMethod[];
  dynamic_contents: DynamicContent[];
  created_at: string;
}

interface Date {
  start_date: string;
  end_date: string;
}

interface Time {
  date: string;
  start_time: string;
  end_time: string;
  _id: string;
}

interface Detail {
  en: string;
  km: string;
}

interface DynamicContent {
  name: Detail;
  items: Item[];
  _id: string;
}

interface Item {
  image_src: string;
  name: Detail;
  detail: Detail;
  _id: string;
}

interface JoinMethod {
  name: Detail;
  link: string;
  _id: string;
}

interface Location {
  name: string;
  address: string;
  url?: string;
  latlng?: Latlng;
  type: 'google' | 'custom';
  place_id?: string;
  image_src?: string;
  _id: string;
}

interface Latlng {
  lat: number;
  lng: number;
}

interface AllSchedules {
  date: string;
  schedules: ScheduleSchedule[];
  _id: string;
}

interface ScheduleSchedule {
  start_time: string;
  end_time: string;
  activity: Detail;
  _id: string;
}

interface Relationships {
  organizer: Organizer;
}

interface Organizer {
  data: Data;
}

interface Data {
  type: string;
  id: string;
}

interface Included {
  type: string;
  id: string;
  attributes: IncludedAttributes;
}

interface IncludedAttributes {
  display_name: string;
}

interface Links {
  self: string;
  prev: string | null;
  next: string | null;
}
