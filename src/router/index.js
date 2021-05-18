import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import Auth from '@/components/auth/Auth'
import Logout from '@/components/auth/Logout'
import Overview from '@/components/installation/installation_overview'
import Manage from '@/components/installation/installation_manage'
import OverviewStation from '@/components/base_station/basestation_overview'
import ConfigurationStation from '@/components/base_station/basestation_config'
import RoverOverview from '@/components/rover/rover_overview'
import AccountMain from '@/components/account/account_main'
import Informations from '@/components/account/account_information'
import AccountLocation from '@/components/account/account_location'
import Password from '@/components/account/account_pwd'
import ManageMain from '@/components/management/manage_main'
import InstallationMain from '@/components/installation/installation_main'

Vue.use(Router)

var AuthRoute = {
  path: '/login',
  name: 'auth',
  component: Auth,
}

var LogoutRoute = {
  path: '/logout',
  name: 'Logout',
  component: Logout,
  meta: {
    requiresAuth: true,
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

var ManagementRoutes =  {
  path: '/management',
  children: [
    {
      path: 'organizations',
      name: 'ManageOrganization',
      component: ManageMain,
      meta: {
        requiresAuth: true,
        breadcrumb:[{name: 'Home', link: '/' },{name:'Management'},{name:'Organization'}],
        manageFunction : 2
      }
    },
    {
      path: 'groups',
      name: 'ManageGroup',
      component: ManageMain,
      meta: {
        requiresAuth: true,
        breadcrumb:[{name: 'Home', link: '/' },{name:'Management'},{name:'Group'}],
        manageFunction : 3
      }
    },
    {
      path: 'installations',
      name: 'ManageInstallations',
      component: ManageMain,
      meta: {
        requiresAuth: true,
        breadcrumb:[{name: 'Home', link: '/' },{name:'Management'},{name:'Installations'}],
        manageFunction : 0 
      }
    },
    {
      path: 'users',
      name: 'ManageUsers',
      component: ManageMain,
      meta: {
        requiresAuth: true,
        breadcrumb:[{name: 'Home', link: '/' },{name:'Management'},{name:'Users'}],
        manageFunction : 1 
      }
    }
  ]
}

var AccountSettingsRoutes =  {
  path: '/account-settings',
  component: AccountMain,
  children: [
    {
      path: 'informations',
      name: 'Informations',
      component: Informations,
      meta: {
        requiresAuth: true,
        breadcrumb:[{name: 'Home', link: '/' },{name:'Account settings'},{name:'Personal informations'}] 
      }
    },
    {
      path: 'location',
      name: 'Location',
      component: AccountLocation,
      meta: {
        requiresAuth: true,
        breadcrumb:[{name: 'Home', link: '/' },{name:'Account settings'},{name:'Location'}] 
      }
    },
    {
      path: 'password',
      name: 'Password',
      component: Password,
      meta: {
        requiresAuth: true,
        breadcrumb:[{name: 'Home', link: '/' },{name:'Account settings'},{name:'Password'}] 
      }
    }
  ]
}

var InstallationRoutes =  {
  path: '/installation/:id',
  component: InstallationMain,
  children: [
    {
      path: 'overview',
      component: Overview,
      name: 'Overview',
      meta: {
        requiresAuth: true,
        breadcrumb:[{name: 'Home', link: '/' },{name:'Installation'},{name:'Overview'}],
      }
    },
    {
      path: 'manage',
      name: 'Manage',
      component: Manage,
      meta: {
        requiresAuth: true,
        breadcrumb:[{name: 'Home', link: '/' },{name:'Installation'},{name:'Manage'}],
      }
    },
    {
      path: 'event-log',
      name: 'Event',
      component: InstallationMain,
      meta: {
        requiresAuth: true,
        breadcrumb:[{name: 'Home', link: '/' },{name:'Installation'},{name:'Event Log'}],
      }
    },
    {
      path: 'basestation/overview',
      name: 'OverviewStation',
      component: OverviewStation,
      meta: {
        requiresAuth: true,
        breadcrumb:[{name: 'Home', link: '/' },{name:'Base station'},{name:'Overview'}],
      }
    },
    {
      path: 'basestation/configuration',
      name: 'ConfigurationStation',
      component: ConfigurationStation,
      meta: {
        requiresAuth: true,
        breadcrumb:[{name: 'Home', link: '/' },{name:'Base station'},{name:'Configuration'}],
      }
    },
    {
      path: 'rover/:roverid/overview',
      name: 'RoverOverview',
      component: RoverOverview,
      meta: {
        requiresAuth: true,
        breadcrumb:[{name: 'Home', link: '/' },{name:'Rover'},{name:'Overview'}],
      }
    },
    {
      path: 'rover/:roverid/events',
      name: 'RoverEvent',
      //component: ,
      meta: {
        requiresAuth: true,
        breadcrumb:[{name: 'Home', link: '/' },{name:'Rover'},{name:'Events'}],
      }
    }
  ]
}

export default new Router({
  routes: [
    AuthRoute,
    LogoutRoute,
    HomeRoute,
    ManagementRoutes,
    AccountSettingsRoutes,
    InstallationRoutes
  ]
})
