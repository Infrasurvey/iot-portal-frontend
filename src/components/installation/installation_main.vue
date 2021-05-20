<template>
  <div style="display: flex;">
    <sidenav-installation style="max-width: 300px; min-width: 300px; height: 100vh; background-color: #EEEEEE;" :installationId="this.$route.params.id.toString()"></sidenav-installation>
    <router-view style="width: calc(100% - 300px); height: 100vh"></router-view>
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