<template>
  <div class="modal-backdrop">
    <div class="modal">
        <header class="modal-header">
        <div name="header">
          <h1 v-if="isUpdate" class="installation-title">Update installation</h1>
          <h1 v-if="!isUpdate" class="installation-title">Create installation</h1>
        </div>
          <button type="button" class="btn-close" @click="close"><font-awesome-icon class="close" icon="times" size="2x"/></button>
      </header>
      <section class="modal-body">
        <div name="body">
          <form novalidate class="md-layout" @submit.prevent="onSubmit" style="display: flex;align-content: space-around; flex-direction: column; justify-content: center;">
            <md-field  style="width: 300px; margin-right: 50px; margin-left: 50px;">
              <label>Installation's name</label>
              <md-input v-model="installation.name" maxlength="30" disabled></md-input>
            </md-field>
            <md-field :class="getValidationClass('device_base_station_id')" style="width: 300px; margin-right: 50px; margin-left: 50px;">
              <label for="basestation">Select an existing base station*</label>
              <md-select v-model="installation.device_base_station_id" name="basestation" id="basestation">
                <md-option v-for="station in basestations" :key="station.id" v-bind:value="station.id">{{station.name}}</md-option>
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
          </form>
        </div>
      </section>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showDeleteAlert">Delete installation</md-button>
        <md-button class="md-primary" @click.prevent="onSubmit">Create a new installation</md-button>
      </md-dialog-actions>
    </div>
  </div>
</template>

<script>
import API from '../../http-constants'
import { required } from 'vuelidate/lib/validators'
import FormData from 'form-data'
import SectionTitle from '../template/SectionTitle.vue';

  export default {
    name: 'Modal',
    props:{
      row: {
          type: Object,
          required : true
      },
      isUpdate : Boolean,
      organization_id : String,
      group_id : String
  },
    components:{
        SectionTitle
        
    },
    data(){
        return{
            installation:{
                name: this.row.name || '',
                id : this.row.id || '',
                group_id : this.row.group_id || '',
                device_base_station_id : this.row.device_base_station_id || ''
            },
            errorMessage: '',
            errors: [],
            responseMessage: '',
            groups : [],
            basestations : [],
        }
    },
    validations: {
        installation:{
            group_id:{
                required
            },
            device_base_station_id:{
                required
            }
        }

   },
    created(){
        this.getGroups()
        this.getBasestations()
    },
    methods: {
      close() {
        this.$emit('close');
      },
      getGroups: function (){
          var url = ''
            if (this.organization_id == null)
              url = '/api/getCurrentVisibleGroups'
            else
              url = '/api/getGroupsByOrganization/'+this.organization_id
          
          API.get(url)
          .then(response => {
                this.groups = response.data
            })
            .catch(e => {
                this.errorMessage = e
            })
      },
      getBasestations: function (){
          API.get('/api/device/basestation/available')
          .then(response => {
                this.basestations = response.data
                this.basestations.push(this.row.basestation)
            })
            .catch(e => {
                this.errorMessage = e
            })
      },
      updateInstallation: function (){
          API.put('/api/installation/'+this.installation.id,this.installation)
          .then(response => {
                this.responseMessage = response.data
                this.$emit('close');
                this.$emit('updateList');
                this.$emit('displaySuccess','updated',true,'Installation')
            })
            .catch(e => {
                this.errorMessage = e
                this.$emit('close');
                this.$emit('displaySuccess','update',false,'Installation')
            })
      },
      showDeleteAlert(){
          this.$swal({
              title: "Delete this installation?",
              text: "Are you sure? You won't be able to revert this!",
              type: "warning",
              icon:"warning",
              customClass:{
                container :'swa-container' 
              },
              showCancelButton: true,
              confirmButtonColor: "#E53935",
              confirmButtonText: "Yes, Delete it!"
          }).then((result) => { // <--
                if (result.value) { // <-- if confirmed
                  API.delete('/api/installation/'+this.row.id)
                    .then(response => {
                          this.responseMessage = response.data
                          this.$emit('close');
                          this.$emit('updateList');
                          this.$emit('displaySuccess','deleted',true,'Installation')
                      })
                      .catch(e => {
                          this.errorMessage = e
                          this.$emit('close');
                          this.$emit('displaySuccess','delete',false,'Installation')
                      })
                  }
            });
      },
        onUpdate: function() {
            this.$v.$touch();
            if(this.$v.$error) return
            this.updateInstallation();
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