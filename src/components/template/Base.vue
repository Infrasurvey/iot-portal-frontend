<template>

  <div id="app">
    <div class="nav" v-if="loggedIn">
        <div class="nav-title">Geomon IoT Portal</div>        
        <breadcrumb />

        <div v-if="loggedIn" class="nav-list dropdown">
          <font-awesome-icon class="icon" icon="chevron-down" size="1x" style="color:white"/>
          <div class="dropdown-content">
            <router-link :to="{ name: 'ManageInstallations' }" class="dp-container">Manage portal</router-link>
            <router-link :to="{ name: 'Informations' }" class="dp-container">Account settings</router-link>
            <router-link :to="{ name: 'Logout' }" class="dp-container">Logout</router-link>
          </div>
        </div>
        <div v-if="loggedIn" class="nav-list">
          <div class="user-info">
            <div>{{name}}</div>
            <div class="user-mail">{{mail}}</div>
          </div>
        </div>
        <div v-if="loggedIn" class="nav-list nav-logo">
          <router-link :to="{ name: 'home' }">
            <font-awesome-icon class="icon" icon="user-circle" size="3x" />
          </router-link>
        </div>
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
      name:'',
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
        this.name  = this.$store.getters.getName;
        this.mail = this.$store.getters.getMail;
    }
  }
}
</script>
