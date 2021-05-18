<template>
<div class="" >
    <div class="flex-container">
      <div class="rover-overview-panel">
          <h3>Latest data overview</h3>
          Date : {{rover.last_communication | formatDate}} <br>
          Easting : {{latestConvertedPosition.Easting }}m <br>
          Northing : {{latestConvertedPosition.Northing }}m <br>
          Elevation : {{latestConvertedPosition.altitude }}m <br>
          Battery voltage : {{rover.battery_voltage}}V
          <h3>Total travaled distance</h3>
          Easting distance : {{(latestConvertedPosition.Easting - firstConvertedPosition.Easting).toPrecision(2)}}m<br>
          Northing distance : {{(latestConvertedPosition.Northing - firstConvertedPosition.Northing).toPrecision(2)}}m <br>
          Elevation distance : {{(latestConvertedPosition.altitude - firstConvertedPosition.altitude).toPrecision(2)}}m  <br>
          3D distance : {{d3Distance}}m
      </div>
      <div class="rover-inclination-panel">
        <inclination-component v-if="isMounted" :inclination="inclination"></inclination-component>
        <div class="b-r-container">
            <font-awesome-icon class="b-image" v-if="rover.battery_voltage < 10" icon="battery-empty" size="3x" rotation="270" />
            <font-awesome-icon class="b-image" v-else-if="rover.battery_voltage < 12" icon="battery-quarter" size="3x" rotation="270"/>
            <font-awesome-icon class="b-image" v-else-if="rover.battery_voltage < 13" icon="battery-half" size="3x" rotation="270"/>
            <font-awesome-icon class="b-image" v-else-if="rover.battery_voltage < 14" icon="battery-three-quarters" size="3x" rotation="270"/>
            <font-awesome-icon class="b-image" v-else icon="battery-full" size="3x" rotation="270" />
            <div class="battery-value">{{rover.battery_voltage}} V</div> 
        </div>
      </div>
      <div class="rover-map-panel">
        <map-component :positions="positions"></map-component>
      </div>
    </div>
    <div>
      <section-title title= "Plots settings"></section-title>
      <div class="flex-container settings">
        <div class="flex-container">
          <div class="setting-date">
            <label for="start_date">Start date</label>
            <input type="date" id="start_date" name="start_date" v-model="startDate">
          </div>
          <div class="setting-date">
            <label for="end_date">End date</label>
            <input type="date" id="end_date" name="end_date" v-model="endDate">
          </div>
        </div>
        <div class="flex-container setting-filter">
          <input type="checkbox" name="enable-low-pass" id="enable-low-pass" v-model="enable_low_pass">
          <label for="enable-low-pass">Enable low-pass filtering</label>
          <input type="range" name="low-pass" id="low-pass" :disabled="!enable_low_pass">
        </div>
        <div class="flex-container setting-filter">
          <input type="checkbox" name="enable-outlier" id="enable-outlier" v-model="enable_outlier">
          <label for="enable-outlier">Enable outlier filtering</label>
          <input type="range" name="outlier" id="outlier" :disabled="!enable_outlier">
        </div>
        
        
      </div>
      <div class="flex-container">
          <button class="setting-btn" @click="processPlot">Apply and plot</button>
          <button class="setting-btn">Download raw data as CSV</button>
          <button class="setting-btn">Download filtered data as CSV</button>
      </div>
      
      
    </div>
    <div>
      <section-title title= "Plots"></section-title>
      <div>
        <div>
          <h4>Easting</h4>
          <plot class="plot" v-if="isMounted" :height="150" :chart-data="eastings"></plot>
        </div>
        <div>
          <h4>Northing</h4>
          <plot class="plot" v-if="isMounted" :height="150" :chart-data="northings"></plot>
        </div>
        <div>
          <h4>Elevation</h4>
          <plot class="plot" v-if="isMounted" :height="150" :chart-data="altitudes"></plot>
        </div>
        <div>
          <h4>Battery</h4>
          <plot class="plot" v-if="isMounted" :height="150" :chart-data="batteries"></plot>
        </div>
        <div>
          Plot 1
        </div>

      </div>
    </div>
</div>
</template>

<script>
    import API from '../../http-constants'
    import InclinationComponent from './inclination-component'
    import MapComponent from './map-component'
    import Plot from './plot'
    import moment from 'moment';
    import SectionTitle from '../template/SectionTitle';
export default {
  
  name: 'rover-overview',
  components :{
    'inclination-component':InclinationComponent,
    'map-component': MapComponent,
    'plot' : Plot,
    SectionTitle
  },
  data(){
    return{
      installationId : this.$route.params.id,
      roverId : this.$route.params.roverid,
      isMounted : false,
      rover : '',
      startDate : '2015-01-01',
      endDate : moment().format('YYYY-MM-DD'),
      positions : [],
      convertedPositions :[],
      latestConvertedPosition : '',
      firstConvertedPosition : '',
      d3Distance :0,
      inclination : [],
      eastings : {
        labels :[],
        datasets : []
      },
      northings : {
        labels :[],
        datasets : []
      },
      altitudes: {
        labels :[],
        datasets : []
      },
      batteries : {
        labels :[],
        datasets : []
      },
      measure_rovers : '',
      measure_devices : [],
      enable_low_pass : false,
      enable_outlier : false


    }
  },
  async created(){
    await this.getRover()
    this.isMounted = true
  },
  methods : {
      processPlot(){
        this.processData()
      },
      getRover(){
          return API.get('/api/installation/'+this.installationId+'/basestation/rovers/'+this.roverId)
          .then(response => {
              this.rover =response.data;
              this.positions = this.rover.positions
              this.measure_rovers = this.rover.measure_rovers
              this.measure_devices = this.rover.device.measure_devices
              this.processData()
          })
          .catch(e => {
              this.errorMessage = e
              
          })
      },
      processData(){
        var utmObj = require('utm-latlng');
        var utm=new utmObj();
        var easts = []
        var norths = []
        var altis = []
        var dates = []
        var i =1

        this.positions.forEach(position => {
          var date = moment(position.date)
          if(moment(this.startDate) < date && date < moment(this.endDate)){
            var tmp = utm.convertLatLngToUtm(position.latitude, position.longitude,2);
            tmp.altitude = position.height      
            tmp.date = position.date  
            this.convertedPositions.push(tmp)

           dates.push(moment(position.date).format('MM.DD.YYYY'))
           //dates.push(i)
           i +=1
            easts.push(Number(tmp.Easting))
            norths.push(Number(tmp.Northing))
            altis.push(Number(tmp.altitude))
          }
        });
        this.eastings = {'labels' : dates,'datasets': [{'label':'Easting', 'data' : easts,'backgroundColor':'rgba(229, 57, 53, 0.51)'}]}
        this.northings = {'labels' : dates,'datasets': [{'label':'Northing', 'data' : norths,'backgroundColor':'rgba(229, 57, 53, 0.51)'}]}
        this.altitudes = {'labels' : dates,'datasets': [{'label':'Elevation', 'data' : altis,'backgroundColor':'rgba(229, 57, 53, 0.51)'}]}

        this.latestConvertedPosition = this.convertedPositions.slice(-1)[0]
        this.firstConvertedPosition = this.convertedPositions[0]
        this.d3Distance = Math.sqrt(Math.pow(this.latestConvertedPosition.Easting - this.firstConvertedPosition.Easting,2) 
          + Math.pow(this.latestConvertedPosition.Northing - this.firstConvertedPosition.Northing,2)
          + Math.pow(this.latestConvertedPosition.altitude - this.firstConvertedPosition.altitude,2)).toPrecision(2)
        this.normalize()

        var bats = []
        dates = []
        this.measure_devices.forEach(measure_device => {
          var date = moment(measure_device.date)
          if(moment(this.startDate) < date && date < moment(this.endDate)){
            dates.push(moment(measure_device.date).format('MM.DD.YYYY'))
            bats.push(measure_device.battery_voltage)
          }
          
        });
        this.batteries = {'labels' : dates,'datasets': [{'label':'Easting', 'data' : bats,'backgroundColor':'rgba(229, 57, 53, 0.51)'}]}
      },
      normalize(){
        var x = this.latestConvertedPosition.Easting
        var y = this.latestConvertedPosition.Northing
        var z = this.latestConvertedPosition.altitude
        var n = Math.sqrt(Math.pow(x,2) + Math.pow(y,2) + Math.pow(z,2))
        this.inclination.push(x / n).toPrecision(2)
        this.inclination.push(y / n).toPrecision(2)
        this.inclination.push(z / n).toPrecision(2)
      }
  }
}
</script>