<template>
<div class="login-main" >
  <div class="login-image"></div>
  <div class="login-form">
    <h1 class="login-heading">Geomon IoT Portal</h1>
    <h3 class="login-heading">Log In</h3>
    <form action="#" @submit.prevent="login">
      <div class="form-control">
        <input type="text" name="email" id="email" class="login-input" v-model="email" placeholder="E-mail" :class="{ 'hasError': $v.email.$error }">
      </div>
      <div class="form-control mb-more">
        <input type="password" name="password" id="password" class="login-input" v-model="password" placeholder="Password" :class="{ 'hasError': $v.password.$error }">
      </div>
      <div>
        <p class="pwd-recovery">Forgot Password ?</p>
        <p class="pwd-recovery link">Password recovery</p>
      </div>
      <div class="form-control">
        <button type="submit" class="btn-submit">Log In</button>
      </div>
      <div class="line"></div>
      <div class="or">or</div>
      <div class="line"></div>
      <p class="text">Don't have an account yet ? <router-link :to="{ name: 'Register' }">Register now</router-link></p>
    </form>
  </div>
</div>
  
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
    }
  },
    validations: {
        email:{
          required
        },
        password:{
          required
        }
   },
  methods: {
      
    login() {
      this.$v.$touch();
      if(this.$v.$error) return
      this.$store.dispatch('retrieveToken', {
        email: this.email,
        password: this.password,
      })
        .then(response => {
          this.$router.push({ name: 'home' })
        })
        
    }
  }
}
</script>