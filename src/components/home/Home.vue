<template>
<div>
    <div class="title-container">
      <section-title title="My installations"></section-title>
      <div><md-button class="md-raised md-primary create-installation-button" type="button" @click="showDialog = true">Create a new installation</md-button></div>
    </div>

    <md-dialog :md-active.sync="showDialog" @md-opened="dialogOpened" @md-closed="clearForm">
      <md-dialog-title>Create a new installation</md-dialog-title>
      <form novalidate class="md-layout" @submit.prevent="onSubmit" style="display: flex; flex-direction: column; justify-content: center;">

        <md-field :class="getValidationClass('name')" style="width: 300px; margin-right: 50px; margin-left: 50px;">
          <label>Installation's name*</label>
          <md-input v-model="installation.name" maxlength="30"></md-input>
          <span class="md-error" v-if="!$v.installation.name.required">The installation name is required</span>
          <span class="md-error" v-else-if="!$v.installation.name.maxLength">Must contains max. 30 characters</span>
        </md-field>

        <md-datepicker :class="getValidationClass('installation_date')" v-model="installation.installation_date" style="width: 300px; margin-right: 50px; margin-left: 50px;">
          <label>Comissioning date*</label>
          <span class="md-error" v-if="!$v.installation.installation_date.required">The comissioning date is required</span>
        </md-datepicker>

        <md-autocomplete :class="getValidationClass('device_base_station_id')" v-model="installation.device_base_station_id" md-options="baseStations" style="width: 300px; margin-right: 50px; margin-left: 50px;">
          <label>Select an existing base station*</label>
          <template slot="md-autocomplete-item" slot-scope="{ item, term }">
            <md-highlight-text :md-term="term">{{ item.name }}</md-highlight-text>
          </template>
          <span class="md-error" v-if="!$v.installation.device_base_station_id.required">The installation must be linked with a base station</span>
        </md-autocomplete>

        <md-autocomplete :class="getValidationClass('group_id')" v-model="installation.group_id" md-options="groups" style="width: 300px; margin-right: 50px; margin-left: 50px;">
          <label>Select an existing group*</label>
          <template slot="md-autocomplete-item" slot-scope="{ item, term }">
            <md-highlight-text :md-term="term">{{ item.name }}</md-highlight-text>
          </template>
          <span class="md-error" v-if="!$v.installation.group_id.required">The installation must be linked with a group</span>
        </md-autocomplete>

        <div style="width: 300px; margin-right: 50px; margin-left: 50px;">
          <label for="">Select an image : </label>
          <picture-input class="pic-input" ref="pictureInput" @change="onChanged" :width="300" :removable="true"
            :height="230" accept="image/jpeg, image/png" size="10" removeButtonClass="pic-btn" buttonClass="pic-btn" :customStrings="{ upload: '<h1>Upload it!</h1>', drag: 'Drag and drop your image here'}">
          </picture-input>
        </div>
        
      </form>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Cancel</md-button>
        <md-button class="md-primary" @click.prevent="onSubmit">Create a new installation</md-button>
      </md-dialog-actions>
    </md-dialog>

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
import FormData from 'form-data'
import { required } from 'vuelidate/lib/validators'
import PictureInput from 'vue-picture-input'
import SectionTitle from '../template/SectionTitle';

export default {
  components:{
      StationCard,
      PictureInput,
      SectionTitle
  },
  data () {
    return {
      stations: '',
      errorMessage: '',
      showDialog: false,
      installation: {
        name:"",
        installation_date:"",
        group_id:"",
        device_base_station_id:"",
      },
      image:null,
      baseStations: [],
      groups:[],
      errors: [],
      responseMessage: ''
    }
  },
  validations: {
    installation: {
      name:{
        required
      },
      installation_date:{
        required
      },
      group_id:{
        required
      },
      device_base_station_id:{
        required
      }
    }
  },
  created(){
      this.getStations();
      this.$emit('updateUserInfo');
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
      getGroups: function () {
      API.get('/api/group')
        .then(response => {
          this.groups = response.data
        })
        .catch(e => {
          this.errorMessage = e
        })
    },
    getAvailableBaseStations: function () {
      API.get('/api/device/basestation/available')
        .then(response => {
          console.log("Getting available base stations");
          this.baseStations = response.data
        })
        .catch(e => {
          this.errorMessage = e
          console.log("Cannot get available base stations");
        })
    },
    saveInstallation: function (){
      var form = new FormData();
      form.append('image', this.image);
      form.append('name',this.installation.name);
      form.append('installation_date',this.installation.installation_date);
      form.append('group_id',this.installation.group_id);
      form.append('device_base_station_id',this.installation.device_base_station_id);
      API.post('/api/installation',form)
        .then(response => {
          this.responseMessage = response.data
          this.showDialog = false;
          this.getStations();
          this.flashMessage.success({title: 'Success', message: 'The new installation has been succesfully created !'});
        })
        .catch(e => {
          this.errorMessage = e
          showDialog = false;
          this.flashMessage.show({status: 'error', title: 'Error', message: 'An error occured during installation creation.'})
        })
    },
    dialogOpened(){
      console.log("TOTO")
      this.getAvailableBaseStations();
      this.getGroups();
    },
    onSubmit: function() {
      this.$v.installation.$touch();
      if(this.$v.installation.$error) return
      // to form submit after this
      //alert('Form submitted')
      this.saveInstallation();
    },
    onChanged (image) {
      if (image) {
        this.image = this.$refs.pictureInput.file
      }
    },
    clearForm () {
      this.$v.$reset()
      this.form.installation.name = null
      this.form.installation.installation_date = null
      this.form.installation.group_id = null
      this.form.installation.device_base_station_id = null
    },
    getValidationClass (fieldName) {
      const field = this.$v.installation[fieldName]
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
  }
}
</script>