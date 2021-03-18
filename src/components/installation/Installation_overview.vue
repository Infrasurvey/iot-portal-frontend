    
<template>
    <div>
        <sidenav></sidenav>
        <div class="main-install overview-inst">
            <h2>Informations</h2>
            <p>informatinons...</p>
            <h2>Battery state</h2>
            <font-awesome-icon icon="battery-empty" size="3x" rotation="270" />
            <font-awesome-icon icon="battery-half" size="3x" rotation="270"/>
            <h2>Landslide evolution</h2>
        </div>
    </div>

</template>
    
<script>
    import Sidenav from '../template/Sidenav'
    export default {
        name: 'Overview',
        components: {
            Sidenav
        }
    }
</script>
  