<template>
    <div>
        <div class="main-install overview-inst">
            <div class="home-header">

                <h1>Manage installations</h1>
            </div>
            <Modal
                v-if="isModalVisible"
                :row="selectedRow"
                :isUpdate="isUpdate"
                :organization_id="null"
                @close="closeModal"
                @updateList="getInstallations"
                @displaySuccess="displayStatus"
                />
            <vue-good-table
            :columns="columns"
            :rows="installations"
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
import Modal from './modal_installation';

export default {
    name: 'm-installations',
    components : {
        'sidenav-manage' :Sidenav,
        VueGoodTable,
        Modal
    },
    data(){
        return {
            installations : [],
            columns: [
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
                label: 'Organization',
                field: 'group.organization.name',
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
            isModalVisible: false,
            selectedRow : Object(),
            isUpdate : false
        }
    },
    created(){
        this.getInstallations();
    },
    methods:{
        getInstallations(){
            API.get('/api/getVisibleInstallations')
            .then(response => {
                this.installations =response.data
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
                this.flashMessage.success({title: 'Success', message: 'Installation has been succesfully '+type+' !'});
            }
            else
            {
                this.flashMessage.show({status: 'error', title: 'Error', message: 'An error occured during installation '+type+'.'})
            }
        }
    }
}
</script>