<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <div name="header">
          <h1 class="installation-title">Create installation</h1>
        </div>
          <button type="button" class="btn-close" @click="close"><font-awesome-icon class="close" icon="times" size="2x"/></button>
      </header>
      <section class="modal-body">
        <div name="body">
          <form novalidate class="md-layout" @submit.prevent="onSubmit" style="display: flex;align-content: space-around; flex-direction: column; justify-content: center;">
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
            <md-field :class="getValidationClass('device_base_station_id')" style="width: 300px; margin-right: 50px; margin-left: 50px;">
              <label for="basestation">Select an existing base station*</label>
              <md-select v-model="installation.device_base_station_id" name="basestation" id="basestation">
                <md-option v-for="station in stations" :key="station.id" v-bind:value="station.id">{{station.name}}</md-option>
              </md-select>
              <span class="md-error" v-if="!$v.installation.device_base_station_id.required">The installation must be linked with a base station</span>
            </md-field>
            <md-field :class="getValidationClass('group_id')" style="width: 300px; margin-right: 50px; margin-left: 50px;">
              <label for="group">Select an existing group*</label>
              <md-select v-model="installation.group_id" name="group" id="group">
                <md-option v-for="group in groups" :key="group.id" v-bind:value="group.id">{{group.name}}</md-option>
              </md-select>
              <span class="md-error" v-if="!$v.installation.group_id.required">The installation must be linked with a group</span>
            </md-field>
            <div style="width: 300px; margin-right: 50px; margin-left: 50px;">
              <label for="" style="font-size: 16px;color: rgba(0, 0, 0, 0.54);">Select an image : </label>
              <picture-input class="pic-input" ref="pictureInput" @change="onChanged" :width="230" :removable="true"
                :height="230" accept="image/jpeg, image/png" size="10" removeButtonClass="pic-btn" buttonClass="pic-btn" :customStrings="{ upload: '<h1>Upload it!</h1>', drag: 'Drag and drop your image here'}">
              </picture-input>
            </div>
          </form>
          <md-dialog-actions>
            <md-button class="md-primary" @click="close">Cancel</md-button>
            <md-button class="md-primary" @click.prevent="onSubmit">Create a new installation</md-button>
          </md-dialog-actions>
        </div>
       </section>
    </div>
  </div>
</template>

<script>
import API from '../../http-constants'
import PictureInput from 'vue-picture-input'
import FormData from 'form-data'
import { required } from 'vuelidate/lib/validators'
import format from 'date-fns/format'

  export default {
    name: 'Modal',
    components:{
        PictureInput
    },
    data(){
        return{
            installation: {
                name:"",
                installation_date:null,
                group_id:"",
                device_base_station_id:"",
            },
            image:null,
            stations: [],
            groups:[],
            errorMessage: '',
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
        this.getGroups();
    },
    methods: {
    
      close() {
        this.$emit('close');
      },
      getStations: function () {
        API.get('/api/device/basestation/available')
            .then(response => {
            this.stations = response.data
            })
            .catch(e => {
            this.errorMessage = e
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
      saveInstallation: function (){
          var form = new FormData();
          form.append('image', this.image);
          form.append('name',this.installation.name);
          form.append('installation_date',format(this.installation.installation_date,'yyyy-MM-dd'));
          form.append('group_id',this.installation.group_id);
          form.append('device_base_station_id',this.installation.device_base_station_id);
          API.post('/api/installation',form)
          .then(response => {
                this.responseMessage = response.data
                this.$emit('close');
                this.$emit('updateList');
                this.$emit('displaySuccess',true)
            })
            .catch(e => {
            this.errorMessage = e
            this.$emit('close');
            this.$emit('displaySuccess',false)
            })
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
        getValidationClass (fieldName) {
          const field = this.$v.installation[fieldName]
          if (field) {
            return {
              'md-invalid': field.$invalid && field.$dirty
            }
          }
    }
    },
  };
</script>