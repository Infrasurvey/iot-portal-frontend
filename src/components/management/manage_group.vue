<template>
    <div>
        <sidenav-manage></sidenav-manage>
        <div class="main-install overview-inst">
            <div class="home-header">

                <h1>Manage groups</h1>
                <h1 class="btn-create-install">
                    <button type="button" class="btn" @click="onCreateClick" >+ Create a new group </button>
                </h1>
            </div>
            <Modal
                v-if="isModalVisible"
                :row="selectedRow"
                :isUpdate="isUpdate"
                @close="closeModal"
                @updateList="getGroups"
                @displaySuccess="displayStatus"
                />
            <vue-good-table
            :columns="columns"
            :rows="groups"
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
import Modal from './modal_group';

export default {
    name: 'ManageGroup',
    components : {
        'sidenav-manage' :Sidenav,
        VueGoodTable,
        Modal
    },
    data(){
        return {
            groups : [],
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
                 label:'Organization',
                 field:'organization.name'
                }
            ],
            isModalVisible: false,
            selectedRow : Object(),
            isUpdate : false
        }
    },
    created(){
        this.getGroups();
        
    },
    methods:{
        getGroups(){
            API.get('/api/group')
            .then(response => {
            this.groups =response.data
            })
            .catch(e => {
            this.errorMessage = e
            })
        },
        onRowClick(params) {
            this.showModal(true,params.row);
        },
        onCreateClick() {
            this.showModal(false,Object({name:'',organization:{name:''}}));
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