<template>
  <div class="modal-backdrop">
    <div class="modal">
        <header class="modal-header">
        <div name="header">
          <h1 v-if="!isUpdate" class="installation-title">Create a new organization</h1>
          <h1 v-if="isUpdate" class="installation-title">Update organization</h1>
        </div>
          <button type="button" class="btn-close" @click="close"><font-awesome-icon class="close" icon="times" size="2x"/></button>
      </header>
      <section class="modal-body">
        <div name="body">
          <form enctype="multipart/form-data" class="installation-form">
              <label for="name">Organization's name : </label>
              <input type="text" v-model="name" name="name" id="name" class="base-input" placeholder="Name" :class="{ 'hasError': $v.name.$error }">
          </form>
        </div>
       </section>
       <footer class="modal-footer">
            <button type="button" v-if="isUpdate" class="" @click="showDeleteAlert">Delete organization</button>
            <button type="submit" v-if="!isUpdate" class="btn-create" @click.prevent="onCreate">Create new organization</button>
            <button type="submit" v-if="isUpdate" class="btn-create" @click.prevent="onUpdate">Update organization</button>
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
          required
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
                this.$emit('displaySuccess','created',true)
            })
            .catch(e => {
                this.errorMessage = e
                this.$emit('close');
                this.$emit('displaySuccess','creation',false)
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
                this.$emit('displaySuccess','updated',true)
            })
            .catch(e => {
                this.errorMessage = e
                this.$emit('close');
                this.$emit('displaySuccess','update',false)
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
                      this.$emit('displaySuccess','deleted',true)
                  })
                  .catch(e => {
                      this.errorMessage = e
                      this.$emit('close');
                      this.$emit('displaySuccess','delete',false)
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
        }
    },
  };
</script>