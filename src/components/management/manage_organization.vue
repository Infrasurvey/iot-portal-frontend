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
            <modal-organization
                v-if="isInstallModalVisible"
                :row="selectedRow"
                :isUpdate="isUpdate"
                @close="closeModal"
                @updateList="getInstallations"
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
            <modal-user
                v-if="isUserModalVisible"
                :row="selectedRow"
                :isUpdate="true"
                @close="closeModal"
                @updateList="getUsers"
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
import ModalOrga from './modal_installation';
import ModalUser from './modal_user';

export default {
    name: 'ManageOrganization',
    components : {
        'sidenav-manage' :Sidenav,
        VueGoodTable,
        'modal-organization':ModalOrga,
        'modal-user' : ModalUser
    },
    data(){
        return {
            organization_id:this.$route.query.id,
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
    watch: {
    $route(to, from) {
        this.organization_id = this.$route.query.id
        this.getInstallations();
        this.getUsers();
    }
    },
    created(){
        this.getInstallations();
        this.getUsers();
    },
    methods:{
        getInstallations(){
            API.get('/api/getInstallationsByOrganization/'+this.organization_id)
            .then(response => {
                this.installations =response.data
            })
            .catch(e => {
                this.errorMessage = e
            })
        },
        getUsers(){
            API.get('/api/getUsersByOrganization/'+this.organization_id)
            .then(response => {
                this.users =response.data
                this.users.forEach(user => {
                    var tmp = []
                    var groups = []
                    user.groups.forEach(group => {
                        tmp.push(group.name)
                        groups.push(group)
                    })
                    user.displaygroupnames = tmp.toString()
                    user.groupsId = groups
                });
                
            })
            .catch(e => {
            this.errorMessage = e
            })
        },
        onUserClick(params) {
            this.showModal(true,params.row,true);
        },
        onInstallationClick(params) {
            this.showModal(true,params.row,false);
        },
        onCreateInstallationClick() {
            this.showModal(false,Object({name:'',organization:{name:''}}),false);
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
        closeModal() {
            this.isUserModalVisible = false;
            this.isInstallModalVisible = false;
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