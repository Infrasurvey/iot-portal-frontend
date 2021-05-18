<template>
  <div style="display:flex">
      <sidenav-manage></sidenav-manage>
      <router-view></router-view>
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