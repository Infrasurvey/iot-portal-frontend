<template>
    <div class="sub-nav-group">
        <span class="basic-link">{{rover.unique_id}}</span>
        <button class="dropdown-btn" :id="'dropdown-rover-'+rover.id">
            <font-awesome-icon icon="caret-down" size="2x" />
        </button>
      
        <div class="dropdown-container">
            <router-link class="basic-link" :to="{ name: 'RoverOverview', query: { id: rover.id } }">Overview</router-link>
            <router-link class="basic-link" :to="{ name: 'RoverEvent', query: { id: rover.id }}">Events</router-link>
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