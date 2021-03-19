<template>

  <div id="app">
    <div class="nav">
        <div class="nav-title">Geomon IoT Portal</div>        
        <breadcrumb />
        <div v-if="loggedIn" class="nav-list"><router-link :to="{ name: 'home' }">Home</router-link></div>
        <div v-if="loggedIn" class="nav-list"><router-link :to="{ name: 'Logout' }">Logout</router-link></div>
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
