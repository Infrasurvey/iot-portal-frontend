import Vue from 'vue'
import Vuex from 'vuex'
import API from '../http-constants'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
  },
  getters: {
    loggedIn(state) {
      return state.token !== null
    }
  },
  mutations: {
    retrieveToken(state, token) {
      state.token = token
    },
    destroyToken(state) {
      state.token = null
    },
  },
  actions: {
    register(context, data) {
      return new Promise((resolve, reject) => {

        API.post('/api/register', {
          name: data.name,
          email: data.email,
          password: data.password,
          c_password: data.c_password,
        })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    destroyToken(context) {
      API.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          API.post('/api/logout')
            .then(response => {
              localStorage.removeItem('token')
              context.commit('destroyToken')
              resolve(response)
            })
            .catch(error => {
              localStorage.removeItem('token')
              context.commit('destroyToken')
              reject(error)
            })
        })
      }
    },
    retrieveToken(context, credentials) {

      return new Promise((resolve, reject) => {

          API.get('/sanctum/csrf-cookie').then(response => {
            API.post('/api/login', {
              email: credentials.email,
              password: credentials.password,
            })
              .then(response => {
                const token = response.data.token
                localStorage.setItem('token', token)
                context.commit('retrieveToken', token)
                API.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                resolve(response)
              })
              .catch(error => {
                console.log(error)
                reject(error)
              })
        });
        })
    }
  }
})