<template>
    <div>
        
        <div class="main-install overview-inst">
            <div class="home-header">
                <h1>Manage users</h1>
            </div>
            <modal-user
                v-if="isModalVisible"
                :row="selectedRow"
                :isUpdate="isUpdate"
                :organization_id="null"
                :group_id="null"
                @close="closeModal"
                @updateList="getUsers"
                @displaySuccess="displayStatus"
                />
            <vue-good-table
            :columns="columns"
            :rows="users"
            @on-row-click="onRowClick"/>

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
import Modal from './modal_user';

export default {
    name: 'ManageUsers',
    components : {
        'sidenav-manage' :Sidenav,
        VueGoodTable,
        'modal-user' :Modal,
    },
    data(){
        return {
            users : [],
            columns: [
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
                },
                {
                 label:'Organizations',
                 field:'displayorganizations'
                },
                {
                 label:'organizationsstruct',
                 field:'organizations',
                 hidden: true
                },
                {
                 label:'Groups',
                 field:'displaygroupnames'
                },
                {
                 label:'groupstruct',
                 field:'groupsId',
                 hidden: true
                }
            ],
            isModalVisible: false,
            selectedRow : Object(),
            isUpdate : false,
        }
    },
    created(){
        this.getUsers();
    },
    methods:{
        getUsers(){
            API.get('/api/getVisibleUsers')
            .then(response => {
                this.users =response.data
                this.users.forEach(user => {
                    var tmpGroups = []
                    var groups = []
                    user.groups.forEach(group => {
                        tmpGroups.push(group.name)
                        groups.push(group)
                    })
                    var tmpOrga = []
                    var organizations = []
                    user.organizations.forEach(organization => {
                        tmpOrga.push(organization.name)
                        organizations.push(organization)
                    })
                    user.displaygroupnames = tmpGroups.toString()
                    user.groupsId = groups
                    user.displayorganizations = tmpOrga.toString()
                    user.organizations = organizations
                });
                
            })
            .catch(e => {
            this.errorMessage = e
            })
        },
        onRowClick(params) {
            this.showModal(true,params.row);
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
            this.flashMessage.success({title: 'Success', message: 'User has been succesfully '+type+' !'});
        }
        else
        {
            this.flashMessage.show({status: 'error', title: 'Error', message: 'An error occured during user '+type+'.'})
        }
        }
    }
}
</script>