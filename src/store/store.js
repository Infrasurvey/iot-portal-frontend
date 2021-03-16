import Vue from 'vue'
import Vuex from 'vuex'
import {HTTP} from '../http-constants'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null,
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

        HTTP.post('/register', {
          name: data.name,
          email: data.email,
          password: data.password,
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
      //axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
            HTTP.post('/logout')
            .then(response => {
              localStorage.removeItem('access_token')
              context.commit('destroyToken')
              resolve(response)
              // console.log(response);
              // context.commit('addTodo', response.data)
            })
            .catch(error => {
              localStorage.removeItem('access_token')
              context.commit('destroyToken')
              reject(error)
            })
        })
      }
    },
    retrieveToken(context, credentials) {

      return new Promise((resolve, reject) => {

        
          if(credentials.username=="nino",credentials.password=="admin")
          {
            const token = "montokkken"

            localStorage.setItem('access_token', token)
            context.commit('retrieveToken', token)
            resolve(true)
          }
          else{
            reject(false)
          }
            
          /*
        HTTP.post('/login', {
          username: credentials.username,
          password: credentials.password,
        })
          .then(response => {
            const token = response.data.access_token

            localStorage.setItem('access_token', token)
            context.commit('retrieveToken', token)
            resolve(response)
            // console.log(response);
            // context.commit('addTodo', response.data)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })*/
        })
    }
  }
})