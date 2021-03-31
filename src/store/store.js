import Vue from 'vue'
import Vuex from 'vuex'
import API from '../http-constants'
import defineRulesFor from '../assets/js/abilityBuild'
import {ability} from '../assets/js/ability.js'
import { Ability } from '@casl/ability'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
    groups : null,
    ability : new Ability([])
  },
  getters: {
    loggedIn(state) {
      return state.token !== null
    },
    getGroups(state){
      return state.groups
    },
    getAbility(state){
      return state.ability
    }
  },
  mutations: {
    retrieveToken(state, token) {
      state.token = token
    },
    destroyToken(state) {
      state.token = null
    },
    setGroups(state,groups){
      state.groups = groups
    },
    updateAbility(state,groups){
      state.ability = defineRulesFor(groups)
    }
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
                const token = response.data.data.token
                localStorage.setItem('token', token)
                context.commit('retrieveToken', token)
                API.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                var groups =[];
                const groupsAsJSON = response.data.data.groups
                for(var i in groupsAsJSON){
                  const group = groupsAsJSON[i]
                  groups[group.name] = group.pivot.is_group_admin;
                }
                context.commit('setGroups', groups)
                context.commit('updateAbility',groups)
                //ability.update(defineRulesFor(context.getters.getGroups))
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