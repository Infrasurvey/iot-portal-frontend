// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Base from './components/Base'
import router from './router'
import { store } from './store/store'
import './assets/scss/index.scss'

Vue.config.productionTip = false


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name: 'Login',
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
