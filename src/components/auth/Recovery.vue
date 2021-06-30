<template>
  <div>
    <div class="auth-subtitle">Password recovery</div>
    <form action="#" @submit.prevent="sendMail">

      <!-- Email entry -->
      <md-field :class="getValidationClass('mail')">
        <label>E-mail</label>
        <md-input type="email" v-model="mail"></md-input>
        <span class="md-error" v-if="!$v.mail.required">Please enter an email</span>
        <span class="md-error" v-if="!$v.mail.email">Please enter a valid email</span>
      </md-field>

      <!--  Send email button -->
      <md-button class="md-raised md-primary btn-login" type="submit">Send recovery e-mail</md-button>
    </form>
    <FlashMessage></FlashMessage>
  </div>
</template>

<script>
import API from '../../http-constants'
import { required,email} from 'vuelidate/lib/validators'

export default {
  name: 'login',
  data() {
    return {
      mail: ''
    }
  },
  validations:{
    mail:{
      required,
      email
    }
  },
  methods: {
    sendMail() {
      this.$v.$touch();
      if(this.$v.$error) return
      API.post('/api/resetPassword',{'email':this.mail})
      .then(response => {
          this.displayStatus(true)
      })
      .catch(e => {
          this.displayStatus(false)
      })
    },
    getValidationClass (fieldName) {
      const field = this.$v[fieldName]
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
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