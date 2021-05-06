<template>
  <div style="width:800px; padding-right: 40px; padding-bottom: 40px;">
    <router-link style="text-decoration: none" :to="{ name: 'Overview', query: { id: id } }">
      <!-- <div class="station-infos">
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
            <img :src="'http://localhost:8080/storage/images/'+image_path" alt="" class="map-preview" width="230px" height="230px">
        </div>
      </div> -->

    <md-card md-with-hover>
      <md-ripple display style="display:flex; justify-content: space-between; align-items: center;">
        <div>
          <md-card-header>
            <div class="md-title" style="font-size: 40px; padding: 10px;">{{name}}</div>
            <div class="md-subhead" style="font-size: 30px; padding: 10px;">
              <div v-if="active == 1">
                <font-awesome-icon  icon="check-circle" style="color: green;"/>
                Active
              </div>
              <div v-else>
                <font-awesome-icon v-if="active == 0" icon="exclamation-circle" style="color: $primary-color;"/>
                Inactive
                 </div>
            </div>
          </md-card-header>
          <md-card-content>
              <div style="font-size: 20px; padding: 5px;">Installed rovers : {{nbRovers}} <br></div>
              <div style="font-size: 20px; padding: 5px;">Battery voltage : {{battery_voltage}} V <br></div>
              <div style="font-size: 20px; padding: 5px;">Available memory : {{available_memory}} MB <br></div>
              <div style="font-size: 20px; padding: 5px;">Last configuration : {{created_at | formatDate}} <br></div>
              <div style="font-size: 20px; padding: 5px;">Last communication : {{updated_at | formatDate}}</div>
          </md-card-content>
        </div>
        <div>
            <l-map style="height: 300px; width: 300px; margin: 20px" :zoom="zoom" :center="center">
            <l-tile-layer
            :url="url"
            :attribution="attribution"
            :options="{ maxNativeZoom: 18, maxZoom: 25 }"
            />
            </l-map>
        </div>
      </md-ripple>
    </md-card>
    </router-link>
  </div> 
</template>

<script>
import L from 'leaflet';
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';

export default {
  name : 'station-tile',
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
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
      'battery_voltage' : this.station.battery_voltage,
      'available_memory' : this.station.available_memory,
      'created_at' : this.station.created_at,
      'updated_at' : this.station.updated_at,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 11,
      center: [46.68002385,7.312523534]
    }
  }
}
</script>