<template>
    <nav class="sidenav-install">

        <ul class="sidenav-install-ul">
            <li>
                <input type="checkbox" id="btn"/>
                <label for="btn" class="show">
                <div class="nav-group"><router-link class="basic-link" :to="{ name: 'ManageStations'}">Base stations</router-link></div>
                <div class="nav-group"><router-link class="basic-link" :to="{ name: 'ManageUsers'}">Users</router-link></div> 
                <div class="nav-group"><router-link class="basic-link" :to="{ name: 'ManageOrganizations'}">Organizations</router-link></div> 
                <div class="nav-group"><router-link class="basic-link" :to="{ name: 'ManageGroups'}">Groups</router-link></div> 
                </label>
            </li>
        </ul>
    </nav>
   
</template>

<script>

export default {
    name: 'sidenav-manage'
}
</script>