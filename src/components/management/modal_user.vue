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
              <multiselect @input="setSelectedGroups" :disabled="group_id !=null ? true : false" @remove="removeOrganization" v-model="organizations_selected" :options="organizations" label="name" :showLabels="true"  selectedLabel="Selected" selectLabel="Select this organization" deselect-label="Remove this organization" track-by="id" :taggable="true" :searchable="false" :close-on-select="true" :multiple="true" ></multiselect> 
              
               <label for="groups">User's group :</label>
              <multiselect v-model="final_groups_selected" @remove="removeGroup" :options="groups" label="name" :showLabels="true"  selectedLabel="Selected" selectLabel="Select this group" deselect-label="Remove this group" track-by="id" :taggable="true" :searchable="false" :close-on-select="true" :multiple="true" ></multiselect> 

          </form>

        </div>
       </section>
       <footer class="modal-footer">
            <button type="button" v-if="isUpdate" class="" @click="showDeleteAlert" disabled>Delete user</button>
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
      isUpdate : Boolean,
      organization_id : String,
      group_id : String
  },
    components:{
        Multiselect
    },
    data(){
        return{
            name:this.row.name || '',
            organizations_selected : [],
            organizations_of_user : this.row.organizations || '',
            groups_selected : this.row.groupsId || '',
            final_groups_selected : [],
            errorMessage: '',
            errors: [],
            responseMessage: '',
            groups : [],
            organizations : [],
            groupsToRemove : [],
            organizationsToRemove : [],
            groups_temp : []
        }
    },
    validations: {
        name:{
          required
        },
        final_groups_selected:{
          required
        }
   },
    async created(){
        await this.getGroups()
        await this.getOrganizations()
        this.organizations_of_user.forEach(organization => {
          var orga = this.organizations.find(function(orga) {
            return orga.id === this.id;
          }, organization);
          if(!(orga === undefined))
          {
            this.organizations_selected.push(organization)
          }
        })
        this.setSelectedGroups()

    },
    methods: {
      close() {
        this.$emit('close');
      },
      getGroups(){
          var url = ''
          if(this.group_id !=null){
                url = '/api/group/'+this.group_id
          }else{
              if (this.organization_id == null)
                url = '/api/getCurrentVisibleGroups'
              else
                url = '/api/getGroupsByOrganization/'+this.organization_id     
          }
     
          return API.get(url)
          .then(response => {
                if(!Array.isArray(response.data))
                  this.groups = [response.data]
              else
                  this.groups = response.data
            })
            .catch(e => {
                this.errorMessage = e
            })
      },
      getOrganizations(){
        var url = ''

        if(this.group_id !=null){
             url = '/api/getGroupWithOrganization/'+this.group_id
             return API.get(url).then(response => {
                    this.groups_temp = [response.data]
                    this.organizations = [response.data.organization]
                })
            .catch(e => {
                this.errorMessage = e
            })
        }else{
          if (this.organization_id == null)
            url = '/api/getCurrentVisibleOrganizations'
          else
            url = '/api/organizationWithGroups/'+this.organization_id
          return API.get(url).then(response => {
            if(!Array.isArray(response.data))
                this.organizations = [response.data]
            else
                this.organizations = response.data

            })
            .catch(e => {
                this.errorMessage = e
            })
        }
      },
      setSelectedGroups(){
        
        var selectedGroups = Array()

        this.organizations_of_user.forEach(organization => {
          var orga = this.organizations.find(function(orga) {
            return orga.id === this.id;
          }, organization);
          if(!(orga === undefined))
          {
            if(this.group_id !=null)
              selectedGroups = selectedGroups.concat(this.groups_temp);
            else
              selectedGroups = selectedGroups.concat(orga.groups);
          }
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
        var new_selected_list = Array()
        this.groups_selected.forEach(group => {
            if (this.groups.some(function(gr) {return gr.id === this.id;}, group))
              new_selected_list.push(group)
        });
        this.final_groups_selected = new_selected_list;
        this.groups.forEach(group => {
            if (selectedGroups.some(function(gr) {return gr.id === this.id;}, group)) {
              group['$isDisabled'] = true
            }
            else{
                group['$isDisabled'] = false
            }
        });
        console.log(this.organizations_selected)
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
          this.final_groups_selected.forEach(group => {
              var pivot = {
                  'user_id':this.row.id,
                  'group_id' :group.id
              }
              newUserGroupRelations.push(pivot);
          });
          API.post('/api/updateUserOrganizations',{'user_id':this.row.id,'userorganizations' : newUserOrganizationRelations, 'relationstoremove' : this.organizationsToRemove})
          .then(response => {
                API.post('/api/updateUserGroups',{'user_id':this.row.id,'usergroups' : newUserGroupRelations, 'relationstoremove' : this.groupsToRemove})
                .then(response => {
                      this.responseMessage = response.data
                      this.$emit('close');
                      this.$emit('updateList');
                      this.$emit('displaySuccess','updated',true,'User')
                  })
                  .catch(e => {
                      this.errorMessage = e
                      this.$emit('close');
                      this.$emit('displaySuccess','update',false,'User')
                  })
            })
            .catch(e => {
                this.errorMessage = e
                this.$emit('close');
                this.$emit('displaySuccess','update',false,'User')
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
                      this.$emit('displaySuccess','deleted',true,'User')
                  })
                  .catch(e => {
                      this.errorMessage = e
                      this.$emit('close');
                      this.$emit('displaySuccess','delete',false,'User')
                  })
                  }
            });
      },
      removeOrganization(removedOption,id){
          this.organizationsToRemove.push({
                  'user_id':this.row.id,
                  'organization_id' :removedOption.id
              })
      },
      removeGroup(removedOption,id){
          this.groupsToRemove.push({
                  'user_id':this.row.id,
                  'group_id' :removedOption.id
              })
      },
        onUpdate: function() {
            this.$v.$touch();
            if(this.$v.$error) return
            this.updateUser();
        }
    },
  };
</script>