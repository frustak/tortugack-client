import axios from 'axios';
import { getToken } from '../helpers/cookie-helper';

const createAxios = (startFunc, endFunc, errFunc) => {
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
      errFunc();
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
      errFunc();
      return Promise.reject(error);
    }
  );

  return instance;
};

export default createAxios;
