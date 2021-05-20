<template>
  <div style="display: flex;">
    <sidenav style="max-width: 300px; min-width: 300px; height: 100vh; background-color: #EEEEEE;"></sidenav>
    <router-view style="width: calc(100% - 300px); height: 100vh"></router-view>
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