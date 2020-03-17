import axios from 'axios';
import { getToken } from '../helpers/cookie-helper';

const createAxios = (startFunc, endFunc) => {
  const instance = axios.create({
    baseURL: 'https://tortugack.herokuapp.com/api/v1/',
  });

  instance.interceptors.request.use(
    config => {
      startFunc();
      const token = getToken();
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    error => {
      endFunc();
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    response => {
      endFunc();
      return response;
    },
    error => {
      endFunc();
      return Promise.reject(error);
    }
  );

  return instance;
};

export default createAxios;
