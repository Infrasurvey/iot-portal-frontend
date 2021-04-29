<template>
<div class="" >
    <sidenav-manage></sidenav-manage>
    <div class="main-content">
        <m-installations v-if="this.$route.meta.manageFunction == 0"></m-installations>
        <m-users v-if="this.$route.meta.manageFunction == 1"></m-users>
        <m-organization v-if="this.$route.meta.manageFunction == 2"></m-organization>
        <m-group v-if="this.$route.meta.manageFunction == 3"></m-group>
    </div>
</div>
</template>

<script>
import ManageInstallations from './manage_installations'
import ManageUsers from './manage_users'
import ManageOrganization from './manage_organization'
import ManageGroup from './manage_group'
import ManageSidenav from './manage_sidenav'

export default {
  name: 'manage-main',
  components: {
    'm-installations' : ManageInstallations,
    'm-users' : ManageUsers,
    'm-organization' :ManageOrganization,
    'm-group' :ManageGroup,
    'sidenav-manage' : ManageSidenav
  }
}
</script>