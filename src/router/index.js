import Vue from 'vue'
import Router from 'vue-router'
import GetRover from '@/components/GetRover'
import Home from '@/components/Home'
import Login from '@/components/auth/Login'
import Logout from '@/components/auth/Logout'
import Register from '@/components/auth/Register'
import Overview from '@/components/installation/installation_overview'
import Manage from '@/components/installation/installation_manage'
import OverviewStation from '@/components/base_station/basestation_overview'
import ConfigurationStation from '@/components/base_station/basestation_config'


Vue.use(Router)

var OverviewRoute =  {
  path: '/overview',
  name: 'Overview',
  component: Overview,
  meta: {
    requiresAuth: true,
    breadcrumb:[{name: 'Home', link: '/' },{name:'Installation'},{name:'Overview'}] 
  }
}

var ManageRoute =  {
  path: '/manage',
  name: 'Manage',
  component: Manage,
  meta: {
    requiresAuth: true,
    breadcrumb:[{name: 'Home', link: '/' },{name:'Installation'},{name:'Manage'}] 
  }
}

var OverviewStationRoute =  {
  path: '/basestation/overview',
  name: 'OverviewStation',
  component: OverviewStation,
  meta: {
    requiresAuth: true,
    breadcrumb:[{name: 'Home', link: '/' },{name:'Base station'},{name:'Overview'}] 
  }
}

var ConfigStationRoute =  {
  path: '/basestation/configuration',
  name: 'ConfigurationStation',
  component: ConfigurationStation,
  meta: {
    requiresAuth: true,
    breadcrumb:[{name: 'Home', link: '/' },{name:'Base station'},{name:'Configuration'}] 
  }
}

var HomeRoute = {
  path: '/',
  name: 'home',
  component: Home,
  meta: {
    requiresAuth: true,
    breadcrumb:[{name:'Home'}] 
  }
}

var LoginRoute = {
  path: '/login',
  name: 'login',
  component: Login,
 
}

var RegisterRoute = 
{
  path: '/register',
  name: 'Register',
  component: Register,
 
}

var LogoutRoute = {
  path: '/logout',
  name: 'Logout',
  component: Logout,
  meta: {
    requiresAuth: true,
  }
}



var GetRoverRoute =     {
  path: '/getrover',
  name: 'GetRover',
  component: GetRover,
  meta: {
    requiresAuth: true,
  }
}

export default new Router({
  routes: [
    HomeRoute,
    ManageRoute,
    OverviewRoute,
    OverviewStationRoute,
    ConfigStationRoute,
    LoginRoute,
    RegisterRoute,
    LogoutRoute,
    GetRoverRoute
  ]
})