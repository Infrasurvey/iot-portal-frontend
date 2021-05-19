<template>
  <div style="display: flex;">
    <sidenav-manage style="max-width: 300px; min-width: 300px; height: 100vh; border-right: 1px solid #EEEEEE;"></sidenav-manage>
    <router-view style="width: calc(100% - 300px); height: 100vh"></router-view>
  </div>
</template>

<script>
import ManageSidenav from './manage_sidenav'

export default {
  name: 'manage-main',
  components: {
    'sidenav-manage' : ManageSidenav
  }
}
</script>