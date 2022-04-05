import axios from 'axios'
import { store } from './store/store'
import router from './router'

let baseURL

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:8003/'
} else {
  baseURL = 'http://geomon-iot.ch:8003/'
}


let API = axios.create({
  baseURL: baseURL
});

API.defaults.withCredentials = true;

API.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response.status === 401) {
      store.dispatch('destroyToken').then(response => {
        router.push({ name: 'auth' })
      })
    }
  return Promise.reject(error);
});

export default API;


