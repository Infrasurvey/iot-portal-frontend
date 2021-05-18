<template>
  <nav class="sidenav-install">
    <ul class="sidenav-install-ul">
      <li>
        <input type="checkbox" id="btn"/>
        <label for="btn" class="show">
        <div class="nav-group">
          <span>Installation</span>
          <div class="sub-nav-group"><router-link class="basic-link" :to="{ name: 'Overview' }">Overview</router-link></div>
          <div class="sub-nav-group"><router-link class="basic-link" :to="{ name: 'Manage'}">Manage</router-link></div> 
          <div class="sub-nav-group"><router-link class="basic-link disabled" :to="{ name: 'Event'}">Event log</router-link></div> 
        </div>
        <div class="nav-group">
          <span>Base station</span>
          <div class="sub-nav-group"><router-link class="basic-link" :to="{ name: 'OverviewStation' }">Overview</router-link></div>
          <div class="sub-nav-group"><router-link class="basic-link" :to="{ name: 'ConfigurationStation' }">Configuration</router-link></div> 
        </div>
        <div class="nav-group">
          <span>Rovers</span>
          <button class="dropdown-btn" id="dropdown-rover-main">
            <font-awesome-icon icon="caret-down" size="2x" />
          </button>
          <div class="dropdown-container">
            <rover-item v-for="rover in rovers" :key="rover.id" :rover="rover" @updateList="getRovers"/>
          </div>
        </div> 
        </label>
      </li>
    </ul>
  </nav>
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
    setDropdownListener('dropdown-rover-main')
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