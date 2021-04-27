<template>
  <div class="modal-backdrop">
    <div class="modal">
        <header class="modal-header">
        <div name="header">
          <h1 v-if="isUpdate" class="installation-title">Update user</h1>
        </div>
          <button type="button" class="btn-close" @click="close"><font-awesome-icon class="close" icon="times" size="2x"/></button>
      </header>
      <section class="modal-body">
        <div name="body">
          <form enctype="multipart/form-data" class="installation-form">
              <label for="name">User's name : </label>
              <input type="text" v-model="name" name="name" id="name" class="base-input" placeholder="Name" :class="{ 'hasError': $v.name.$error }" readonly>
               <label for="organizations">Is organization admin for :</label>
              <multiselect @input="setSelectedGroups" v-model="organizations_selected" :options="organizations" label="name" :showLabels="true"  selectedLabel="Selected" selectLabel="Select this organization" deselect-label="Remove this organization" track-by="id" :taggable="true" :searchable="false" :close-on-select="true" :multiple="true" ></multiselect> 
              
               <label for="groups">User's group :</label>
              <multiselect v-model="groups_selected" :options="groups" label="name" :showLabels="true"  selectedLabel="Selected" selectLabel="Select this group" deselect-label="Remove this group" track-by="id" :taggable="true" :searchable="false" :close-on-select="true" :multiple="true" ></multiselect> 

          </form>

        </div>
       </section>
       <footer class="modal-footer">
            <button type="button" v-if="isUpdate" class="" @click="showDeleteAlert">Delete user</button>
            <button type="submit" v-if="isUpdate" class="btn-create" @click.prevent="onUpdate">Update group</button>
      </footer>

    </div>
  </div>
</template>

<script>
import API from '../../http-constants'
import { required } from 'vuelidate/lib/validators'
import FormData from 'form-data'
import Multiselect from 'vue-multiselect'
//              <v-select :options="groups" label="name" multiple="multiple" v-model="groups_selected"/>


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
        Multiselect
    },
    data(){
        return{
            name:this.row.name || '',
            organizations_selected : this.row.organizations || '',
            groups_selected : this.row.groupsId || '',
            errorMessage: '',
            errors: [],
            responseMessage: '',
            groups : [],
            organizations : []
        }
    },
    validations: {
        name:{
          required
        },
        groups_selected:{
          required
        }
   },
    async created(){
        await this.getGroups()
        await this.getOrganizations()
        this.setSelectedGroups()

    },
    methods: {
      close() {
        this.$emit('close');
      },
      getGroups(){
          return API.get('/api/group')
          .then(response => {
                this.groups = response.data
            })
            .catch(e => {
                this.errorMessage = e
            })
      },
      getOrganizations(){
          return API.get('/api/organizationWithGroups')
          .then(response => {
                this.organizations = response.data
            })
            .catch(e => {
                this.errorMessage = e
            })
      },
      setSelectedGroups(){
        var selectedGroups = Array()
        this.organizations_selected.forEach(organization => {
          var groups = this.organizations.find(function(orga) {
            return orga.id === this.id;
          }, organization).groups;
          
          selectedGroups = selectedGroups.concat(groups);
        })
        this.groups_selected.forEach(group => {
            if (selectedGroups.some(function(gr) {return gr.id === this.id;}, group)) {
                group['$isDisabled'] = true
            }
            else{
                group['$isDisabled'] = false
            }
        });
        selectedGroups.forEach(group => {
            if (!this.groups_selected.some(function(gr) {return gr.id === this.id;}, group)) {
                group['$isDisabled'] = true
                this.groups_selected.push(group)
            }
        });
        this.groups.forEach(group => {
            if (selectedGroups.some(function(gr) {return gr.id === this.id;}, group)) {
              group['$isDisabled'] = true
            }
            else{
                group['$isDisabled'] = false
            }
        });
      },
      updateUser: function (){
          var newUserOrganizationRelations = []
          this.organizations_selected.forEach(group => {
              var pivot = {
                  'user_id':this.row.id,
                  'organization_id' :group.id
              }
              newUserOrganizationRelations.push(pivot);
          });
          var newUserGroupRelations = []
          this.groups_selected.forEach(group => {
              var pivot = {
                  'user_id':this.row.id,
                  'group_id' :group.id
              }
              newUserGroupRelations.push(pivot);
          });
          API.post('/api/updateUserOrganizations',{'user_id':this.row.id,'userorganizations' : newUserOrganizationRelations})
          .then(response => {
                API.post('/api/updateUserGroups',{'user_id':this.row.id,'usergroups' : newUserGroupRelations})
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
            })
            .catch(e => {
                this.errorMessage = e
                this.$emit('close');
                this.$emit('displaySuccess','update',false)
            })
      },
      showDeleteAlert(){
          this.$swal({
              title: "Delete this User?",
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
                      API.delete('/api/user/'+this.row.id)
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
        onUpdate: function() {
            this.$v.$touch();
            if(this.$v.$error) return
            this.updateUser();
        }
    },
  };
</script>