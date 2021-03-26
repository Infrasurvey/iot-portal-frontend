import axios from 'axios'

let baseURL

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:8080/'
} else {
  baseURL = 'http://localhost:8080/'
}


let API = axios.create({
  baseURL: baseURL
});

API.defaults.withCredentials = true;

export default API;
