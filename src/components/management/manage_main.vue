<template>
  <div style="display: flex; height: calc(100vh - 80px);">
    <sidenav-manage style="max-width: 300px; min-width: 300px; height: 100%; background-color: #EEEEEE;"></sidenav-manage>
    <router-view style="width: calc(100% - 300px); height: 100%; padding: 20px;"></router-view>
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