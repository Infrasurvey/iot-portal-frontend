<template>
  <div class="modal-backdrop">
    <div class="modal">
        <header class="modal-header">
        <div name="header">
          <h1 v-if="!isUpdate" class="installation-title">Create a new group</h1>
          <h1 v-if="isUpdate" class="installation-title">Update group</h1>
        </div>
          <button type="button" class="btn-close" @click="close"><font-awesome-icon class="close" icon="times" size="2x"/></button>
      </header>
      <section class="modal-body">
        <div name="body">
          <form enctype="multipart/form-data" class="installation-form">
              <label for="name">Group's name : </label>
              <input type="text" v-model="name" name="name" id="name" placeholder="Name" class="base-input" :class="{ 'hasError': $v.name.$error }">
               <label for="organization">Group's organization :</label>
              <select type="text" v-model="organization_id" name="organization" id="organization" class="base-select" :class="{ 'hasError': $v.organization_id.$error }" :disabled="!isUpdate ? true : false" >
                    <option v-for="organization in organizations" :key="organization.id" v-bind:value="organization.id" :selected="organization_id == organization.id">
                        {{ organization.name }}
                    </option>
              </select>
          </form>
        </div>
       </section>
       <footer class="modal-footer">
            <button type="button" v-if="isUpdate" class="" @click="showDeleteAlert">Delete group</button>
            <button type="submit" v-if="!isUpdate" class="btn-create" @click.prevent="onCreate">Create new group</button>
            <button type="submit" v-if="isUpdate" class="btn-create" @click.prevent="onUpdate">Update group</button>
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
            organization_id : this.row.organization_id,
            errorMessage: '',
            errors: [],
            responseMessage: '',
            organizations : []
        }
    },
    validations: {
        name:{
          required
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
                this.$emit('displaySuccess','created',true)
            })
            .catch(e => {
                this.errorMessage = e
                this.$emit('close');
                this.$emit('displaySuccess','creation',false)
            })
      },
      updateGroup: function (){
          API.put('/api/group/'+this.row.id,{'name':this.name,'organization_id': this.organization_id})
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
        onCreate: function() {
            this.$v.$touch();
            if(this.$v.$error) return
            this.saveGroup();
        },
        onUpdate: function() {
            this.$v.$touch();
            if(this.$v.$error) return
            this.updateGroup();
        }
    },
  };
</script>