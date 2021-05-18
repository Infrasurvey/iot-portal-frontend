<template>
  <nav class="sidenav-install">
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
  </nav>
</template>

<script>
export default {
  name: 'sidenav-account'
}
</script>