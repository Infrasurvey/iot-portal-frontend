<template>
  <div class="main-install overview-inst">
    <section-title v-if="isMounted" :title="installation.name +' installation'"></section-title>
    <div class="flex-container overview">
      <div class="overview-container md-elevation-3">
      <img :src="src" alt="" width="230px" height="230px">
      </div>
      <div class="overview-container overview-text">
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
      <battery-status v-for="battery in batteryDisplay" :key="battery.system_id" :battery="battery"> </battery-status>
    </div>

    <section-title title = "Rovers positions"></section-title>
    <div v-if="isMounted" class="rovers-map">
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
    <div class="bottom"></div>
  </div>
</template>
  
<script>
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
    watch: {
        async $route(to, from) {
          this.isMounted = false
          this.installationId = to.params.id.toString()
          this.positions =[],
          await this.getInstallation()
          await this.getStation(to.params.id)
          this.isMounted = true
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
          let baseURL
          if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            baseURL = 'http://localhost:8080/'
          } else {
            baseURL = 'http://geomon-iot.ch:8080/'
          }
          this.src = baseURL+'storage/images/'+this.image_path
        })
        .catch(e => {
        this.errorMessage = e
        })
      },
      getStation: function (installationId) {
      return API.get('/api/installation/'+installationId+'/basestation/roversPositions')
        .then(response => {
          this.station =response.data[0];
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