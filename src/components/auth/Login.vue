<template>
<div class="login-main" >
  <div class="login-image"></div>
  <div class="login-form">
    <h1 class="login-heading">Geomon IoT Portal</h1>
    <h3 class="login-heading">Log In</h3>
    <form action="#" @submit.prevent="login">

      <div class="form-control">
        <label for="username">Username</label>
        <input type="text" name="username" id="username" class="login-input" v-model="username">
      </div>

      <div class="form-control mb-more">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" class="login-input" v-model="password">
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
export default {
  name: 'login',
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
      
    login() {

      this.$store.dispatch('retrieveToken', {
        username: this.username,
        password: this.password,
      })
        .then(response => {
          this.$router.push({ name: 'GetRover' })
        })
        
    }
  }
}
</script>