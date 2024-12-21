import axios from 'axios';
import helpers from '../helpers';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://clownfish-app-wvth5.ondigitalocean.app/'
    : 'https://clownfish-app-wvth5.ondigitalocean.app/';

const onRequestSuccess = (config: any) => {
  config.headers['Authorization'] = `bearer ${helpers.cookie_get('AT')}`;
  return config;
};
const onRequestError = (error: any) => {
  return Promise.reject(error);
};
const onResponseSuccess = (response: any) => {
  return response.data;
};
const onResponseError = (error: any) => {
  if (error.response) {
    if (error.response.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error.response.data);
  }
  return Promise.reject(error);
};
axios.interceptors.request.use(onRequestSuccess, onRequestError);
axios.interceptors.response.use(onResponseSuccess, onResponseError);
axios.defaults.baseURL = baseURL;

var BaseRequest = {
  Get: async (url: string) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (err) {
      console.log('err', err);
    }
  },
  Post: async (url: string, data?: any) => {
    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (err) {
      console.log('err', err);
    }
  },
  Put: async (url: string, data: any) => {
    try {
      const response = await axios.put(url, data);
      return response.data;
    } catch (err) {
      console.log('err', err);
    }
  },
  Delete: async (url: string) => {
    try {
      const response = await axios.delete(url);
      return response.data;
    } catch (err) {
      console.log('err', err);
    }
  }
};

export default BaseRequest;
