<template>
  <div id="app">
    <ul v-if="loggedIn" class="nav">
      <li><router-link :to="{ name: 'home' }">Home</router-link></li>
      <li><router-link :to="{ name: 'Logout' }">Logout</router-link></li>

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
