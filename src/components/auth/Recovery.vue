<template>
<div class="login-main" >
  <div class="login-image"></div>
  <div class="login-form">
    <h1 class="login-heading">Geomon IoT Portal</h1>
    <h3 class="login-heading">Log In</h3>
    <form action="#" @submit.prevent="sendMail">

      <div class="form-control">
        <label for="mail">E-mail</label>
        <input type="text" name="mail" id="mail" class="login-input" v-model="mail">
      </div>

      <div class="form-control">
        <button type="submit" class="btn-submit">Log In</button>
      </div>
      <div class="line"></div>
      <div class="or">or</div>
      <div class="line"></div>
      <p class="text">Go back to login <router-link :to="{ name: 'Login' }">Log In</router-link></p>

    </form>
  </div>
</div>
  
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      mail: ''
    }
  },
  methods: {
      
    sendMail() {

        
    }
  }
}
</script>