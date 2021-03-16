import Vue from 'vue'
import Router from 'vue-router'
import GetRover from '@/components/GetRover'
import Home from '@/components/Home'
import Login from '@/components/auth/Login'
import Logout from '@/components/auth/Logout'
import Register from '@/components/auth/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/getrover',
      name: 'GetRover',
      component: GetRover,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
     
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
     
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout,
      meta: {
        requiresAuth: true,
      }
    }
  ]
})
