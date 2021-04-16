<template>
    <div>
        <sidenav-account></sidenav-account>
        <div class="main-install overview-inst">
            <h1>Location</h1>
            <form action="" class="flex-input-container">
                <div class="input-container">
                    <label for="address">Address</label>
                    <input type="text" v-model="user.address" name="address" id="address" class="base-input" :class="{ 'hasError': $v.user.address.$error }">
                </div>
                <div class="input-container">
                    <label for="zip">Zip code</label>
                    <input type="text" v-model="user.zip" name="zip" id="zip" class="base-input" :class="{ 'hasError': $v.user.zip.$error }">
                </div>
                <div class="input-container">
                    <label for="city">City</label>
                    <input type="text" v-model="user.city" name="city" id="city" class="base-input" :class="{ 'hasError': $v.user.city.$error }">
                </div>
                <div class="input-container">
                    <label for="country">Country</label>
                    <input type="text" v-model="user.country" name="country" id="country" class="base-input" :class="{ 'hasError': $v.user.country.$error }">
                </div>
            </form>
            <div>
                <button type="submit" @click="updateUser" class="apply-btn">Apply</button>
            </div>
        </div>
    </div>
</template>

<script>

import Sidenav from './account_sidenav'
import API from '../../http-constants'
import { required } from 'vuelidate/lib/validators'

export default {
    name: 'Location',
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
    created(){
        this.getUser();
    },
    validations: {
        user:{
            address:{
                required
            },
            zip:{
                required
            },
            city:{
                required
            },
            country:{
                required
            }
        }
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