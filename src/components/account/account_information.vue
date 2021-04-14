<template>
    <div>
        <sidenav-account></sidenav-account>
        <div class="main-install overview-inst">
            <h1>Personal informations</h1>
            <form action="" class="flex-input-container">
                <div class="input-container">
                    <label for="first-name">First name</label>
                    <input type="text" v-model="user.name" name="first-name" id="first-name" :class="{ 'hasError': $v.user.name.$error }">
                </div>
                <div class="input-container">
                    <label for="last-name">Last name</label>
                    <input type="text" v-model="user.lastname" name="last-name" id="last-name" :class="{ 'hasError': $v.user.lastname.$error }">
                </div>
                <div class="input-container">
                    <label for="email">Email</label>
                    <input type="text" v-model="user.email" name="email" id="email" :class="{ 'hasError': $v.user.email.$error }">
                </div>
                <div class="input-container">   
                    <label for="phone">Mobile phone number</label>
                    <input type="text" v-model="user.phone" name="phone" id="phone" :class="{ 'hasError': $v.user.phone.$error }">
                </div>
                <div class="input-container">
                    <label for="language">Language</label>
                    <select name="language" id="language" v-model="user.language" :class="{ 'hasErrorRegister': $v.user.language.$error }">
                        <option value="" disabled selected>Select a preferred language</option>
                        <option value="en" selected>English</option>
                        <option value="fr">French</option>
                    </select>
                </div>
            </form>
            <div >
                <button type="submit" @click="updateUser" class="apply-btn">Apply</button>
            </div>
        </div>
    </div>
</template>

<script>
import Sidenav from './account_sidenav'
import API from '../../http-constants'
import { required,email } from 'vuelidate/lib/validators'

export default {
    name: 'Informations',
    components : {
        'sidenav-account' :Sidenav
    },
    data(){
        return{
            user:'',
            errorMessage:'',
            status:''
        }
    },
    validations: {
        user:{
            name:{
                required
            },
            lastname:{
                required
            },
            phone:{
                required
            },
            email:{
                required,
                email
            },
            language:{
                required
            }
        }
   },
    created(){
        this.getUser();
    },
    methods:{
        getUser(){
            API.get('/api/getCurrentUser')
            .then(response => {
                this.user =response.data                
            })
            .catch(e => {
            this.errorMessage = e
            })
        },
        updateUser(){
            this.$v.$touch();
            if(this.$v.$error) return
            API.put('/api/user/'+this.user.id,this.user)
            .then(response => {
                this.status =response.data                
            })
            .catch(e => {
                this.errorMessage = e
            })
        }
    }
}
</script>
