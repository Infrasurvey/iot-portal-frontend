import Vue from 'vue'
import Vuex from 'vuex'
import API from '../http-constants'
import defineRulesFor from '../assets/js/abilityBuild'
import { Ability } from '@casl/ability'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    token: sessionStorage.getItem('token') || null,
    groups : JSON.parse(sessionStorage.getItem('groups')) || null,
    organizations : JSON.parse(sessionStorage.getItem('organizations')) || null,
    ability : new Ability([]),
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
    getOrganizations(state){
      return state.organizations
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
      sessionStorage.setItem('groups', JSON.stringify(groups))
    },
    setOrganizations(state,organizations){
      state.organizations = organizations
      sessionStorage.setItem('organizations', JSON.stringify(organizations))
    },
    updateAbility(state,{groups,organizations,is_admin}){
      state.ability = defineRulesFor(groups,organizations,is_admin)
      //sessionStorage.setItem('ability', JSON.stringify(state.ability))
    }, 
    setAbility(state){
      state.ability = defineRulesFor(state.groups,state.organizations,state.is_admin)
      //sessionStorage.setItem('ability', JSON.stringify(state.ability))
    }, 
    setIsAdmin(state,is_admin){
      state.is_admin = is_admin
      sessionStorage.setItem('is_admin', is_admin)
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

      sessionStorage.removeItem('organizations')
      context.commit('setOrganizations', null)
  
/*       sessionStorage.removeItem('ability')
 */  
      sessionStorage.removeItem('is_admin')
      context.commit('setIsAdmin',null)

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
          API.get('/sanctum/csrf-cookie').then(response => {
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
                  groups.push({'id':group.id,'organization_id':group.organization_id}) 
                }

                var organizations =[];
                const orgasAsJSON = response.data.data.organizations
                for(var i in orgasAsJSON){
                  const organization = orgasAsJSON[i]
                  organizations.push({'id':organization.id}) 
                }
                var is_admin = response.data.data.is_admin
                context.commit('setGroups', groups)
                context.commit('setOrganizations', organizations)
                context.commit('updateAbility',{groups,organizations,is_admin})
                context.commit('setIsAdmin',is_admin)
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
    },

  }
})