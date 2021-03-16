import axios from 'axios'

let baseURL

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:8080/api/'
} else {
  baseURL = 'http://localhost:8080/api/'
}

export const HTTP = axios.create(
  {
    baseURL: baseURL
  })
  