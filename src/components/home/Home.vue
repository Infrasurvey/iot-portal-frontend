<template>
<div>
    <div class="title-container">
      <section-title title="My installations"></section-title>
      <div><md-button v-if="manageable" class="md-raised md-primary create-installation-button" type="button" @click="showModal">Create a new installation</md-button></div>
    </div>
    <Modal
      v-if="isModalVisible"
      @close="closeModal"
      @updateList="getStations"
      @displaySuccess="displayStatus"
    />
    <FlashMessage></FlashMessage>
    <div class="station-card-container">
      <station-card v-for="station in stations" :key="station.id" :station="station"></station-card>
    </div>
</div>
</template>

<style scoped>
.title-container{
  display:flex;
  width: 100%;
  align-items: center;
  padding: 20px;
}

.create-installation-button{
  font-size: 17px;
  font-weight: bold;
}

.station-card-container{
  display: flex;
  align-content: flex-start;
  align-items: flex-start;
  justify-content: space-evenly;
  flex-wrap: wrap;
  padding-left: 40px
}
</style>

<script>
import API from '../../http-constants'
import StationCard from './StationCard'
import Modal from '../installation/create_installation';
import PictureInput from 'vue-picture-input'
import SectionTitle from '../template/SectionTitle';

export default {
  components:{
      StationCard,
      Modal,
      PictureInput,
      SectionTitle
  },
  data () {
    return {
      stations: '',
      errorMessage: '',
      isModalVisible: false,
      manageable : false
    }
  },
  async created(){
      this.getStations();
      this.$emit('updateUserInfo');
      this.$emit('updateAbility');
      var ability = this.$store.getters.getAbility
      this.manageable = ability.can('manage', 'organization') || ability.can('manage','all')
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