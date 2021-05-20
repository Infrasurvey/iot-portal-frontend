<template>
  <div style="padding: 20px;">
    <div style="font-weight: bold; margin-bottom: 10px;">Installation</div>
    <md-list style="background-color: inherit;">
      <md-list-item :to="{ name: 'Overview' }">Overview</md-list-item>
      <md-list-item :to="{ name: 'Manage'}">Manage</md-list-item>
      <md-list-item class="disabled" :to="{ name: 'Event'}">Event log</md-list-item>
    </md-list>

    <div style="font-weight: bold; margin-bottom: 10px; margin-top: 10px;">Base station</div>
    <md-list style="background-color: inherit;">
      <md-list-item :to="{ name: 'OverviewStation'}">Overview</md-list-item>
      <md-list-item :to="{ name: 'ConfigurationStation'}">Configuration</md-list-item>
    </md-list>

    <div style="font-weight: bold; margin-bottom: 10px; margin-top: 10px;">Rovers</div>
    <md-list style="background-color: inherit;">
      <rover-item v-for="rover in rovers" :key="rover.system_id" :rover="rover" @updateList="getRovers"/>
    </md-list>
  </div>
</template>

<script>
import API from '../../http-constants'
import RoverItem from '../installation/sidenav_rover_element' 
import setDropdownListener from '../../assets/js/dropdown_sidenav'

export default {
  name: 'sidenav-installation',
  props:{
   installationId: {
     type: String,
     required : true
   }
  },
  components : {
    'rover-item':RoverItem,
  },
  data(){
    return{
      rovers : [],
      basestation : ''
    }
  },
  async created(){
    this.getRovers()
  },
  mounted(){
    //setDropdownListener('dropdown-rover-main')
  },
  methods:{
    getRovers(){
      API.get('/api/installation/'+this.installationId+'/basestation/rovers')
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