import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import Auth from '@/components/auth/Auth'
import Logout from '@/components/auth/Logout'
import Overview from '@/components/installation/installation_overview'
import Manage from '@/components/installation/installation_manage'
import OverviewStation from '@/components/base_station/basestation_overview'
import ConfigurationStation from '@/components/base_station/basestation_config'
import Informations from '@/components/account/account_information'
import AccountLocation from '@/components/account/account_location'
import Password from '@/components/account/account_pwd'
import ManageMain from '@/components/management/manage_main'
import InstallationMain from '@/components/installation/installation_main'

Vue.use(Router)

var ManageOrganizationsRoute =  {
  path: '/management/organizations',
  name: 'ManageOrganization',
  component: ManageMain,
  meta: {

    requiresAuth: true,
    breadcrumb:[{name: 'Home', link: '/' },{name:'Management'},{name:'Organization'}],
    manageFunction : 2
  }
}

var ManageGroupsRoute =  {
  path: '/management/groups',
  name: 'ManageGroup',
  component: ManageMain,
  meta: {
    requiresAuth: true,
    breadcrumb:[{name: 'Home', link: '/' },{name:'Management'},{name:'Group'}],
    manageFunction : 3
  }
}

var ManageInstallationsRoute =  {
  path: '/management/installations',
  name: 'ManageInstallations',
  component: ManageMain,
  meta: {
    requiresAuth: true,
    breadcrumb:[{name: 'Home', link: '/' },{name:'Management'},{name:'Installations'}],
    manageFunction : 0 
  }
}

var ManageUsersRoute =  {
  path: '/management/users',
  name: 'ManageUsers',
  component: ManageMain,
  meta: {
    requiresAuth: true,
    breadcrumb:[{name: 'Home', link: '/' },{name:'Management'},{name:'Users'}],
    manageFunction : 1 
  }
}

var InformationsRoute =  {
  path: '/account-settings/informations',
  name: 'Informations',
  component: Informations,
  meta: {
    requiresAuth: true,
    breadcrumb:[{name: 'Home', link: '/' },{name:'Account settings'},{name:'Personal informations'}] 
  }
}

var LocationRoute =  {
  path: '/account-settings/location',
  name: 'Location',
  component: AccountLocation,
  meta: {
    requiresAuth: true,
    breadcrumb:[{name: 'Home', link: '/' },{name:'Account settings'},{name:'Location'}] 
  }
}

var PwdRoute =  {
  path: '/account-settings/password',
  name: 'Password',
  component: Password,
  meta: {
    requiresAuth: true,
    breadcrumb:[{name: 'Home', link: '/' },{name:'Account settings'},{name:'Password'}] 
  }
}

var OverviewRoute =  {
  path: '/installation/:id/overview',
  name: 'Overview',
  component: InstallationMain,
  meta: {
    requiresAuth: true,
    breadcrumb:[{name: 'Home', link: '/' },{name:'Installation'},{name:'Overview'}],
    installFunction : 0
  }
}

var ManageRoute =  {
  path: '/installation/:id/manage',
  name: 'Manage',
  component: InstallationMain,
  meta: {
    requiresAuth: true,
    breadcrumb:[{name: 'Home', link: '/' },{name:'Installation'},{name:'Manage'}],
    installFunction : 1 
  }
}

var EventRoute =  {
  path: '/installation/:id/event-log',
  name: 'Event',
  component: InstallationMain,
  meta: {
    requiresAuth: true,
    breadcrumb:[{name: 'Home', link: '/' },{name:'Installation'},{name:'Event Log'}],
    installFunction : 2 
  }
}

var OverviewStationRoute =  {
  path: '/installation/:id/basestation/overview',
  name: 'OverviewStation',
  component: InstallationMain,
  meta: {
    requiresAuth: true,
    breadcrumb:[{name: 'Home', link: '/' },{name:'Base station'},{name:'Overview'}],
    installFunction : 3 
  }
}

var ConfigStationRoute =  {
  path: '/installation/:id/basestation/configuration',
  name: 'ConfigurationStation',
  component: InstallationMain,
  meta: {
    requiresAuth: true,
    breadcrumb:[{name: 'Home', link: '/' },{name:'Base station'},{name:'Configuration'}],
    installFunction : 4 
  }
}

var OverviewRoverRoute =  {
  path: '/installation/:id/rover/:roverid/overview',
  name: 'RoverOverview',
  component: InstallationMain,
  meta: {
    requiresAuth: true,
    breadcrumb:[{name: 'Home', link: '/' },{name:'Rover'},{name:'Overview'}],
    installFunction : 5 
  }
}

var EventRoverRoute =  {
  path: '/installation/:id/rover/:roverid/events',
  name: 'RoverEvent',
  component: InstallationMain,
  meta: {
    requiresAuth: true,
    breadcrumb:[{name: 'Home', link: '/' },{name:'Rover'},{name:'Events'}],
    installFunction : 6 
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

export default new Router({
  routes: [
    HomeRoute,
    ManageRoute,
    OverviewRoute,
    EventRoute,
    OverviewStationRoute,
    ConfigStationRoute,
    OverviewRoverRoute,
    EventRoverRoute,
    AuthRoute,
    LogoutRoute,
    InformationsRoute,
    LocationRoute,
    PwdRoute,
    ManageInstallationsRoute,
    ManageUsersRoute,
    ManageGroupsRoute,
    ManageOrganizationsRoute,
  ]
})
