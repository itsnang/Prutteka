import { Fetcher } from 'swr';
import axios from 'axios';

export const fetcher: Fetcher<any, string> = (url: string) =>
  axios.get(url).then((res) => res.data);
