<template>
<div class="main-install overview-inst"> 
    <div class="spinner-container">
      <vue-simple-spinner v-if="!this.isMounted" class="spinner" size="large" line-fg-color="#AB000D" :spacing="55" message="Loading..."></vue-simple-spinner>
    </div>
    <div v-if="isMounted" :class="loadClass" class="flex-container">
      <div class="rover-overview-panel">
          <h3>Latest data overview</h3>
          Date : {{rover.last_communication | formatDate}} <br>
          Easting : {{latestConvertedPosition.Easting}}m <br>
          Northing : {{latestConvertedPosition.Northing }}m <br>
          Elevation : {{latestConvertedPosition.altitude }}m <br>
          Battery voltage : {{rover.battery_voltage}}V
          <h3>Total traveled distance</h3>
          Easting distance : {{(latestConvertedPosition.Easting - firstConvertedPosition.Easting).toPrecision(2)}}m<br>
          Northing distance : {{(latestConvertedPosition.Northing - firstConvertedPosition.Northing).toPrecision(2)}}m <br>
          Elevation distance : {{(latestConvertedPosition.altitude - firstConvertedPosition.altitude).toPrecision(2)}}m  <br>
          3D distance : {{d3Distance}}m
      </div>
      <div class="rover-inclination-panel">
        <inclination-component @displayStatus="displayStatus" v-if="isMounted" :inclination="inclination"></inclination-component>
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
    <div v-if="isMounted" :class="loadClass">
      <section-title title= "Plots settings"></section-title>
      <div class="flex-container settings">
        <div class="flex-container">
          <div class="setting-date">
            <md-datepicker id="start_date" name="start_date" v-model="startDate">
              <label>Select start date</label>
            </md-datepicker>
          </div>
          <div class="setting-date">
            <md-datepicker id="end_date" name="end_date" v-model="endDate">
              <label>Select end date</label>
            </md-datepicker>
          </div>
        </div>
        <div class="flex-settings">
            <div class="flex-setting-filter">
            <md-checkbox name="enable-low-pass" id="enable-low-pass" v-model="enable_low_pass">Enable low-pass filtering</md-checkbox>
            <vue-material-slider name="low-pass" id="low-pass" :min="0" :max="100" :thumbLabel="true" :disabled="!enable_low_pass"/>
          </div>
          <div class="flex-setting-filter">
            <md-checkbox name="enable-outlier" id="enable-outlier" v-model="enable_outlier">Enable outlier filtering</md-checkbox>
            <vue-material-slider name="outlier" id="outlier"  :min="0" :max="100" :thumbLabel="true" :disabled="!enable_outlier"/>
          </div>
        </div>
      </div>
      <div class="flex-container">
          <button class="setting-btn apply-btn" @click="processPlot">Apply and plot</button>
          <button class="setting-btn apply-btn">Download raw data as CSV</button>
          <button class="setting-btn apply-btn">Download filtered data as CSV</button>
      </div>
      
      
    </div>
    <div v-if="isMounted" :class="loadClass">
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
    <FlashMessage></FlashMessage>
</div>
</template>

<script>
    import API from '../../http-constants'
    import InclinationComponent from './inclination-component'
    import MapComponent from './map-component'
    import Plot from './plot'
    import moment from 'moment';
    import SectionTitle from '../template/SectionTitle';
    import Spinner from 'vue-simple-spinner'

export default {
  
  name: 'rover-overview',
  components :{
    'inclination-component':InclinationComponent,
    'map-component': MapComponent,
    'plot' : Plot,
    SectionTitle,
    'vue-simple-spinner' : Spinner,
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
      enable_outlier : false,
      loadClass : 'grayed'


    }
  },
  async created(){
    await this.getRover()
    this.loadClass = ''
    this.isMounted = true
  },
  watch: {
    async $route(to, from) {
      this.installationId = this.$route.params.id
      this.roverId = this.$route.params.roverid,
      this.isMounted = false
      this.resetData()
      await this.getRover()
      this.loadClass = ''
      this.isMounted = true
    }
  },
  methods : {
      resetData(){
        this.rover = '',
        this.positions = [],
        this.convertedPositions =[],
        this.latestConvertedPosition = '',
        this.firstConvertedPosition = '',
        this.d3Distance =0,
        this.inclination = [],
        this.eastings = {
          labels :[],
          datasets : []
        },
        this.northings = {
          labels :[],
          datasets : []
        },
        this.altitudes= {
          labels :[],
          datasets : []
        },
        this.batteries = {
          labels :[],
          datasets : []
        },
        this.measure_rovers = '',
        this.measure_devices = []
      },
      processPlot(){
        this.processData()
      },
      getRover(){
          return API.get('/api/installation/'+this.installationId+'/basestation/rovers/'+this.roverId)
          .then(response => {
              this.rover =response.data;
              this.positions = this.rover.r_positions
              this.measure_rovers = this.rover.r_measure_rovers
              this.measure_devices = this.rover.r_measure_devices
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
        if(this.positions.length > 0){
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
            this.eastings = {'labels' : dates,'datasets': [{'label':'Easting','fill':false, 'data' : easts,'borderColor':'rgba(229, 57, 53, 0.51)'}]}
            this.northings = {'labels' : dates,'datasets': [{'label':'Northing','fill':false, 'data' : norths,'borderColor':'rgba(229, 57, 53, 0.51)'}]}
            this.altitudes = {'labels' : dates,'datasets': [{'label':'Elevation','fill':false, 'data' : altis,'borderColor':'rgba(229, 57, 53, 0.51)'}]}

            this.latestConvertedPosition = this.convertedPositions.slice(-1)[0]
            this.firstConvertedPosition = this.convertedPositions[0]
            this.d3Distance = Math.sqrt(Math.pow(this.latestConvertedPosition.Easting - this.firstConvertedPosition.Easting,2) 
              + Math.pow(this.latestConvertedPosition.Northing - this.firstConvertedPosition.Northing,2)
              + Math.pow(this.latestConvertedPosition.altitude - this.firstConvertedPosition.altitude,2)).toPrecision(2)
            
        }
        else{
          this.displayStatus("Unable to display data overview and map")
        }
        if(this.measure_rovers.length > 0){
            this.setInclination()}
        else{
            this.displayStatus("Unable to display inclination axis system")
        }

        var bats = []
        dates = []
        if(this.measure_devices.length > 0){
          this.measure_devices.forEach(measure_device => {
            var date = moment(measure_device.date)
            if(moment(this.startDate) < date && date < moment(this.endDate)){
              dates.push(moment(measure_device.date).format('MM.DD.YYYY'))
              bats.push(measure_device.battery_voltage)
            }
            
          });
          this.batteries = {'labels' : dates,'datasets': [{'label':'Easting', 'data' : bats,'fill':false,'borderColor':'rgba(229, 57, 53, 0.51)'}]}
        }else{
          this.displayStatus("Unable to display battery voltage")
        }
      },
      setInclination(){
        var latestMeasureRover = this.measure_rovers.slice(-1)[0]
        var x = latestMeasureRover.raw_acceleration_x
        var z = latestMeasureRover.raw_acceleration_z 
        var y = latestMeasureRover.raw_acceleration_y 
        if(x != null && y != null && z != null){
          var n = Math.sqrt(Math.pow(x,2) + Math.pow(y,2) + Math.pow(z,2))
          console.log(x)
          console.log(y)
          console.log(z)
          this.inclination.push((x / n).toPrecision(2))
          this.inclination.push(-(y / n).toPrecision(2))
          this.inclination.push((z / n).toPrecision(2))
        }

      },
      downloadCSVData() {
        this.processData()
        let csv = 'Put,Column,Titles,Here\n';
        this.csvdata.forEach((row) => {
                csv += row.join(',');
                csv += "\n";
        });
    
        const anchor = document.createElement('a');
        anchor.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
        anchor.target = '_blank';
        anchor.download = 'nameYourFileHere.csv';
        anchor.click();
      },
      displayStatus(message){
         this.flashMessage.setStrategy('multiple');
        this.flashMessage.show({status: 'error', title: 'Missing data', message: message,clickable:true})
      },
  }
}
</script>