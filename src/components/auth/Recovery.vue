<template>
  <div>
    <div class="auth-subtitle">Password recovery</div>
    <form action="#" @submit.prevent="sendMail">

      <!-- Email entry -->
      <md-field>
        <label>Email</label>
        <md-input v-model="name"></md-input>
      </md-field>

      <!--  Send email button -->
      <md-button class="md-raised md-primary btn-login" type="submit">Send recovery e-mail</md-button>
      <!-- <div class="form-control">
        <label for="mail">E-mail</label>
        <input type="text" name="mail" id="mail" class="login-input" v-model="mail">
      </div>
      <div class="form-control">
        <button type="submit" class="btn-submit">Log In</button>
      </div> -->
    </form>
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