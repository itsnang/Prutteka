import { Fetcher } from 'swr';
const API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT || '';
const API = `${API_URL}/api/v1/events?filter[category]=all`;

export const fetcher: Fetcher<any, string> = (url: string) =>
  fetch(url).then((res) => res.json());
