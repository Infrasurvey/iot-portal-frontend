<template>
<div>
    <div style="display:flex; width: 100%; align-items: center; padding: 20px;">
      <SectionTitle/>
      <div><md-button class="md-raised md-primary" style="font-size: 17px; font-weight: bold;" type="button" @click="showModal">Create a new installation</md-button></div>
    </div>

    <Modal
      v-if="isModalVisible"
      @close="closeModal"
      @updateList="getStations"
      @displaySuccess="displayStatus"
    />

    <FlashMessage></FlashMessage>

    <div style="display: flex; align-content: flex-start; align-items: flex-start; justify-content: flex-start; flex-wrap: wrap; padding-left: 40px">
      <station-tile v-for="station in stations" :key="station.id" :station="station"></station-tile>
    </div>
</div>
</template>

<script>
import API from '../http-constants'
import StationTile from './StationTile'
import Modal from './installation/create_installation';
import PictureInput from 'vue-picture-input'
import SectionTitle from './template/SectionTitle';

export default {
  components:{
      StationTile,
      Modal,
      PictureInput,
      SectionTitle
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
      console.log(ability.can('read', 'User'))      // true
      console.log(ability.can('update', 'User') )   // true
      console.log(ability.can('delete', 'User') )   // false
      console.log(ability.cannot('delete', 'User')) // true
  },
  methods: {
    getStations () {
      API.get('/api/installationByUser')
        .then(response => {
          this.stations = response.data;
        })
        .catch(e => {
          this.errorMessage = e;
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