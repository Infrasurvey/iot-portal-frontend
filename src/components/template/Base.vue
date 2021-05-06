<template>
  <div id="app">
    <!-- <div class="nav" v-if="loggedIn">
        <div class="nav-title">Geomon IoT Portal</div>
        <breadcrumb />
        <div class="nav-list dropdown">
          <font-awesome-icon class="icon" icon="chevron-down" size="1x" style="color:white"/>
          <div class="dropdown-content">
            <router-link :to="{ name: 'ManageInstallations' }" class="dp-container">Manage portal</router-link>
            <router-link :to="{ name: 'Informations' }" class="dp-container">Account settings</router-link>
            <router-link :to="{ name: 'Logout' }" class="dp-container">Logout</router-link>
          </div>
        </div>
        <div class="nav-list">
          <div class="user-info">
            <div>{{name}}</div>
            <div class="user-mail">{{mail}}</div>
          </div>
        </div>
        <div class="nav-list nav-logo">
          <router-link :to="{ name: 'home' }">
            <font-awesome-icon class="icon" icon="user-circle" size="3x" />
          </router-link>
        </div>
    </div> -->
    <div v-if="loggedIn" style="display: flex; align-items: stretch;">
      <md-toolbar class="md-accent" md-elevation="5" style="min-width: 400px; max-width: 400px; justify-content: center">
        <h2>Geomon IoT Portal</h2>
      </md-toolbar>
      <md-toolbar class="md-primary" md-elevation="5" style="display: flex; justify-content: space-between;">
        <breadcrumb/>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <md-icon style="width: 60px; height: 60px; font-size: 60px">account_circle</md-icon>
          <div class="user-info">
            <div>{{firstName}} {{lastName}}</div>
            <div class="user-mail">{{mail}}</div>
          </div>
          <md-menu md-size="auto" :md-offset-y="20" :mdCloseOnClick="true">
            <md-button class="md-icon-button" md-menu-trigger>
              <md-icon>expand_more</md-icon>
            </md-button>

            <md-menu-content>
              <md-menu-item>
                <md-icon>admin_panel_settings</md-icon>
                <router-link :to="{ name: 'ManageInstallations' }" style="text-decoration: none">System management</router-link>
              </md-menu-item>
              <md-menu-item>
                <md-icon>manage_accounts</md-icon>
                <router-link :to="{ name: 'Informations' }" style="text-decoration: none">Account settings</router-link>
              </md-menu-item>
              <md-menu-item>
                <md-icon>logout</md-icon>
              <router-link :to="{ name: 'Logout' }" style="text-decoration: none">Log out</router-link>
              </md-menu-item>
            </md-menu-content>
          </md-menu>
        </div>
      </md-toolbar>
    </div>
    <router-view @updateUserInfo="updateUserInfo"></router-view>
  </div>
</template>

<script>
import Breadcrumb from '../Breadcrumb'
export default {
    name: 'App'
,
components: {
    Breadcrumb
  },
  data (){
    return{
      firstName:'',
      lastName:'',
      mail:''
    }
  },
  created(){
    this.updateUserInfo();
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn
    }
  },
  methods:{
    updateUserInfo(){
      this.firstName = this.$store.getters.getFirstName;
      this.lastName = this.$store.getters.getLastName;
      this.mail = this.$store.getters.getMail;
    }
  }
}
</script>
