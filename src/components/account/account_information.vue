<template>
  <div style="display: flex; flex-direction: column; justify-content: space-between;">
    <div>
      <section-title style="flex-grow: 1;" title= "Personal information"></section-title>
      <form novalidate class="flex-input-container" @submit.prevent="updateUser" style="display: flex; flex-wrap: wrap;">
        <md-field :class="getValidationClass('name')" class="input-container" style="width: 300px;">
          <label>First Name*</label>
          <md-input v-model="user.name" maxlength="30"></md-input>
          <span class="md-error" v-if="!$v.user.name.required">The first name is required</span>
          <span class="md-error" v-else-if="!$v.user.name.alpha">Must contains only letters</span>
          <span class="md-error" v-else-if="!$v.user.name.maxLength">Must contains max. 30 characters</span>
        </md-field>
        <md-field :class="getValidationClass('lastname')" class="input-container" style="width: 300px;">
          <label>Last Name*</label>
          <md-input v-model="user.lastname" maxlength="30"></md-input>
          <span class="md-error" v-if="!$v.user.lastname.required">The last name is required</span>
          <span class="md-error" v-else-if="!$v.user.lastname.alpha">Must contains only letters</span>
          <span class="md-error" v-else-if="!$v.user.lastname.maxLength">Must contains max. 30 characters</span>
        </md-field>
        <md-field :class="getValidationClass('phone')" class="input-container" style="width: 300px;">
          <label>Phone number*</label>
          <md-input v-model="user.phone" maxlength="30"></md-input>
          <span class="md-error" v-if="!$v.user.phone.required">The phone number is required</span>
        </md-field>
        <md-field :class="getValidationClass('email')" class="input-container" style="width: 300px;">
          <label>E-mail*</label>
          <md-input v-model="user.email"></md-input>
          <span class="md-error" v-if="!$v.user.email.required">The email is required</span>
          <span class="md-error" v-else-if="!$v.user.email.email">Invalid email</span>
        </md-field>
        <md-autocomplete v-model="user.language" :md-options="languages" class="input-container" style="width: 300px;">
          <label>Language*</label>
          <span class="md-error" v-if="!$v.user.language.required">The language is required</span>
        </md-autocomplete>
      </form>
    </div>
    <div style="align-self: flex-end;">
        <md-button type="submit" :to="{ name: 'home' }" class="md-raised md-accent btn-login" style="width: 200px;">Close</md-button>
        <md-button type="submit" @click="updateUser" class="md-raised md-primary btn-login" style="width: 200px;">Apply</md-button>
        <FlashMessage></FlashMessage>
    </div>
  </div>
</template>

<script>
import API from '../../http-constants'
import { alpha, required, email, maxLength } from 'vuelidate/lib/validators'
import SectionTitle from '../template/SectionTitle';

export default {
  components : {
    SectionTitle
  },
  data(){
    return{
      user:{
        name: '',
        lastname:'',
        address:'',
        phone:'',
        language:'',
        email: '',
    },
      errorMessage:'',
      status:'',
      languages: [
        "English",
        "Français",
        "Deutsch",
        "Italiano"
      ]
    }
  },
  validations: {
    user:{
      name:{
        required,
        alpha,
        maxLength: maxLength(30)
      },
      lastname:{
        required,
        alpha,
        maxLength: maxLength(30)
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
        this.user = response.data
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
        this.displayStatus(true)
      })
      .catch(e => {
        this.displayStatus(false)
        this.errorMessage = e
      })
    },
    getValidationClass (fieldName) {
      const field = this.$v.user[fieldName]
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    displayStatus(status){
      if(status){
          this.flashMessage.success({title: 'Success', message: 'User information successfully updated !'});
      }
      else
      {
          this.flashMessage.show({status: 'error', title: 'Error', message: 'An error occured while user information update'})
      }
    },
  }
}
</script>
