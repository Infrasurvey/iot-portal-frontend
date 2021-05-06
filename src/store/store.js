import Vue from 'vue'
import Vuex from 'vuex'
import API from '../http-constants'
import defineRulesFor from '../assets/js/abilityBuild'
import {ability} from '../assets/js/ability.js'
import { Ability } from '@casl/ability'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    token: sessionStorage.getItem('token') || null,
    groups : sessionStorage.getItem('groups') || null,
    ability : sessionStorage.getItem('ability') || new Ability([]),
    first_name : sessionStorage.getItem('first_name') || null,
    last_name : sessionStorage.getItem('last_name') || null,
    mail : sessionStorage.getItem('mail') || null,
    is_admin : sessionStorage.getItem('is_admin') || false
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
    },
    getFirstName(state){
      return state.first_name
    },
    getLastName(state){
      return state.last_name
    },
    getMail(state){
      return state.mail
    },
    isAdmin(state){
      return state.is_admin
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
      sessionStorage.setItem('groups', groups)
    },
    updateAbility(state,groups){
      state.ability = defineRulesFor(groups)
      sessionStorage.setItem('token', state.ability)
    },
    setFirstName(state,first_name){
      state.first_name = first_name
      sessionStorage.setItem('first_name', first_name)
    },
    setLastName(state,last_name){
      state.last_name = last_name
      sessionStorage.setItem('last_name', last_name)
    },
    setMail(state,mail){
      state.mail = mail
      sessionStorage.setItem('mail', mail)
    }
  },
  actions: {
    register(context, data) {
      return new Promise((resolve, reject) => {
        API.get('/sanctum/csrf-cookie').then(response => {
          API.post('/api/register', data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        })
        
      })
    },
    cleanSession(context){
      sessionStorage.removeItem('token')
      context.commit('destroyToken')
  
      sessionStorage.removeItem('groups')
      context.commit('setGroups', null)
  
      sessionStorage.removeItem('ability')
  
      sessionStorage.removeItem('first_name')
      context.commit('setFirstName',null)
  
      sessionStorage.removeItem('last_name')
      context.commit('setLastName',null)
  
      sessionStorage.removeItem('mail')
      context.commit('setMail',null)
  
      console.log("Session cleaned")
  
    },
    destroyToken(context) {
      API.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          API.post('/api/logout')
            .then(response => {
              context.dispatch('cleanSession')
              resolve(response)
            })
            .catch(error => {
              context.dispatch('cleanSession')
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
                sessionStorage.setItem('token', token)
                context.commit('retrieveToken', token)
                API.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                var groups =[];
                const groupsAsJSON = response.data.data.groups
                for(var i in groupsAsJSON){
                  const group = groupsAsJSON[i]
                  groups.push(group.name) 
                }
                context.commit('setGroups', groups)
                context.commit('updateAbility',groups)
                context.commit('setFirstName',response.data.data.name)
                context.commit('setLastName',response.data.data.lastname)
                context.commit('setMail',response.data.data.email)
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