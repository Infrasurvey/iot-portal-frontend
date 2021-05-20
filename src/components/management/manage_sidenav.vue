<template>
  <div style="padding: 20px;">
    <div style="font-weight: bold; margin-bottom: 10px;">Management board</div>
    <md-list  style="background-color: inherit;">
      <md-list-item :to="{ name: 'ManageInstallations' }">Installations</md-list-item>
      <md-list-item :to="{ name: 'ManageUsers'}">Users</md-list-item>
    </md-list>

    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
      <div style="font-weight: bold;">Organizations</div>
      <md-button class="md-icon-button" @click="onCreateClick">
        <md-icon>add</md-icon>
      </md-button>
    </div>
    <organization-item v-for="organization in organizations" :key="organization.id" :organization="organization" @updateList="getOrganizations"/>

  <Modal
    v-if="isModalVisible"
    :row="selectedRow"
    :isUpdate="isUpdate"
    @close="closeModal"
    @updateList="getOrganizations"
    @displaySuccess="displayStatus"
    />
  </div>
</template>

<script>
//                <div class="nav-group"><router-link class="basic-link" :to="{ name: 'ManageGroups'}">Groups</router-link></div> 
import API from '../../http-constants'
import OrganizationItem from './sidenav_organization_element' 
import setDropdownListener from '../../assets/js/dropdown_sidenav'
import Modal from './modal_organization';

export default {
  name: 'sidenav-manage',
  components:{
    'organization-item':OrganizationItem,
    Modal
  },
  data(){
    return{
      organizations : [],
      isModalVisible: false,
      selectedRow : Object(),
      isUpdate : false
    }
  },
  created(){
    this.getOrganizations()
  },
  mounted(){
    //setDropdownListener('dropdown-btn-main')
  },
  methods:{
    getOrganizations(){
      API.get('/api/getCurrentVisibleOrganizations')
      .then(response => {
        this.organizations =response.data        
      })
      .catch(e => {
        this.errorMessage = e
      })
    },
    onCreateClick() {
      this.showModal(false,Object({name:''}));
    },
    showModal(isUpdate,selectedRow){
      this.selectedRow = selectedRow;
      this.isUpdate = isUpdate
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    displayStatus(type,status){
      if(status){
        this.flashMessage.success({title: 'Success', message: 'The new organization has been succesfully '+type+' !'});
      }
      else
      {
        this.flashMessage.show({status: 'error', title: 'Error', message: 'An error occured during organization '+type+'.'})
      }
    }
  }
}
</script>