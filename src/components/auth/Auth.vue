<template>
<div class="auth-main" >
  <div class="auth-image"></div>
  <div class="auth-form">
    <!-- Title -->
    <div class="auth-title">Geomon IoT Portal</div>

    <!-- Login / Password recovery / Register -->
    <Login v-if="authFunction == 0"/>
    <Recovery v-if="authFunction == 1"/>
    <Register v-if="authFunction == 2"/>

    <!-- OR -->
    <div class="line-container">
      <div class="line-item"></div>
      <div>or</div>
      <div class="line-item"></div>
    </div>

    <!-- Auth Navigation -->
    <div class="auth-nav" v-if="authFunction == 0">
      <div>Forgot password ?</div><a style="cursor:pointer" v-if="authFunction == 0" @click="navigateTo(1)">Password recovery</a>
    </div>
    <div class="auth-nav">
      <div v-if="authFunction == 0">Don't have an account yet ?</div><a style="cursor:pointer" v-if="authFunction == 0" @click="navigateTo(2)">Create an account</a>
      <div v-if="authFunction == 1">Go back to login</div><a style="cursor:pointer" v-if="authFunction == 1" @click="navigateTo(0)">Log in</a>
      <div v-if="authFunction == 2">Already have an account ?</div><a style="cursor:pointer" v-if="authFunction == 2" @click="navigateTo(0)">Log in</a>
    </div>

    <!-- Contact support and logos -->
    <div class="auth-footer">
      <a href="http://www.infrasurvey.ch/geomon/index.php/contact/">Contact support</a>
      <div>GUI Version: 0.0.1</div>
      <div>Server Version: 0.0.1</div>
      <div>© InfraSurvey Sarl</div>
      <div class="auth-logo">
        <img src="../../images/auth_app_store.png">
        <img src="../../images/auth_play_store.png">
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Login from './Login'
import Recovery from './Recovery'
import Register from './Register'

export default {
  name: 'auth',
  data() {
    return {
      authFunction: 0
    }
  },
  components: {
    Login,
    Recovery,
    Register
  },
  methods: {
    navigateTo: function (param) {
      this.authFunction = param;
    }
  }
}
</script>