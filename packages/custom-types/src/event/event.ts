import { Links } from '../common';
export interface APIResponseEvents {
  links: Links;
  data: Event[];
  included: Included[];
}

export interface APIResponseEvent {
  links: Links;
  data: Event;
  included: Included[];
}

export interface Event {
  type: string;
  id: string;
  attributes: DatumAttributes;
  relationships: DatumRelationships;
}

interface DatumAttributes {
  name: Detail;
  type: string;
  category: string[];
  image_src: string;
  detail: Detail;
  date_time: DateTime;
  location: string;
  locations: Location[];
  schedules: Schedule[];
  join_methods: JoinMethod[];
}

export interface DateTime {
  start_date: string;
  end_date: string;
  times: Time[];
}

interface Time {
  start_time: string;
  end_time: string;
  _id: string;
}

export interface Schedule {
  start_time: string;
  end_time: string;
  _id: string;
  activity: Detail;
}

export interface Detail {
  en: string;
  kh: string;
}

export interface JoinMethod {
  name: Detail;
  link: string;
  _id: string;
}

export interface Location {
  name: string;
  link: string;
  _id: string;
}

export interface Schedule {
  date: string;
  schedules: Schedule[];
  _id: string;
}

export interface DatumRelationships {
  organizer: Organizer;
}

export interface Organizer {
  data: Data;
}

export interface Data {
  type: string;
  id: string;
}

export interface Included {
  type: string;
  id: string;
  attributes: IncludedAttributes;
  relationships: IncludedRelationships;
}

export interface IncludedAttributes {
  username: string;
}

export interface IncludedRelationships {}
