import { Links } from '../common';

export interface APIResponseUser {
  links: Links;
  data: Data;
}

export interface Data {
  type: string;
  id: string;
  attributes: Attributes;
}

export interface Attributes {
  username: string;
  email: string;
  notifications: any[];
  following: any[];
  followers: any[];
  events: any[];
  interested_events: any[];
}
