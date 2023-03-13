import axios from 'axios';

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

axios.defaults.baseURL = `${API_ENDPOINT}/api/v1`;
