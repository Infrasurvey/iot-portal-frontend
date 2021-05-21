<template>
  <div style="display: flex; height: calc(100vh - 80px);">
    <sidenav style="max-width: 300px; min-width: 300px; height: 100%; background-color: #EEEEEE;"></sidenav>
    <router-view style="width: calc(100% - 300px); height: 100%; padding: 20px;"></router-view>
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