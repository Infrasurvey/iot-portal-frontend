<template>
    <div>
        <sidenav-manage></sidenav-manage>
        <div class="main-install overview-inst">
            <div class="home-header">
                <h1>Manage users</h1>
            </div>
            <Modal
                v-if="isModalVisible"
                :row="selectedRow"
                :isUpdate="isUpdate"
                @close="closeModal"
                @updateList="getUsers"
                @displaySuccess="displayStatus"
                />
            <vue-good-table
            :columns="columns"
            :rows="users"
            @on-row-click="onRowClick"/>
        
            <div >
                <button type="submit" class="apply-btn">Apply</button>
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
        Modal
    },
    data(){
        return {
            users : [],
            columns: [
                {
                label: 'ID',
                field: 'id',
                },
                {
                label: 'Name',
                field: 'name',
                },
                {
                 label:'E-mail',
                 field:'email'
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
            isUpdate : false
        }
    },
    created(){
        this.getUsers();
        
    },
    methods:{
        getUsers(){
            API.get('/api/usersWithGroups')
            .then(response => {
                this.users =response.data
                this.users.forEach(user => {
                    var tmp = []
                    var groups = []
                    user.displaygroupnames = tmp.toString()
                    user.groupsId = groups
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