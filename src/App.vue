<template>
  <div id="app">
    <ul class="nav">
      <li><router-link :to="{ name: 'home' }">Home</router-link></li>
      <li v-if="!loggedIn"><router-link :to="{ name: 'Login' }">Login</router-link></li>
      <li v-if="!loggedIn"><router-link :to="{ name: 'Register' }">Register</router-link></li>
      <li v-if="loggedIn"><router-link :to="{ name: 'Logout' }">Logout</router-link></li>

    </ul>

    <router-view></router-view>
  </div>
</template>

<script>

export default {
    name: 'App'
,
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn
    }
  }
}
</script>