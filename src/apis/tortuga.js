import axios from 'axios';
import { getToken } from '../helpers/cookie-helper';
import { displayLoading, closeLoading, displayError } from '../actions';
import { store } from '../index';

let timeoutID;
const startFunc = () => {
  timeoutID = setTimeout(() => store.dispatch(displayLoading()), 1000);
};
const endFunc = () => {
  clearTimeout(timeoutID);
  store.dispatch(closeLoading());
};
const errFunc = msg => {
  store.dispatch(displayError(msg));
};

const tortuga = axios.create({
  baseURL: 'https://tortugack.herokuapp.com/api/v1/',
});

tortuga.interceptors.request.use(
  config => {
    startFunc();
    const token = getToken();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => {
    endFunc();
    errFunc(error?.response?.data?.detail);
    return Promise.reject(error);
  }
);

tortuga.interceptors.response.use(
  response => {
    endFunc();
    return response;
  },
  error => {
    endFunc();
    errFunc(error?.response?.data?.detail);
    return Promise.reject(error);
  }
);

export default tortuga;
