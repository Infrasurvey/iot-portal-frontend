<template>
  <div>
    <section-title title= "TOTO"></section-title>
    <div class="flex-container overview">
      <div class="overview-container">
      <img :src="src" alt="" width="230px" height="230px">
      </div>
      <div class="overview-container">
        <div>
          Installed rovers : {{installation.device_rover_count}}
        </div>
        <div>
          Battery voltage : {{installation.battery_voltage}}V
        </div>
        <div>
          Available memory : {{installation.available_memory}}MB
        </div>
        <div>
          Last configuration : {{installation.last_configuration | formatDate}}
        </div>
        <div>
          Last communication : {{installation.last_communication | formatDate}}
        </div>
      </div>
    </div>
    
    <section-title title = "Battery state"></section-title>
    <div class="flex-container batteries">
      <battery-status v-for="battery in batteryDisplay" :key="battery.id" :battery="battery"> </battery-status>
    </div>

    <section-title title = "Landslide evolution"></section-title>
    <div>
      <l-map :zoom="zoom"
      :center="center"
      style="height: 500px; width: 100%"
      :maxZoom="maxZoom"> 
        <l-tile-layer
          :url="url"
          :attribution="attribution"
          :options="{ maxNativeZoom: 18, maxZoom: 25 }"
        />
        <l-polyline 
          v-for="polyline in polylines"
          :key="polyline.key"
          :lat-lngs="polyline"
          color="#AB000D"
        />
      </l-map>
    </div>
  </div>
</template>
  
<script>
  //<polyline-decorator v-for="polyline in polylines" :key="polyline.key" :paths="[polyline]" :patterns="patterns"></polyline-decorator>
  //https://developers.google.com/maps/documentation/javascript/examples/polyline-simple
  //https://developers.google.com/maps/documentation/javascript/examples/overlay-symbol-arrow
  // https://docs.mapbox.com/mapbox.js/example/v1.0.0/dynamically-drawing-a-line/
  // https://developer.here.com/documentation/examples/maps-js/geoshapes/polyline-on-the-map
  import BatteryStatus from './battery_status'
  import API from '../../http-constants'
  import L from "leaflet";
  import { LMap, LTileLayer, LPolyline, LCircle, Vue2LeafletPolylineDecorator } from "vue2-leaflet";
  import SectionTitle from '../template/SectionTitle';

  export default {
    name: 'installation-overview',
    components: {
      BatteryStatus,
      LMap,
      LTileLayer,
      LPolyline,
      LCircle,
      SectionTitle
    },
    data () {
          let patterns = [
        {offset: '100%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 30, pathOptions: {color: '#AB000D'}})}
      ]
      return {
      installationId : this.$route.params.id.toString(),
      installation:'',
      station: '',
      src : '',
      batteryDisplay : '',
      rovers : '',
      errorMessage: '',
      zoom: 11, 
      center: [46.68002385,7.312523534],
      polylines:[],
      /*
      polyline: {
        latlngs: [
        [47.334852, -1.509485],
        [47.342596, -1.328731],
        [47.241487, -1.190568],
        [47.234787, -1.358337]
        ],
        color: "#AB000D"
      },*/
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      
      maxZoom:25,
      options:{
        maxNativeZoom:19
      },
      patterns,
      }
      
    },
    created(){
      this.getInstallation()
      this.getStation(this.$route.params.id)
    },
    methods: {
      getInstallation(){
        API.get('/api/installation/'+this.installationId)
        .then(response => {
          this.installation =response.data;
          this.src = 'http://localhost:8080/storage/images/'+this.installation.image_path
        })
        .catch(e => {
        this.errorMessage = e
        })
      },
      getStation: function (installationId) {
      API.get('/api/device/basestation/'+installationId+'/rovers')
        .then(response => {
          this.station =response.data;
          this.rovers = this.station.rovers
          this.batteryDisplay = [{'system_id':this.station.name,'battery_voltage':this.station.battery_voltage,'is_basestation':true}]
          this.batteryDisplay = this.batteryDisplay.concat(this.rovers)
          
          this.createMapOverlay()
        })
        .catch(e => {
        this.errorMessage = e
        })
      },
      createMapOverlay(){
        this.rovers.forEach(rover => {
          console.log(rover)
          var polyline = []
          //polyline.push([rover.coordinate_x,coordinate_y])
          /*rover.positions.forEach(position=>{
            polyline.push([position.latitude,position.longitude])
          })*/
          polyline.push([rover.positions[0].latitude,rover.positions[0].longitude])
          polyline.push([rover.positions[rover.positions.length-1].latitude,rover.positions[rover.positions.length-1].longitude])

          this.polylines.push(polyline)
        });
      }
    }
  }
</script>