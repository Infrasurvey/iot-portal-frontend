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

  <!-- <nav class="sidenav-install">
    <ul class="sidenav-install-ul">
      <li>
        <input type="checkbox" id="btn"/>
        <label for="btn" class="show">
        <div class="nav-group">Account settings<span class="sub-arrow1"> </span></div> 
        <ul>
          <li><router-link class="basic-link" :to="{ name: 'Informations'}">Personal informations</router-link> </li>
          <li><router-link class="basic-link" :to="{ name: 'Location'}">Location</router-link></li>
          <li><router-link class="basic-link" :to="{ name: 'Password' }">Password</router-link></li>
        </ul>
        </label>
      </li>
    </ul>
  </nav> -->

<script>
export default {
  name: 'sidenav-account'
}
</script>