<template>
    <div class="sub-nav-group">
        <span class="basic-link">Rover {{rover.system_id}}</span>
        <button class="dropdown-btn" :id="'dropdown-rover-'+rover.id">
            <font-awesome-icon icon="caret-down" size="2x" />
        </button>
      
        <div class="dropdown-container">
            <router-link class="basic-link" :to="{ name: 'RoverOverview', params: { roverid: rover.system_id } }">Overview</router-link>
            <router-link class="basic-link disabled" :to="{ name: 'RoverEvent', params: { roverid: rover.system_id }}">Events</router-link>
        </div>
    </div> 
</template>

<script>
import setDropdownListener from '../../assets/js/dropdown_sidenav'

export default {
    name: 'organization-item',
    props:{
      rover: {
          type: Object,
          required : true
      }
    },
    mounted(){
        setDropdownListener('dropdown-rover-'+this.rover.id)
    },
}
</script>