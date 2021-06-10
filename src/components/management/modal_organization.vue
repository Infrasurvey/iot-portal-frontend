<template>
  <div class="modal-backdrop">
    <div class="modal">
        <header class="modal-header">
        <div name="header">
          <h1 v-if="!isUpdate" class="installation-title">Create organization</h1>
          <h1 v-if="isUpdate" class="installation-title">Update organization</h1>
        </div>
          <button type="button" class="btn-close" @click="close"><font-awesome-icon class="close" icon="times" size="2x"/></button>
      </header>
      <section class="modal-body">
        <div name="body">
          <form novalidate class="md-layout" @submit.prevent="onSubmit" style="display: flex;align-content: space-around; flex-direction: column; justify-content: center;">
            <md-field :class="getValidationClass('name')"  style="width: 300px; margin-right: 50px; margin-left: 50px;">
              <label>Organization's name</label>
              <md-input   v-model="name" name="name" id="name"  maxlength="30"></md-input>
              <span class="md-error" v-if="!$v.name.required">The organization must have a name</span>
              <span class="md-error" v-if="!$v.name.maxlength">The organization name must have less than 30 characters</span>
            </md-field>
          </form>
        </div>
      </section>
      <md-dialog-actions>
        <md-button class="md-primary" v-if="isUpdate" @click="showDeleteAlert">Delete organization</md-button>
        <md-button class="md-primary" v-if="!isUpdate" @click.prevent="onCreate">Create organization</md-button>
        <md-button class="md-primary" v-if="isUpdate" @click.prevent="onUpdate">Update organization</md-button>
      </md-dialog-actions>
    </div>
  </div>
</template>

<script>
import API from '../../http-constants'
import { required } from 'vuelidate/lib/validators'
import FormData from 'form-data'

  export default {
    name: 'modal-organization',
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
            errorMessage: '',
            errors: [],
            responseMessage: ''
        }
    },
    validations: {
        name:{
          required,
          maxlength : 30
        }
   },
    created(){

    },
    methods: {
      close() {
        this.$emit('close');
      },
      saveOrganization: function (){
          var form = new FormData();
          form.append('name', this.name);
          API.post('/api/organization',form)
          .then(response => {
                this.responseMessage = response.data
                this.$emit('close');
                this.$emit('updateList');
                this.$emit('displaySuccess','created',true,'Organization')
            })
            .catch(e => {
                this.errorMessage = e
                this.$emit('close');
                this.$emit('displaySuccess','creation',false,'Organization')
            })
      },
      updateOrganization: function (){
          var form = new FormData();
          form.append('name', this.name);
          API.put('/api/organization/'+this.row.id,{'name':this.name})
          .then(response => {
                this.responseMessage = response.data
                this.$emit('close');
                this.$emit('updateList');
                this.$emit('displaySuccess','updated',true,'Organization')
            })
            .catch(e => {
                this.errorMessage = e
                this.$emit('close');
                this.$emit('displaySuccess','update',false,'Organization')
            })
      },
      showDeleteAlert(){
          this.$swal({
              title: "Delete this organization?",
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
                      API.delete('/api/organization/'+this.row.id)
                .then(response => {
                      this.responseMessage = response.data
                      this.$emit('close');
                      this.$emit('updateList');
                      this.$emit('displaySuccess','deleted',true,'Organization')
                  })
                  .catch(e => {
                      this.errorMessage = e
                      this.$emit('close');
                      this.$emit('displaySuccess','delete',false,'Organization')
                  })
                  }
            });
      },
        onCreate: function() {
            this.$v.$touch();
            if(this.$v.$error) return
            this.saveOrganization();
        },
        onUpdate: function() {
            this.$v.$touch();
            if(this.$v.$error) return
            this.updateOrganization();
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
  };
</script>