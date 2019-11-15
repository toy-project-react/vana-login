import axios from 'axios';

const https = require('https');
const SERVER = process.env.REACT_APP_API_HOST;
const instance = axios.create({
  baseURL: SERVER,
  headers: {
    'Content-Type': 'application/json'
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  config.headers.token = token ? `${token}` : '';
  return config;
});

export default (url, method, payload) => {
  return new Promise((resolve, reject) => {
    instance({
      url,
      method,
      data: payload
        ? {
            ...payload
          }
        : {},
      params: payload && payload.params ? { ...payload.params } : {}
    })
      .then(resp => resolve(resp.data))
      .catch(err => {
        if (err.response && err.response.status === 401) {
          resetStorage();
          window.location.href = '/login';
        }
        return reject(err.response);
      });
  });
};

function resetStorage() {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('email');
  localStorage.removeItem('authentication');
  localStorage.removeItem('token');
}
