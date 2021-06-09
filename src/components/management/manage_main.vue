<template>
  <div style="display: flex;">
    <sidenav-manage v-if="isMounted" @updateList="getOrganizations" :organizations="organizations" style="max-width: 300px; min-width: 300px; background-color: #EEEEEE;"></sidenav-manage>
    <router-view v-if="isMounted"  @updateList="getOrganizations" style="width: calc(100% - 300px); height: 100%; padding: 20px;"></router-view>
  </div>
</template>

<script>
import ManageSidenav from './manage_sidenav'
import API from '../../http-constants'

export default {
  name: 'manage-main',
  components: {
    'sidenav-manage' : ManageSidenav
  },
  data(){
    return {
      organizations : [],
      isMounted: false
      }
  },
  async created(){
    await this.getOrganizations()
    this.isMounted = true
  },
  methods : {
    getOrganizations(){
      return API.get('/api/getCurrentVisibleOrganizations')
      .then(response => {
        this.organizations =response.data        
      })
      .catch(e => {
        this.errorMessage = e
      })
    },
  }
}
</script>