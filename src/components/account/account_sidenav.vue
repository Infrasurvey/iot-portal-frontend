<template>
  <div style="padding: 20px;">
    <div style="font-weight: bold; margin-bottom: 10px;">Account settings</div>
    <md-list style="background-color: inherit;">
      <md-list-item :to="{ name: 'Informations' }">Personal information</md-list-item>
      <md-list-item :to="{ name: 'Location'}">Address</md-list-item>
      <md-list-item :to="{ name: 'Password'}">Password</md-list-item>
    </md-list>
  </div>
</template>

<script>
export default {
  name: 'sidenav-account'
}
</script>