<template>
  <div class="modal-backdrop">
    <div class="modal">
        <header class="modal-header">
        <div name="header">
          <h1 v-if="!isAdmin" class="installation-title">Add user</h1>
          <h1 v-if="isAdmin" class="installation-title">Add Responsible</h1>
        </div>
          <button type="button" class="btn-close" @click="close"><font-awesome-icon class="close" icon="times" size="2x"/></button>
      </header>
      <section class="modal-body">
        <div name="body">
          <form enctype="multipart/form-data" class="installation-form">
              <label for="name">Select a user to add : </label>
              <multiselect  v-model="selected_user" :options="users" label="name" :showLabels="true"  selectedLabel="Selected" selectLabel="Select this user" deselect-label="Remove this user" track-by="id" :searchable="false" :close-on-select="true" :class="{ 'hasError': $v.selected_user.$error }"></multiselect> 
               <label for="organizations" v-if="isAdmin">Is organization admin for :</label>
              <multiselect v-if="isAdmin" disabled v-model="organization_selected" :options="organization" label="name" :showLabels="true"  selectedLabel="Selected" selectLabel="Select this organization" deselect-label="Remove this organization" track-by="id" :taggable="true" :searchable="false" :close-on-select="true" :multiple="true" ></multiselect> 
              
               <label for="groups" >User's group :</label>
              <multiselect v-model="final_groups_selected" :disabled="isAdmin || group_id !=null ? true : false" :options="groups" label="name" :showLabels="true"  selectedLabel="Selected" selectLabel="Select this group" deselect-label="Remove this group" track-by="id" :taggable="true" :searchable="false" :close-on-select="true" :multiple="true" :class="{ 'hasError': $v.final_groups_selected.$error }"></multiselect> 
          </form>

        </div>
       </section>
       <footer class="modal-footer">
            <button type="submit" class="btn-create" @click.prevent="addUser">Add user</button>
      </footer>

    </div>
  </div>
</template>

<script>
import API from '../../http-constants'
import { required } from 'vuelidate/lib/validators'
import FormData from 'form-data'
import Multiselect from 'vue-multiselect'

  export default {
    name: 'add-user',
    props:{
      isAdmin : Boolean,
      organization_id : String,
      group_id : String
  },
    components:{
        Multiselect
    },
    data(){
        return{
          selected_user : '',
            users : [],
            final_groups_selected : [],
            errorMessage: '',
            errors: [],
            responseMessage: '',
            groups : [],
            organization : [],
            organization_selected : [],
        }
    },
    validations: {
        selected_user:{
          required
        },
        final_groups_selected:{
          required
        }
   },
    async created(){
        await this.getUsers()
        if(this.group_id == null){
          await this.getOrganizations()
        }
        else{
          await this.getGroups()
        }
        this.setSelectedGroups()

    },
    methods: {
      close() {
        this.$emit('close');
      },
      getUsers(){
          var url = ''
          url = '/api/user'
          return API.get(url)
          .then(response => {
                this.users = response.data
            })
            .catch(e => {
                this.errorMessage = e
            })
      },
      getOrganizations(){
          var url = ''
          url = '/api/organizationWithGroups/'+this.organization_id
          return API.get(url).then(response => {
                this.organization = [response.data]
                if(this.isAdmin)
                  this.organization_selected = this.organization
                this.groups = response.data.groups

            })
            .catch(e => {
                this.errorMessage = e
            })
          
      },
      getGroups(){
          var url = ''
          url = '/api/getGroupWithOrganization/'+this.group_id
          return API.get(url).then(response => {
                this.groups = [response.data]
                this.organization = response.data.organization

            })
            .catch(e => {
                this.errorMessage = e
            })
          
      },
      setSelectedGroups(){
        if(this.isAdmin){
            this.groups.forEach(group => {
              group['$isDisabled'] = true
            });
        }
        this.final_groups_selected = this.groups
        
      },
      addUser: function (){
          var newUserOrganizationRelations = []
          this.organization_selected.forEach(group => {
              var pivot = {
                  'user_id':this.selected_user.id,
                  'organization_id' :group.id
              }
              newUserOrganizationRelations.push(pivot);
          });
          var newUserGroupRelations = []
          this.final_groups_selected.forEach(group => {
              var pivot = {
                  'user_id':this.selected_user.id,
                  'group_id' :group.id
              }
              newUserGroupRelations.push(pivot);
          });
          API.post('/api/addUserOrganizations',{'user_id':this.selected_user.id,'userorganizations' : newUserOrganizationRelations})
          .then(response => {
                API.post('/api/addUserGroups',{'user_id':this.selected_user.id,'usergroups' : newUserGroupRelations})
                .then(response => {
                      this.responseMessage = response.data
                      this.$emit('close');
                      this.$emit('updateList');
                      this.$emit('displaySuccess','added',true,'User')
                  })
                  .catch(e => {
                      this.errorMessage = e
                      this.$emit('close');
                      this.$emit('displaySuccess','added',false,'User')
                  })
            })
            .catch(e => {
                this.errorMessage = e
                this.$emit('close');
                this.$emit('displaySuccess','update',false,'User')
            })
      },
        onUpdate: function() {
            this.$v.$touch();
            if(this.$v.$error) return
            this.addUser();
        }
    },
  };
</script>