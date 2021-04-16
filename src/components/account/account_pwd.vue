<template>
    <div>
        <sidenav-account></sidenav-account>
        <div class="main-install overview-inst">
            <h1>Change password</h1>
            <form action="" class="flex-input-container">
                <div class="input-container">
                    <label for="actual-pwd">Actual password</label>
                    <input type="password" name="actual-pwd" v-model="password" class="base-input" id="actual-pwd" :class="{ 'hasError': $v.password.$error }">
                </div>
                <div class="input-container">
                    <label for="new-pwd">New password</label>
                    <input type="password" name="new-pwd" v-model="new_password" class="base-input" id="new-pwd" :class="{ 'hasError': $v.new_password.$error }">
                </div>
                <div class="input-container">
                    <label for="con-pwd">Confirmation new password</label>
                    <input type="password" name="con-pwd" v-model="c_password" class="base-input" id="con-pwd" :class="{ 'hasError': $v.c_password.$error }">
                </div>
            </form>
            <div>
                <button type="submit" @click="updatePwd" class="apply-btn">Apply</button>
            </div>
        </div>
    </div>
</template>

<script>

import Sidenav from './account_sidenav'
import API from '../../http-constants'
import { required,sameAs,email,minLength } from 'vuelidate/lib/validators'

export default {
    name: 'Password',
    components : {
        'sidenav-account' :Sidenav
    },
    data(){
        return{
            password:'',
            new_password:'',
            c_password:'',
            errorMessage:'',
            status:''
        }
    },
    validations:{
        password:{
          required,
          minLength: minLength(5)
        },
        new_password:{
          required,
          minLength: minLength(5)
        },
        c_password:{
          sameAsPassword: sameAs('new_password')
        },
    },
    methods:{
        updatePwd(){
            this.$v.$touch();
            if(this.$v.$error) return
            API.post('/api/updatePwd',{
                'password':this.password,
                'new_password':this.new_password,
                'c_password':this.c_password
            })
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