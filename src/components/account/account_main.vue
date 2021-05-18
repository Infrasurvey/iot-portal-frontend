<template>
  <div style="display:flex;">
    <sidenav></sidenav>
    <router-view></router-view>
  </div>
</template>

<script>
import Sidenav from './account_sidenav'

export default {
  name: 'AccountMain',
  components: {
    Sidenav
  }
}
</script>