<template>
  <div>
    <div class="auth-subtitle">Log in</div>
    <form novalidate class="md-layout" @submit.prevent="login">
      <!-- Text entry -->
      <md-field :class="getValidationClass('email')">
        <label for="email">Email</label>
        <md-input type="email" name="email" id="email" v-model="form.email"/>
        <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
        <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
      </md-field>

      <!-- Password entry -->
      <md-field :class="getValidationClass('password')">
        <label>Password</label>
        <md-input type="password" name="password" id="password" v-model="form.password"></md-input>
        <span class="md-error" v-if="!$v.form.password.required">The password is required</span>
      </md-field>

      <!-- Sign in button -->
      <md-button class="md-raised md-primary btn-login" type="submit">Log in</md-button>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
  import {
    required,
    email,
    minLength,
    maxLength
  } from 'vuelidate/lib/validators'

export default {
  name: 'login',
  mixins: [validationMixin],
    data: () => ({
      form: {
        email: null,
        password: null
      }
    }),
    validations: {
      form: {
        email: {
          required,
          email
        },
        password: {
          required
        }
      }
    },
    methods: {
      login() {
        this.$v.$touch();
        if(this.$v.$error) return
        this.$store.dispatch('retrieveToken', {
          email: this.form.email,
          password: this.form.password,
        })
          .then(response => {
            this.$router.push({ name: 'home' })
          })
      },
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      }
    }
  }
</script>