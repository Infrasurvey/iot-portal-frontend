<template>
  <div style="display: flex;">
    <sidenav-installation :installationId="this.$route.params.id.toString()"></sidenav-installation>
    <router-view></router-view>
  </div>
</template>

<script>
import Sidenav from '../template/Sidenav'

export default {
  name: 'manage-main',
  components: {
    'sidenav-installation' : Sidenav
  }
}
</script>