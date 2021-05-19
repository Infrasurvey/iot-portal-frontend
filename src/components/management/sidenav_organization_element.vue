<template>
  <md-list-item md-expand>
    <span class="md-list-item-text">{{ organization.name }}</span>

    <md-list slot="md-expand">
      <md-list-item  v-for="group in organization.groups" :key="group.id" :to="{ name: 'ManageGroup', query: { id: group.id }}" class="md-inset">{{ group.name }}</md-list-item>
    </md-list>

    <Modal
      v-if="isModalVisible"
      :row="selectedRow"
      :isUpdate="isUpdate"
      @close="closeModal"
      @updateList="updateList"
      @displaySuccess="displayStatus"
    />
  </md-list-item>

    <!-- <div class="sub-nav-group">
        <router-link class="basic-link" :to="{ name: 'ManageOrganization', query: { id: organization.id } }">{{organization.name}}</router-link>
          <button class="add-btn-right" @click="onCreateClick">
            <font-awesome-icon class="" icon="plus-circle" size="2x" />
        </button>
        <button class="dropdown-btn" :id="'dropdown-btn-'+organization.id">
            <font-awesome-icon icon="caret-down" size="2x" />
        </button>
      
        <div class="dropdown-container">
            <div class="sub-sub-nav-group " v-for="group in organization.groups" :key="group.id">
                <router-link class="basic-link" :to="{ name: 'ManageGroup', query: { id: group.id }}">{{group.name}}</router-link>
            </div>
        </div>
        <Modal
                v-if="isModalVisible"
                :row="selectedRow"
                :isUpdate="isUpdate"
                @close="closeModal"
                @updateList="updateList"
                @displaySuccess="displayStatus"
                />
    </div>  -->
</template>

<script>
import setDropdownListener from '../../assets/js/dropdown_sidenav'
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
            isUpdate : false
        }
    },
    mounted(){
        setDropdownListener('dropdown-btn-'+this.organization.id)
    },
    methods:{
        onCreateClick() {
            this.showModal(false,Object({name:'',organization_id:this.organization.id}));
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