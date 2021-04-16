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
               <label for="organization">User's group :</label>
              <v-select :options="groups" label="name" multiple="multiple" v-model="groups_selected"/>
                <label for="admin">User is admin for :</label>
                <div>
                    <div v-for="group in groups_selected" :key="group.id">
                        <input type="checkbox"  :name="group.id" :id="group.id" :value="group.id" v-model="group.is_group_admin">
                        {{group.name}}
                    </div>
                </div>

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
            groups_selected : this.row.groupsId || '',
            errorMessage: '',
            errors: [],
            responseMessage: '',
            groups : []
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
    created(){
        this.getGroups()
    },
    methods: {
      close() {
        this.$emit('close');
      },
      getGroups: function (){
          API.get('/api/group')
          .then(response => {
                this.groups = response.data
                this.groups.forEach(group =>{
                    group.is_group_admin=false
                })
            })
            .catch(e => {
                this.errorMessage = e
            })
      },
      updateUser: function (){
          var newUserGroupRelations = []
          this.groups_selected.forEach(group => {
              var pivot = {
                  'user_id':this.row.id,
                  'group_id' :group.id,
                  'is_group_admin':group.is_group_admin
              }
              newUserGroupRelations.push(pivot);
          });
          console.log(newUserGroupRelations)
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