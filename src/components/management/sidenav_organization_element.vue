<template>
  <md-list v-if="this.$store.getters.getAbility.can('manage_orga', this.organization.id.toString()) || this.$store.getters.getAbility.can('manage','all')" style="background-color: inherit;">
    <md-list-item>
      <span class="md-list-item-text">
      <md-button style="text-transform: inherit; text-align: inherit; color: inherit; font-size: inherit;" :to="{ name: 'ManageOrganization', query: { id: organization.id }}">{{ organization.name }}</md-button>

        <!-- <router-link style="color: inherit; text-decoration: none;" :to="{ name: 'ManageOrganization', query: { id: organization.id }}">{{ organization.name }}</router-link> -->
      </span>
      <md-button class="md-icon-button" @click="expandMore">
        <md-icon v-if="myExpand == false">expand_more</md-icon>
        <md-icon v-else>expand_less</md-icon>
      </md-button>
      <md-button class="md-icon-button" @click="onCreateClick">
        <md-icon>add</md-icon>
      </md-button>
    </md-list-item>
    <div v-if="myExpand == true">
      <md-list-item  v-for="group in organization.groups" :key="group.id" :to="{ name: 'ManageGroup', query: { id: group.id }}" class="md-inset">{{ group.name }}</md-list-item>
    </div>

    <Modal
      v-if="isModalVisible"
      :row="selectedRow"
      :isUpdate="isUpdate"
      @close="closeModal"
      @updateList="updateList"
      @displaySuccess="displayStatus"
    />
  </md-list>
</template>

<script>
import Modal from './modal_group';

export default {
  name: 'organization-item',
  components :{
    Modal
  },
  props:{
   organization: {
     type: Object,
     required : true
   }
  },
  data(){
    return{
      isModalVisible: false,
      selectedRow : Object(),
      isUpdate : false,
      myExpand: false
    }
  },
  methods:{
    onCreateClick() {
      this.showModal(false,Object({name:'',organization_id:this.organization.id}));
    },
    expandMore() {
      this.myExpand = !this.myExpand;
    },
    showModal(isUpdate,selectedRow){
      this.selectedRow = selectedRow;
      this.isUpdate = isUpdate
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    updateList(){
      this.$emit('updateList');
    },
    displayStatus(type,status){
     if(status){
       this.flashMessage.success({title: 'Success', message: 'The new group has been succesfully '+type+' !'});
     }
     else
     {
       this.flashMessage.show({status: 'error', title: 'Error', message: 'An error occured during group '+type+'.'})
     }
    }
  }
}
</script>