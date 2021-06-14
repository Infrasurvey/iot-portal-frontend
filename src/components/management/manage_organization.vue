<template>
    <div>
        <div class="main-install overview-inst">
            <section-title title= "Installations list"></section-title>
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

            <section-title title= "Users list"></section-title>
                
            <modal-user
                v-if="isUserModalVisible"
                :row="selectedRow"
                :isUpdate="true"
                :isAdmin="isAdmin"
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

                <h1 class="btn-create-install">
                    <button type="button" class="btn" @click="onAddUserClick" >Add a new user in this organization</button>
                </h1>
            <section-title title= "Responsible list"></section-title>
                
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
                <h1 class="btn-create-install">
                    <button type="button" class="btn" @click="onAddAdminClick" >Add a new admin in this organization</button>
                </h1>
            
            <div class="manage-footer">
                <md-button class="md-icon-button del-btn" @click="onDeleteClick">
                    <md-icon style="color :#AB000D">delete</md-icon>
                </md-button>
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
import SectionTitle from '../template/SectionTitle';

export default {
    name: 'ManageOrganization',
    components : {
        'sidenav-manage' :Sidenav,
        VueGoodTable,
        'modal-installation':ModalInstall,
        'modal-user' : ModalUser,
        'add-user' : ModalAddUser,
        SectionTitle
    },
    data(){
        return {
            organization_id:this.$route.query.id ,
            installations : [],
            users : [],
            tmpusers : [],
            admins: [],
            isAdmin : false,
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
            this.isAdmin = this.$store.getters.getAbility.can('manage','all')
            this.getInstallations();
            await this.getUsers();
            await this.getAdmins()
            this.setDiffUsersList()
        }
    },
    beforeRouteUpdate(to, from, next) {
        var ability = this.$store.getters.getAbility;
            if(ability.can('manage_orga',to.query.id.toString()) || ability.can('manage','all'))
            {
            next()
            }
            else{
            next({
                name: 'home',
            })
            }
    },
    async created(){
        this.getInstallations();
        this.isAdmin = this.$store.getters.getAbility.can('manage','all')
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
                this.flashMessage.success({title: 'Success', message: 'The '+model+' has been succesfully '+type+' !'});
            }
            else
            {
                this.flashMessage.show({status: 'error', title: 'Error', message: 'An error occured during '+model+' '+type+'.'})
            }
        },
        onDeleteClick(){
          this.$swal({
              title: "Delete this organization?",
              text: "Are you sure? You won't be able to revert this!",
              type: "warning",
              icon:"warning",
              customClass:{
                container :'swa-container' 
              },
              showCancelButton: true,
              confirmButtonColor: "#E53935",
              confirmButtonText: "Yes, Delete it!"
          }).then((result) => { // <--
                if (result.value) { // <-- if confirmed
                  API.delete('/api/organization/'+this.organization_id)
                .then(response => {
                    this.installations =response.data
                    this.displayStatus("deleted",true,'organization')
                    this.$emit('updateList');
                    this.$router.push({ name: 'ManageInstallations' })
                })
                .catch(e => {
                    this.errorMessage = e
                    this.displayStatus("delete",false,'organization')
                })
                  }
            });
      },
    }
}
</script>