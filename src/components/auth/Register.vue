<template>
<div class="login-main" >
  <div class="login-image"></div>
  <div class="login-form">
    <h1 class="login-heading">Geomon IoT Portal</h1>
    <h3 class="login-heading">Create an account</h3>
    <form action="#" @submit.prevent="register">

      <div class="form-control">
        <input type="text" name="name" id="name" class="login-input" v-model="user.name" placeholder="First Name" :class="{ 'hasErrorRegister': $v.user.name.$error }">
      </div>
      <div class="form-control">
        <input type="text" name="lastname" id="lastname" class="login-input" v-model="user.lastname" placeholder="Last Name" :class="{ 'hasErrorRegister': $v.user.lastname.$error }">
      </div>
      <div class="form-control">
        <input type="text" name="address" id="address" class="login-input" v-model="user.address" placeholder="Address" :class="{ 'hasErrorRegister': $v.user.address.$error }">
      </div>
      <div class="form-control">
        <input type="text" name="zip" id="zip" class="login-input" v-model="user.zip" placeholder="Zip code" :class="{ 'hasErrorRegister': $v.user.zip.$error }">
      </div>
      <div class="form-control">
        <input type="text" name="city" id="city" class="login-input" v-model="user.city" placeholder="City" :class="{ 'hasErrorRegister': $v.user.city.$error }">
      </div>
      <div class="form-control">
        <country-select class="login-select" v-model="user.country" :country="user.country" topCountry="CH" :class="{ 'hasErrorRegister': $v.user.country.$error }"/>
      </div>
      <div class="form-control">
        <input type="text" name="phone" id="phone" class="login-input" v-model="user.phone" placeholder="Mobile phone number" :class="{ 'hasErrorRegister': $v.user.phone.$error }">
      </div>
      <div class="form-control">
        <input type="email" name="email" id="email" class="login-input" v-model="user.email" placeholder="E-mail" :class="{ 'hasErrorRegister': $v.user.email.$error }">
      </div>

      <div class="form-control">
        <input type="password" name="password" id="password" class="login-input" v-model="user.password" placeholder="Password" :class="{ 'hasErrorRegister': $v.user.password.$error }">
      </div>
      <div class="form-control">
        <input type="password" name="cpassword" id="cpassword" class="login-input" v-model="user.cpassword" placeholder="Confirm password" :class="{ 'hasErrorRegister': $v.user.cpassword.$error }">
      </div>
      <div class="form-control">
        <select name="language" id="language" class="login-select" v-model="user.language" :class="{ 'hasErrorRegister': $v.user.language.$error }">
          <option value="" disabled selected>Select a preferred language</option>
          <option value="en" selected>English</option>
          <option value="fr">French</option>
        </select>
      </div>
      <div class="form-control">
        <router-link :to="{ name: 'login' }" class="btn-login">Log In</router-link>
        <button type="submit" class="btn-submit btn-create-account">Create Account</button>
      </div>

    </form>
  </div>
</div>
</template>

<script>
import { required,sameAs,email,minLength } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      user:{
        name: '',
        lastname:'',
        address:'',
        zip:'',
        city:'',
        country:'',
        phone:'',
        language:'',
        email: '',
        password: '',
        cpassword:'',
      }
      
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
        },
        phone:{
          required
        },
        email:{
          required,
          email
        },
        password:{
          required,
          minLength: minLength(5)
        },
        cpassword:{
          sameAsPassword: sameAs('password')
        },
        language:{
          required
        }
    }
        

   },
  methods: {
    register() {
      this.$v.$touch();
      if(this.$v.$error) return
      console.log(this.user);
      this.$store.dispatch('register', this.user)
        .then(response => {
          this.$router.push({ name: 'login' })
        })
    }
  }
}
</script>