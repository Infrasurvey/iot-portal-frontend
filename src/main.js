// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Base from './components/template/Base'
import router from './router'
import { store } from './store/store'
import './assets/scss/index.scss'
import './assets/js/tools.js';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBatteryEmpty,faBatteryHalf,faBatteryFull,faBatteryQuarter,faBatteryThreeQuarters,faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
//import { AbilityBuilder, Ability } from '@casl/ability'
//import { abilityPlugin } from '@casl/vue'

/*
const ability = new  ability([])
function defineAbilitiesFor(user) {
  return AbilityBuilder.define((can, cannot) => {
    if (user.role ==='Admin')  //rules per user
    {
      can('manage', 'all')    
    } else {
      can('read', 'all')  //rule per field
    }
  })
}*/
//authenticationability.update(defineAbilitiesFor(this.$store.state.user))
//ability.can('read','Post')  //true
//Vue.use('abilityPlugins', 'ability');
library.add([faBatteryEmpty,faBatteryHalf,faBatteryFull,faBatteryQuarter,faBatteryThreeQuarters,faUserCircle])
Vue.component('font-awesome-icon', FontAwesomeIcon);
//Vue.use(abilitiesPlugin, ability);
Vue.config.productionTip = false;


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name: 'login',
      })
    } else {
      next()
    }
  } 
   else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  components: { Base },
  template: '<Base/>'
})
