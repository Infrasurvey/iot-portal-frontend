<template>
    <div class="station-tile">
        <div class="station-infos">
            <h3>{{name}}</h3>
            <p class="station-details">
                Installed rovers : {{nbRovers}} <br>
                Battery voltage : {{battery_voltage}} V <br>
                Available memory : {{available_memory}} MB <br>
                Created : {{created_at | formatDate}} <br>
                Updated : {{updated_at | formatDate}}
            </p>
        </div>
        <div class="map-preview-container">
            <img src="../images/tmp_map.png" alt="" class="map-preview" width="200px" height="200px">
        </div>
        
    </div>
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
  data () {
     return {
      'id': this.station.id,
      'name': this.station.name,
      'nbRovers' : this.station.device_rover_count,
      'battery_voltage' : this.station.last_battery_voltage,
      'available_memory' : this.station.device.available_memory,
      'created_at' : this.station.created_at,
      'updated_at' : this.station.updated_at,
      'measure_devices' : this.station.device.measure_devices
    }
  }
}
</script>