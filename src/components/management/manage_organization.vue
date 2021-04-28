<template>
    <div>
        <sidenav-manage></sidenav-manage>
        <div class="main-install overview-inst">
            <div class="home-header">
                <h1>Installations list</h1>
                <h1 class="btn-create-install">
                    <button type="button" class="btn" @click="onCreateInstallationClick" disabled style="background-color:gray; border-color:gray">Create a new installation </button>
                </h1>
            </div>
            <modal-installation
                v-if="isInstallModalVisible"
                :row="selectedRow"
                :isUpdate="isUpdate"
                :organization_id="organization_id.toString()"
                :group_id="null"
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
                    <button type="button" class="btn" @click="onAddUserClick" >Add a new user in this organization</button>
                </h1>
            </div>
            <modal-user
                v-if="isUserModalVisible"
                :row="selectedRow"
                :isUpdate="true"
                :organization_id="organization_id.toString()"
                :group_id="null"
                @close="closeModal"
                @updateList="updateUsersLists"
                @displaySuccess="displayStatus"
                />
            <vue-good-table
            :columns="usercolumns"
            :rows="users"
            @on-row-click="onUserClick"/>

            <div class="home-header">
                <h1>Responsible list</h1>
                <h1 class="btn-create-install">
                    <button type="button" class="btn" @click="onAddAdminClick" >Add a new admin in this organization</button>
                </h1>
            </div>

            <add-user
                v-if="isUserAddModalVisible"
                :isAdmin="isAdmin"
                :organization_id="organization_id.toString()"
                :group_id="null"
                @close="closeModal"
                @updateList="updateUsersLists"
                @displaySuccess="displayStatus"
                />
            
            <vue-good-table
            :columns="usercolumns"
            :rows="admins"
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
import ModalInstall from './modal_installation';
import ModalUser from './modal_user';
import ModalAddUser from './modal_add_user';

export default {
    name: 'ManageOrganization',
    components : {
        'sidenav-manage' :Sidenav,
        VueGoodTable,
        'modal-installation':ModalInstall,
        'modal-user' : ModalUser,
        'add-user' : ModalAddUser
    },
    data(){
        return {
            organization_id:this.$route.query.id ,
            installations : [],
            users : [],
            tmpusers : [],
            admins: [],
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
                },
                {
                 label:'Organizations',
                 field:'displayorganizations',
                 hidden: true
                },
                {
                 label:'organizationsstruct',
                 field:'organizations',
                 hidden: true
                },
                {
                 label:'Groups',
                 field:'displaygroupnames',
                 hidden: true
                },
                {
                 label:'groupstruct',
                 field:'groupsId',
                 hidden: true
                }
            ],
            isUserModalVisible: false,
            isUserAddModalVisible: false,
            isInstallModalVisible: false,
            selectedRow : Object(),
            isUpdate : false,
            isAdmin : false
        }
    },
    watch: {
    async $route(to, from) {
        this.organization_id = this.$route.query.id
        this.getInstallations();
        await this.getUsers();
        await this.getAdmins()
        this.setDiffUsersList()
    }
    },
    async created(){
        this.getInstallations();
        await this.getUsers();
        await this.getAdmins();
        this.setDiffUsersList()
    },
    methods:{
        async updateUsersLists(){
            await this.getUsers();
            await this.getAdmins()
            this.setDiffUsersList()
        },
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
            return API.get('/api/getUsersByOrganization/'+this.organization_id)
            .then(response => {
                this.tmpusers =response.data
                this.tmpusers.forEach(user => {
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
        getAdmins(){
            return API.get('/api/getAdminsByOrganization/'+this.organization_id)
            .then(response => {
                this.admins =response.data
                this.admins.forEach(admin => {
                    var tmpGroups = []
                    var groups = []
                    admin.groups.forEach(group => {
                        tmpGroups.push(group.name)
                        groups.push(group)
                    })
                    var tmpOrga = []
                    var organizations = []
                    admin.organizations.forEach(organization => {
                        tmpOrga.push(organization.name)
                        organizations.push(organization)
                    })
                    admin.displaygroupnames = tmpGroups.toString()
                    admin.groupsId = groups
                    admin.displayorganizations = tmpOrga.toString()
                    admin.organizations = organizations
                });
                
            })
            .catch(e => {
            this.errorMessage = e
            })
        },
        setDiffUsersList(){
            function comparer(otherArray){
                return function(current){
                    return otherArray.filter(function(other){
                        return other.id == current.id && other.name == current.name
                    }).length == 0;
                }
            }
            this.users = this.tmpusers.filter(comparer(this.admins))

        },
        onUserClick(params) {
            this.showModal(true,params.row,true);
        },
        onInstallationClick(params) {
            this.showModal(true,params.row,false);
        },
        onCreateInstallationClick() {
            this.showModal(false,Object({name:'',organization:{id:this.organization_id}}),false);
        },
        onAddUserClick() {
            this.isUserAddModalVisible=true
            this.isAdmin = false
        },
        onAddAdminClick() {
            this.isUserAddModalVisible=true
            this.isAdmin = true
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
            this.isUserAddModalVisible=false;
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