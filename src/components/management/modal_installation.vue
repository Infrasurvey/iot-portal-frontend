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
          <form enctype="multipart/form-data" class="installation-form">
              <label for="name">Installation's name : </label>
              <input type="text" v-model="installation.name" name="name" id="name" class="base-input" placeholder="Name" readonly>
               <label for="organization">installation's group :</label>
               <select name="group" id="group" v-model="installation.group_id" class="base-select">
                   <option :value="group.id" v-for="group in groups" :key="group.id" :selected="installation.group_id == group.id">{{group.name}}</option>
               </select>
               <label for="admin">Installation's base station :</label>
               <select name="basestation" id="basestation" v-model="installation.device_base_station_id" class="base-select">
                   <option :value="basestation.id" v-for="basestation in basestations" :key="basestation.id" :selected="installation.device_base_station_id == basestation.id">{{basestation.name}}</option>
               </select>

          </form>

        </div>
       </section>
       <footer class="modal-footer">
            <button type="button" v-if="isUpdate" class="" @click="showDeleteAlert">Delete installation</button>
            <button type="submit" v-if="isUpdate" class="btn-create" @click.prevent="onUpdate">Update installation</button>
      </footer>

    </div>
  </div>
</template>

<script>
import API from '../../http-constants'
import { required } from 'vuelidate/lib/validators'
import FormData from 'form-data'

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
        }
    },
  };
</script>