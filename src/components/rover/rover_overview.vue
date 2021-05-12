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
          3D distance : 
      </div>
      <div class="rover-inclination-panel">
        <inclination-component></inclination-component>
      </div>
      <div class="rover-map-panel">
        <map-component :positions="positions"></map-component>
      </div>
    </div>
    <div>
      <h2>Plot settings</h2>
      <div class="flex-container settings">
        <div class="flex-container">
          <div class="setting-date">
            <label for="start_date">Start date</label>
            <input type="date" id="start_date" name="start_date">
          </div>
          <div class="setting-date">
            <label for="end_date">End date</label>
            <input type="date" id="end_date" name="end_date">
          </div>
        </div>
        <div class="flex-container setting-filter">
          <input type="checkbox" name="enable-low-pass" id="enable-low-pass">
          <label for="enable-low-pass">Enable low-pass filtering</label>
          <input type="range" name="low-pass" id="low-pass">
        </div>
        <div class="flex-container setting-filter">
          <input type="checkbox" name="enable-outlier" id="enable-outlier">
          <label for="enable-outlier">Enable outlier filtering</label>
          <input type="range" name="outlier" id="outlier">
        </div>
        
        
      </div>
      <div class="flex-container">
          <button class="setting-btn">Apply and plot</button>
          <button class="setting-btn">Download raw data as CSV</button>
          <button class="setting-btn">Download filtered data as CSV</button>
      </div>
      
      
    </div>
    <div>
      Plots
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
export default {
  
  name: 'rover-overview',
  components :{
    'inclination-component':InclinationComponent,
    'map-component': MapComponent,
    'plot' : Plot
  },
  data(){
    return{
      installationId : this.$route.params.id,
      roverId : this.$route.params.roverid,
      isMounted : false,
      rover : '',
      positions : [],
      convertedPositions :[],
      latestConvertedPosition : '',
      firstConvertedPosition : '',
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

    }
  },
  async created(){
    await this.getRover()
    this.isMounted = true
  },
  methods : {
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
        this.positions.forEach(position => {
          var tmp = utm.convertLatLngToUtm(position.latitude, position.longitude,2);
          tmp.altitude = position.height      
          tmp.date = position.date  
          this.convertedPositions.push(tmp)

          this.eastings.labels.push(position.date)
          easts.push(Number(tmp.Easting))

          this.northings.labels.push(position.date)
          norths.push(Number(tmp.Northing))

          this.altitudes.labels.push(position.date)
          altis.push(Number(tmp.altitude))
        });
        this.eastings.datasets.push({'label':'Easting', 'data' : easts,'backgroundColor':'rgba(229, 57, 53, 0.51)'})
        this.northings.datasets.push({'label':'Northing', 'data' : norths,'backgroundColor':'rgba(229, 57, 53, 0.51)'})
        this.altitudes.datasets.push({'label':'Elevation', 'data' : altis,'backgroundColor':'rgba(229, 57, 53, 0.51)'})

        this.latestConvertedPosition = this.convertedPositions.slice(-1)[0]
        this.firstConvertedPosition = this.convertedPositions[0]

        var bats = []
        this.measure_devices.forEach(measure_device => {
  
          this.batteries.labels.push(measure_device.date)
          bats.push(measure_device.battery_voltage)
        });
        this.batteries.datasets.push({'label':'Battery Voltage', 'data' : bats,'backgroundColor':'rgba(229, 57, 53, 0.51)'})
      }
  }

}
</script>