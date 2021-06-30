<template>
  <div class="modal-backdrop">
    <div class="modal">
        <header class="modal-header">
        <div name="header">
          <h1 v-if="!isUpdate" class="installation-title">Create group</h1>
          <h1 v-if="isUpdate" class="installation-title">Update group</h1>
        </div>
          <button type="button" class="btn-close" @click="close"><font-awesome-icon class="close" icon="times" size="2x"/></button>
      </header>
      <section class="modal-body">
        <div name="body">
          <form novalidate class="md-layout" @submit.prevent="onSubmit" style="display: flex;align-content: space-around; flex-direction: column; justify-content: center;">
            <md-field :class="getValidationClass('name')"  style="width: 300px; margin-right: 50px; margin-left: 50px;">
              <label>Group's name</label>
              <md-input v-model="name" name="name" id="name"  maxlength="30"></md-input>
              <span class="md-error" v-if="!$v.name.required">The group must have a name</span>
              <span class="md-error" v-if="!$v.name.maxlength">The group name must have less than 30 characters</span>
            </md-field>
            <md-field :class="getValidationClass('organization_id')" style="width: 300px; margin-right: 50px; margin-left: 50px;">
              <label for="organization">Select an existing organization*</label>
              <md-select v-model="organization_id" name="organization" id="organization" disabled>
                <md-option v-for="organization in organizations" :key="organization.id" v-bind:value="organization.id">{{organization.name}}</md-option>
              </md-select>
              <span class="md-error" v-if="!$v.organization_id.required">The group must be linked with an organization</span>
            </md-field>
          </form>
        </div>
      </section>
      <md-dialog-actions>
        <md-button class="md-primary" v-if="isUpdate" @click="showDeleteAlert">Delete group</md-button>
        <md-button class="md-primary" v-if="!isUpdate" @click.prevent="onCreate">Create new group</md-button>
        <md-button class="md-primary" v-if="isUpdate" @click.prevent="onUpdate">Update group</md-button>
      </md-dialog-actions>
    </div>
  </div>
</template>

<script>
import API from '../../http-constants'
import { required } from 'vuelidate/lib/validators'
import FormData from 'form-data'

  export default {
    name: 'modal-user',
    props:{
      row: {
          type: Object,
          required : true
      },
      isUpdate : Boolean
    },
    components:{
    },
    data(){
      return{
          name:this.row.name || '',
          organization_id : this.row.organization_id,
          errorMessage: '',
          errors: [],
          responseMessage: '',
          organizations : []
      }
    },
    validations: {
      name:{
        required,
        maxlength : 30
      },
      organization_id:{
        required
      }
    },
    created(){
      this.getOrganizations()
    },
    methods: {
      close() {
        this.$emit('close');
      },
      showDeleteAlert(){
        this.$swal({
            title: "Delete this group?",
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
                    API.delete('/api/group/'+this.row.id)
              .then(response => {
                    this.responseMessage = response.data
                    this.$emit('close');
                    this.$emit('updateList');
                    this.$emit('displaySuccess','deleted',true,'Group')
                })
                .catch(e => {
                    this.errorMessage = e
                    this.$emit('close');
                    this.$emit('displaySuccess','delete',false,'Group')
                })
                }
          });
      },
      getOrganizations: function (){
          API.get('/api/organization')
          .then(response => {
                this.organizations = response.data
            })
            .catch(e => {
                this.errorMessage = e
            })
      },
      saveGroup: function (){
          var form = new FormData();
          form.append('name', this.name);
          form.append('organization_id', this.organization_id);
          API.post('/api/group',form)
          .then(response => {
                this.responseMessage = response.data
                this.$emit('close');
                this.$emit('updateList');
                this.$emit('displaySuccess','created',true,'Group')
            })
            .catch(e => {
                this.errorMessage = e
                this.$emit('close');
                this.$emit('displaySuccess','creation',false,'Group')
            })
      },
      updateGroup: function (){
          API.put('/api/group/'+this.row.id,{'name':this.name,'organization_id': this.organization_id})
          .then(response => {
                this.responseMessage = response.data
                this.$emit('close');
                this.$emit('updateList');
                this.$emit('displaySuccess','updated',true,'Group')
            })
            .catch(e => {
                this.errorMessage = e
                this.$emit('close');
                this.$emit('displaySuccess','update',false,'Group')
            })
      },
        onCreate: function() {
            this.$v.$touch();
            if(this.$v.$error) return
            this.saveGroup();
        },
        onUpdate: function() {
            this.$v.$touch();
            if(this.$v.$error) return
            this.updateGroup();
        },
        getValidationClass (fieldName) {
          const field = this.$v[fieldName]
          if (field) {
            return {
              'md-invalid': field.$invalid && field.$dirty
            }
          }
        }
    },
  }
</script>