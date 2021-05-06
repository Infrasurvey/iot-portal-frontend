<template>
<div class="" >
    <sidenav-installation :installationId="this.$route.params.id.toString()"></sidenav-installation>
    <div class="main-content">
        <installation-overview v-if="this.$route.meta.installFunction == 0"></installation-overview>
        <installation-manage v-if="this.$route.meta.installFunction == 1"></installation-manage>
        <installation-event v-if="this.$route.meta.installFunction == 2"></installation-event>
        <basestation-overview v-if="this.$route.meta.installFunction == 3"></basestation-overview>
        <basestation-config v-if="this.$route.meta.installFunction == 4"></basestation-config>
        <rover-overview v-if="this.$route.meta.installFunction == 5"></rover-overview>
        <rover-event v-if="this.$route.meta.installFunction == 6"></rover-event>

    </div>
</div>
</template>

<script>
import InstallationOverview from './installation_overview'
import InstallationManage from './installation_manage'
import InstallationEvent from './installation_event'
import BaseStationOverview from '../base_station/basestation_overview'
import BaseStationConfig from '../base_station/basestation_config'
import RoverOverview from '../rover/rover_overview'
import RoverEvent from '../rover/rover_event'
import Sidenav from '../template/Sidenav'

export default {
  name: 'manage-main',
  components: {
    'installation-overview' : InstallationOverview,
    'installation-manage' : InstallationManage,
    'installation-event' :InstallationEvent,
    'basestation-overview' :BaseStationOverview,
    'basestation-config' :BaseStationConfig,
    'rover-overview' :RoverOverview,
    'rover-event' : RoverEvent,
    'sidenav-installation' : Sidenav
  }
}
</script>