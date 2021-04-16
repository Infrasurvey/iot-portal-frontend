<template>
  <div class="modal-backdrop">
    <div class="modal">
        <header class="modal-header">
        <div name="header">
          <h1 class="installation-title">Create new installation</h1>
        </div>
          <button type="button" class="btn-close" @click="close"><font-awesome-icon class="close" icon="times" size="2x"/></button>
      </header>

      <section class="modal-body">
        <div name="body">

          <form enctype="multipart/form-data" class="installation-form">
              <label for="name">Installation's name : </label>
              <input type="text" v-model="installation.name" name="name" id="name" placeholder="Name" class="base-input" :class="{ 'hasError': $v.installation.name.$error }">
              <label for="date">Comissioning date : </label>
              <input type="date" v-model="installation.installation_date" name="date" id="date" class="base-input" :class="{ 'hasError': $v.installation.installation_date.$error }">
              <label for="basestation">Select an existing base station :</label>
              <select type="text" v-model="installation.device_base_station_id" name="basestation" id="basestation" class="base-select" :class="{ 'hasError': $v.installation.device_base_station_id.$error }"> 
                    <option v-for="station in stations" :key="station.id" v-bind:value="station.id">
                        {{ station.name }}
                    </option>
              </select>
                <label for="group">Select an existing group :</label>
              <select type="text" v-model="installation.group_id" name="group" id="group" class="base-select" :class="{ 'hasError': $v.installation.group_id.$error }"> 
                    <option v-for="group in groups" :key="group.id" v-bind:value="group.id">
                        {{ group.name }}
                    </option>
              </select>
              <label for="">Select an image : </label>
                <picture-input class="pic-input" ref="pictureInput" @change="onChanged" :width="230" :removable="true"
                    :height="230" accept="image/jpeg, image/png" size="10" removeButtonClass="pic-btn" buttonClass="pic-btn" :customStrings="{ upload: '<h1>Upload it!</h1>', drag: 'Drag and drop your image here'}">
                </picture-input>
          </form>
        </div>
       </section>
       <footer class="modal-footer">
            <button type="button" class="btnclose" @click="close">Cancel</button>
            <button type="submit" class="btn-create" @click.prevent="onSubmit">Create new installation</button>
      </footer>

    </div>
  </div>
</template>

<script>
import API from '../../http-constants'
import PictureInput from 'vue-picture-input'
import FormData from 'form-data'
import { required } from 'vuelidate/lib/validators'

  export default {
    name: 'Modal',
    components:{
        PictureInput
    },
    data(){
        return{
            installation: {
                name:"",
                installation_date:"",
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
        API.get('/api/device/basestation/all')
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
          form.append('installation_date',this.installation.installation_date);
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
        }
    },
  };
</script>