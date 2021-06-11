<template>
  <div>
    <div class="auth-subtitle">Password recovery</div>
    <form action="#" @submit.prevent="sendMail">

      <!-- Email entry -->
      <md-field>
        <label>E-mail</label>
        <md-input type="email" v-model="mail"></md-input>
      </md-field>

      <!--  Send email button -->
      <md-button class="md-raised md-primary btn-login" type="submit">Send recovery e-mail</md-button>
    </form>
    <FlashMessage></FlashMessage>
  </div>
</template>

<script>
import API from '../../http-constants'

export default {
  name: 'login',
  data() {
    return {
      mail: ''
    }
  },
  methods: {
      
    sendMail() {
      API.post('/api/resetPassword',{'email':this.mail})
            .then(response => {
                this.displayStatus(true)
            })
            .catch(e => {
                this.displayStatus(false)
            })
        
    },
    displayStatus(status){
            if(status){
                this.flashMessage.success({title: 'Success', message: 'An email has been sent to your email with a new password.'});
            }
            else
            {
                this.flashMessage.show({status: 'error', title: 'Error', message: 'An error occured during password reset'})
            }
        }
  }
}
</script>