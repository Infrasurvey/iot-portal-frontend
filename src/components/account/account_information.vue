<template>
    <div>
        <sidenav-account></sidenav-account>
        Personal informations
    </div>
</template>

<script>
import Sidenav from './account_sidenav'

export default {
    name: 'Informations',
    components : {
        'sidenav-account' :Sidenav
    }
}
</script>
