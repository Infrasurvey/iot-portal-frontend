<template>

  <div id="app">
    <div class="nav">
        <div class="nav-title"> Geomon IoT Portal</div>        
        <breadcrumb />

        <div class="nav-list dropdown">
          <font-awesome-icon class="icon" icon="chevron-down" size="1x" style="color:white"/>
          <div class="dropdown-content">
            <div class="dp-container"><router-link :to="{ name: 'settings' }">Manage portal</router-link></div>
            <div class="dp-container"><router-link :to="{ name: 'account' }">Account settings</router-link></div>
            <div v-if="loggedIn" class="dp-container"><router-link :to="{ name: 'Logout' }">Logout</router-link></div>
          </div>
        </div>
        <div v-if="loggedIn" class="nav-list nav-logo">
          <router-link :to="{ name: 'home' }">
            <font-awesome-icon class="icon" icon="user-circle" size="3x" />
          </router-link>
        </div>
        
    </div>
    

    <router-view></router-view>
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
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn
    }
  }
}
</script>
