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
import API from '../http-constants'
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
      this.getStations();
      //this.$ability.update(defineRulesFor(this.$store.getters.getGroups));
      var ability = this.$store.getters.getAbility;
      console.log(ability.can('read', 'Post')) // true
      console.log(ability.can('read', 'User')) // true
      console.log(ability.can('update', 'User') )// true
      console.log(ability.can('delete', 'User') )// false
      console.log(ability.cannot('delete', 'User')) // true
  },
  methods: {
    getStations: function () {
      API.get('/api/installationByUser')
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