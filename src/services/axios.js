import axios from 'axios';

const token = document.cookie.replace(
  /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
  '$1'
);

const instance = axios.create({
  baseURL: 'https://tortugack.herokuapp.com/api/v1',
  headers: {
    Authorization: `Basic ${token}`,
  },
});

export default instance;
