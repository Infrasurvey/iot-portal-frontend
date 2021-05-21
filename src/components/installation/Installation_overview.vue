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
    <div v-if="isMounted">
      <l-map :zoom="zoom"
      :center="center"
      style="height: 500px; width: 100%"
      :maxZoom="maxZoom"> 
        <l-tile-layer
          :url="url"
          :attribution="attribution"
          :options="{ maxNativeZoom: 18, maxZoom: 25 }"
        />
        <l-marker 
            v-for="position in positions"
            :key="position.id"
            :lat-lng="position.pos">
            <l-popup :content="'Rover '+position.id+'<br>'+position.pos"/>
          </l-marker> 
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
  import { LMap, LTileLayer,LMarker, LPolyline,LPopup, LCircle, Vue2LeafletPolylineDecorator } from "vue2-leaflet";
  import SectionTitle from '../template/SectionTitle';

  export default {
    name: 'installation-overview',
    components: {
      BatteryStatus,
      LMap,
      LTileLayer,
      LPolyline,
      LPopup,
      LCircle,
      LMarker,
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
      isMounted : false,
      batteryDisplay : '',
      rovers : '',
      errorMessage: '',
      zoom: 11, 
      center: [46.68002385,7.312523534],
      positions:[],
      //https://wmts20.geo.admin.ch/1.0.0/ch.swisstopo.swissimage/default/current/3857/{z}/{x}/{y}.jpeg*/
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      tmp : '',
      maxZoom:25,
      options:{
        maxNativeZoom:19
      },
      patterns,
      }
      
    },
    async created(){
      await this.getInstallation()
      await this.getStation(this.$route.params.id)
      this.isMounted = true
    },
    methods: {
      getInstallation(){
        return API.get('/api/installation/'+this.installationId)
        .then(response => {
          this.installation =response.data;
          this.src = 'http://localhost:8080/storage/images/'+this.installation.image_path
        })
        .catch(e => {
        this.errorMessage = e
        })
      },
      getStation: function (installationId) {
      return API.get('/api/installation/'+installationId+'/basestation/roversPositions')
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
        this.center = [this.rovers[0].default_position.latitude,this.rovers[0].default_position.longitude]
       this.rovers.forEach(rover => {
         if(rover.default_position != null){
          this.positions.push({'id':rover.system_id, 'pos':[rover.default_position.latitude,rover.default_position.longitude]})

         }
        });
      }
    }
  }
</script>