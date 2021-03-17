<template>
<div>
    <h1>My installations</h1>
    <div class="flex-container">
    <station-tile v-for="station in stations" :key="station.id" :station="station"> 
    </station-tile>
    </div>
</div>

</template>

<script>
import {HTTP} from '../http-constants'
import StationTile from './StationTile'
export default {

  components:{
      StationTile
  },
  data () {
    return {
      stations: '',
      errorMessage: ''
    }
  },
  created(){
      this.getStations()
  },
  methods: {
    getStations: function () {
      HTTP.get('/device/basestation/all')
        .then(response => {
          this.stations =response.data
        })
        .catch(e => {
          this.errorMessage = e
        })
    }
  }
}
</script>