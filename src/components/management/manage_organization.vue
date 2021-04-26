<template>
    <div>
        <sidenav-manage></sidenav-manage>
        <div class="main-install overview-inst">
            <div class="home-header">
                <h1>Installations list</h1>
                <h1 class="btn-create-install">
                    <button type="button" class="btn" @click="onCreateInstallationClick" >Create a new installation </button>
                </h1>
            </div>
            <Modal
                v-if="isInstallModalVisible"
                :row="selectedRow"
                :isUpdate="isUpdate"
                @close="closeModal"
                @updateList="getOrganizations"
                @displaySuccess="displayStatus"
                />
            <vue-good-table
            :columns="installationcolumns"
            :rows="installations"
            @on-row-click="onInstallationClick"/>
        

            <div class="home-header">
                <h1>Users list</h1>
                <h1 class="btn-create-install">
                    <button type="button" class="btn" @click="onAddUserClick" >Add a new user in this group</button>
                </h1>
            </div>
            <Modal
                v-if="isUserModalVisible"
                :row="selectedRow"
                :isUpdate="isUpdate"
                @close="closeModal"
                @updateList="getOrganizations"
                @displaySuccess="displayStatus"
                />
            <vue-good-table
            :columns="usercolumns"
            :rows="users"
            @on-row-click="onUserClick"/>
            <div >
                <router-link class="basic-link cancel-btn" :to="{ name: 'home' }">Cancel</router-link>
            </div>
            <FlashMessage></FlashMessage>
        </div>
    </div>
</template>

<script>
import Sidenav from './manage_sidenav'
import API from '../../http-constants'
import { VueGoodTable } from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css'
import Modal from './modal_organization';

export default {
    name: 'ManageOrganization',
    components : {
        'sidenav-manage' :Sidenav,
        VueGoodTable,
        Modal
    },
    data(){
        return {
            installations : [],
            users : [],
            installationcolumns: [
                 {
                label: 'ID',
                field: 'id',
                hidden: true
                },
                {
                label: 'Name',
                field: 'name',
                },
                {
                 label:'Group',
                 field:'group.name'
                },
                {
                 label:'Base station',
                 field:'basestation.name'
                }
            ],
            usercolumns: [
                {
                label: 'ID',
                field: 'id',
                hidden: true
                },
                {
                label: 'First Name',
                field: 'name',
                },
                {
                label: 'Last Name',
                field: 'lastname',
                },
                {
                label: 'Phone Number',
                field: 'phone',
                },
                {
                 label:'E-mail',
                 field:'email'
                }
            ],
            isUserModalVisible: false,
            isInstallModalVisible: false,
            selectedRow : Object(),
            isUpdate : false
        }
    },
    created(){
        this.getOrganizations();
        
    },
    methods:{
        getOrganizations(){
            API.get('/api/organization')
            .then(response => {
            this.organizations =response.data
            })
            .catch(e => {
            this.errorMessage = e
            })
        },
        onUserClick(params) {
            this.showModal(true,params.row);
        },
        onInstallationClick(params) {
            this.showModal(true,params.row);
        },
        onCreateInstallationClick() {
            this.showModal(false,Object({name:''}));
        },
        onAddUserClick() {
            //this.showModal(false,Object({name:''}));
        },
        showModal(isUpdate,selectedRow,isUser){
            this.selectedRow = selectedRow;
            this.isUpdate = isUpdate
            if(isUser){
                this.isUserModalVisible = true;
            }else{
               this.isInstallModalVisible = true;
            }
        },
        closeModal(isUser) {
            if(isUser){
                this.isUserModalVisible = false;
            }else{
               this.isInstallModalVisible = false;
            }
        },
        displayStatus(type,status,model){
        if(status){
            this.flashMessage.success({title: 'Success', message: 'The new '+model+' has been succesfully '+type+' !'});
        }
        else
        {
            this.flashMessage.show({status: 'error', title: 'Error', message: 'An error occured during '+model+' '+type+'.'})
        }
        }
    }
}
</script>