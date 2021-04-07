<template>
    <div>
        <sidenav-account></sidenav-account>
        pwd
    </div>
</template>

<script>

import Sidenav from './account_sidenav'

export default {
    name: 'Password',
    components : {
        'sidenav-account' :Sidenav
    }
}
</script>