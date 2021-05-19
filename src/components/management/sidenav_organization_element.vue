<template>
  <md-list>
    <md-list-item>
      <span class="md-list-item-text md-no-proxy">{{ organization.name }}</span>
      <md-button class="md-icon-button" @click="expandMore">
        <md-icon>expand_more</md-icon>
      </md-button>
    </md-list-item>
    <div v-if="myExpand == true">
      <md-list-item v-for="group in organization .groups" :key="group.id" class="md-inset">
        <router-link :to="{ name: 'ManageInstallations' }" class="navigation-menu-item">{{ group.name }}</router-link>
        <md-button class="md-icon-button" @click="onCreateClick">
          <md-icon>add</md-icon>
        </md-button>
      </md-list-item>
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