<template>
<div>
    <div class="home-header">
      <h1>My installations</h1>
      <h1 class="btn-create-install">
         <button type="button" class="btn" @click="showModal" >+ Create a new installation </button>
      </h1>
    </div>

    <Modal
      v-if="isModalVisible"
      @close="closeModal"
      @updateList="getStations"
      @displaySuccess="displayStatus"
    />
    <FlashMessage></FlashMessage>
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
      this.$emit('updateUserInfo');
      var ability = this.$store.getters.getAbility;
      console.log(ability.can('read', 'User')) // true
      console.log(ability.can('update', 'User') )// true
      console.log(ability.can('delete', 'User') )// false
      console.log(ability.cannot('delete', 'User')) // true
  },
  methods: {
    getStations () {
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
    },
    displayStatus(status){
      if(status){
          this.flashMessage.success({title: 'Success', message: 'The new installation has been succesfully created !'});
      }
      else
      {
        this.flashMessage.show({status: 'error', title: 'Error', message: 'An error occured during installation creation.'})
      }
    }
  }
}
</script>