<template>
  <div style="width:720px; padding-right: 40px; padding-bottom: 40px;">
    <router-link style="text-decoration: none" :to="{ name: 'Overview', params: { id: id }}">
    <md-card md-with-hover>
      <md-ripple display style="display:flex; justify-content: space-between; align-items: center;">
        <div>
          <md-card-header>
            <div class="md-title" style="font-size: 40px; padding: 10px;">{{name}}</div>
            <div class="md-subhead" style="font-size: 25px; padding: 10px; padding-right:0;">
              <div v-if="active == true">
                <font-awesome-icon  icon="check-circle" style="color: green;"/>
                Active
              </div>
              <div v-else>
                <font-awesome-icon icon="exclamation-circle" style="color: red;"/>
                Inactive since {{ inactivityDays }} days.
                 </div>
            </div>
          </md-card-header>
          <md-card-content>
              <div style="font-size: 20px; padding: 5px;">Installed rovers : {{nbRovers}} <br></div>
              <div style="font-size: 20px; padding: 5px;">Battery voltage : {{battery_voltage}} V <br></div>
              <div style="font-size: 20px; padding: 5px;">Available memory : {{available_memory}} MB <br></div>
              <div style="font-size: 20px; padding: 5px;">Last configuration : {{last_configuration | formatDate}} <br></div>
              <div style="font-size: 20px; padding: 5px;">Last communication : {{last_communication | formatDate}}</div>
          </md-card-content>
        </div>
        <div>
            <l-map style="height: 270px; width: 270px; margin: 20px" :zoom="zoom" :center="center">
            <l-tile-layer  :url="url" :attribution="attribution" :options="{ maxNativeZoom: 18, maxZoom: 25 }"/>
            <l-marker :lat-lng="center" ></l-marker>
            </l-map>
        </div>
      </md-ripple>
    </md-card>
    </router-link>
  </div> 
</template>

<script>
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import { Icon } from 'leaflet';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
  name : 'station-card',
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
    // Check station activity
    var today = new Date();
    var today = Date.parse(today);
    var lastCommunication = Date.parse(this.station.last_communication);

    // Compute the difference
    var difference = today - lastCommunication;

    // Compute the number of day of inactivity
    this.inactivityDays = Math.round(difference / 1000  / (24 * 60 * 60));

    // Set active or inactive
    if (this.inactivityDays >= 7)
    {
      this.active = false;
    }

    // If null, set the station to the center of Switzerland
    if (this.center[0] == null)
    {
      this.center = [46.800663464, 8.222665776];
    }
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
      'last_configuration' : this.station.last_configuration,
      'last_communication' : this.station.last_communication,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 10,
      center: [this.station.latitude, this.station.longitude],
      active: true,
      inactivityDays: 0
    }
  }
}
</script>