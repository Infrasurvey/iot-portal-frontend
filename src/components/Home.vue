<template>
<div>
    <h1>My installations</h1>
     <button type="button" class="btn" @click="showModal" > Open Modal! </button>

    <Modal
      v-if="isModalVisible"
      @close="closeModal"
    />
    <div class="flex-container">
    <station-tile v-for="station in stations" :key="station.id" :station="station"> 
    </station-tile>
    </div>
</div>

</template>

<script>
import API from '../http-constants'
import StationTile from './StationTile'
import Modal from './installation/create_installation';
import PictureInput from 'vue-picture-input'

export default {

  components:{
      StationTile,
      Modal,
      PictureInput
  },
  data () {
    return {
      stations: '',
      errorMessage: '',
      isModalVisible: false,
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
    },
    showModal() {
        this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    }
  }
}
</script>