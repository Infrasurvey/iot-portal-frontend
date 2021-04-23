<template>
    <nav class="sidenav-install">

        <ul class="sidenav-install-ul">
            <li>
                <input type="checkbox" id="btn"/>
                <label for="btn" class="show">
                <div class="nav-group"><router-link class="basic-link" :to="{ name: 'ManageInstallations'}">Installations</router-link></div>
                <div class="nav-group"><router-link class="basic-link" :to="{ name: 'ManageUsers'}">Users</router-link></div> 
                <div class="nav-group">
                     <span>Organizations</span>
                    <button class="add-btn-right" @click="onCreateClick">
                        <font-awesome-icon class="" icon="plus-circle" size="2x" />
                    </button>
                    <button class="dropdown-btn" :id="'dropdown-btn-main'">
                        <font-awesome-icon icon="caret-down" size="2x" />
                    </button>
                    <div class="dropdown-container">
                        <organization-item  v-for="organization in organizations" :key="organization.id" :organization="organization" @updateList="getOrganizations"/>
                    </div>
                </div> 
                </label>
            </li>
        </ul>
        <Modal
                v-if="isModalVisible"
                :row="selectedRow"
                :isUpdate="isUpdate"
                @close="closeModal"
                @updateList="getOrganizations"
                @displaySuccess="displayStatus"
                />
    </nav>
   
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
        setDropdownListener('dropdown-btn-main')
    },
    methods:{
        getOrganizations(){
            API.get('/api/organizationWithGroups')
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