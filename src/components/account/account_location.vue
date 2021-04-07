<template>
    <div>
        <sidenav-account></sidenav-account>
        Location
    </div>
</template>

<script>

import Sidenav from './account_sidenav'

export default {
    name: 'Location',
    components : {
        'sidenav-account' :Sidenav
    }
}
</script>