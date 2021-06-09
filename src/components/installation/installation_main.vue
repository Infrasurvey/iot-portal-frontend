<template>
  <div style="display: flex; ">
    <sidenav-installation style="max-width: 300px; min-width: 300px; background-color: #EEEEEE;" :installationId="installationId"></sidenav-installation>
    <router-view  style="width: calc(100% - 300px); height: 100vh"></router-view>
  </div>
</template>

<script>
import Sidenav from '../template/Sidenav'

export default {
  name: 'manage-main',
  components: {
    'sidenav-installation' : Sidenav
  },
  data(){
    return {
      installationId : this.$route.params.id.toString()
    }
  },
  watch: {
    $route(to, from) {
      this.installationId = this.$route.params.id.toString()
      }
  },
  beforeRouteUpdate(to, from, next) {
    var ability = this.$store.getters.getAbility;
    if(ability.can('manage_install',to.params.id.toString()) || ability.can('read_install',to.params.id.toString()) || ability.can('manage','all'))
    {
      next()
    }
    else{
      next({
        name: 'home',
      })
    }
    },
}
</script>