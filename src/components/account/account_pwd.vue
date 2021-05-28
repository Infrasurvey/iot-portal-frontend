<template>
  <div style="display: flex; flex-direction: column; justify-content: space-between;">
    <div>
      <section-title style="flex-grow: 1;" title= "Password"></section-title>
      <form novalidate class="md-layout" @submit.prevent="updatePwd" style="display: flex; flex-wrap: wrap;">
        <md-field :class="getValidationClass('password')" style="width: 300px; margin-right: 20px;">
          <label>Current password*</label>
          <md-input type="password" name="password" id="password" v-model="password" maxlength="30"></md-input>
          <span class="md-error" v-if="!$v.password.required">The password is required</span>
          <span class="md-error" v-else-if="!$v.password.minLength">Must contain at least 5 characters</span>
        </md-field>
    
        <md-field :class="getValidationClass('new_password')" style="width: 300px; margin-right: 20px;">
          <label>New password*</label>
          <md-input type="password" name="new_password" id="new_password" v-model="new_password" maxlength="30"></md-input>
          <span class="md-error" v-if="!$v.new_password.required">The new password is required</span>
          <span class="md-error" v-else-if="!$v.new_password.minLength">Must contain at least 5 characters</span>
        </md-field>
        
        <md-field :class="getValidationClass('c_password')" style="width: 300px; margin-right: 20px;">
          <label>Confirm new password*</label>
          <md-input type="password" name="c_password" id="c_password" v-model="c_password" maxlength="30"></md-input>
          <span class="md-error" v-if="!$v.c_password.required">Please confirm your new password</span>
          <span class="md-error" v-else-if="!$v.c_password.sameAsPassword">Passwords didn't match. Try again.</span>
        </md-field>
      </form>
    </div>

    <div style="align-self: flex-end;">
        <md-button type="submit" to="/home" class="md-raised md-accent btn-login" style="width: 200px;">Close</md-button>
        <md-button type="submit" @click="updateUser" class="md-raised md-primary btn-login" style="width: 200px;">Apply</md-button>
    </div>
  </div>
</template>

<script>
import API from '../../http-constants'
import { required, sameAs ,minLength } from 'vuelidate/lib/validators'
import SectionTitle from '../template/SectionTitle';

export default {
  name: 'Password',
  components : {
    SectionTitle
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
    }
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
        this.$v.$reset();
        this.password = '';
        this.c_password = '';
        this.new_password = '';
      })
      .catch(e => {
        this.errorMessage = e
      })
    },
    getValidationClass (fieldName) {
      const field = this.$v[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    }
  }
}
</script>