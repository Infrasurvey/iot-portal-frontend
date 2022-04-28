<template>
  <div style="display: flex; ">
    <sidenav-installation style="max-width: 300px; min-width: 300px; background-color: #EEEEEE;" :installationId="installationId" :rovers="rovers"></sidenav-installation>
    <router-view  style="width: calc(100% - 300px); height: calc(100vh - 80px);"></router-view>
  </div>
</template>

<script>
import API from '../../http-constants'
import Sidenav from '../template/Sidenav'

export default {
  name: 'installation-main',
  components: {
    'sidenav-installation' : Sidenav
  },
  data(){
    return {
      installationId : this.$route.params.id.toString(),
      rovers : []
    }
  },
  watch: {
    async $route(to, from) {
      this.installationId = this.$route.params.id.toString()
      this.getRovers()
    }
  },
  async created(){
    this.getRovers()
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
  methods:{
    getRovers(){
      API.get('/api/installation/'+this.installationId+'/basestation/rover/active')
      .then(response => {
        this.rovers =response.data
      })
      .catch(e => {
        this.errorMessage = e
      })
    }
  }
}
</script>