<template>
    <div>
        <sidenav-manage></sidenav-manage>
        <div class="main-install overview-inst">
            <div class="home-header">

                <h1>Manage organizations</h1>
                <h1 class="btn-create-install">
                    <button type="button" class="btn" @click="onCreateClick" >+ Create a new organization </button>
                </h1>
            </div>
            <Modal
                v-if="isModalVisible"
                :row="selectedRow"
                :isUpdate="isUpdate"
                @close="closeModal"
                @updateList="getOrganizations"
                @displaySuccess="displayStatus"
                />
            <vue-good-table
            :columns="columns"
            :rows="organizations"
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
            organizations : [],
            columns: [
                {
                label: 'ID',
                field: 'id',
                },
                {
                label: 'Name',
                field: 'name',
                }
            ],
            isModalVisible: false,
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
        onRowClick(params) {
            this.showModal(true,params.row);
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