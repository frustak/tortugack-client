import axios from 'axios';
import Cookies from 'js-cookie';

import { showLoading, hideLoading } from '../actions/loadingActions/loadingActions';
import { showError } from '../actions/errorActions/errorActions';
import store from '../store';

let timeoutID;
const startFunc = () => {
  timeoutID = setTimeout(() => store.dispatch(showLoading()), 1000);
};
const endFunc = () => {
  clearTimeout(timeoutID);
  store.dispatch(hideLoading());
};
const errFunc = msg => {
  store.dispatch(showError(msg));
};

const tortuga = axios.create({
  baseURL: 'https://tortugack.herokuapp.com/api/v1/',
});

tortuga.interceptors.request.use(
  config => {
    startFunc();
    const token = Cookies.get('token') || '';
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
