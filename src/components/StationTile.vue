<template>
<router-link class="basic-link station-tile" :to="{ name: 'Overview', query: { id: id } }">
        <div class="station-infos">
            <h3> {{name}}</h3>
            <div class="station-details">
                <div v-if="active == 1">
                <font-awesome-icon  icon="check-circle" style="color: green;"/>
                Active
                </div>
                <div v-else>
                <font-awesome-icon v-if="active == 0" icon="exclamation-circle" style="color: $primary-color;"/>
                Inactive
                </div>
                Installed rovers : {{nbRovers}} <br>
                Battery voltage : {{battery_voltage}} V <br>
                Available memory : {{available_memory}} MB <br>
                Created : {{created_at | formatDate}} <br>
                Updated : {{updated_at | formatDate}}
            </div>
        </div>
        <div class="map-preview-container">
            <div>
                <img src="../images/tmp_map.png" alt="" class="map-preview" width="230px" height="230px">
            </div>
        </div>
    </router-link> 
    
</template>

<script>
//            <img src="../images/tmp_map.png" alt="" class="map-preview" width="200px" height="200px">

export default {
  name : 'station-tile',
  props:{
      station: {
          type: Object,
          required : true
      }
  },
  created(){
        console.log(this.station);
  },
  data () {
     return {
      'id': this.station.id,
      'name': this.station.name,
      'active':this.station.active,
      'image_path':this.station.image_path,
      'nbRovers' : this.station.device_rover_count,
      'battery_voltage' : this.station.last_battery_voltage,
      'available_memory' : this.station.available_memory,
      'created_at' : this.station.created_at,
      'updated_at' : this.station.updated_at
    }
  }
}
</script>