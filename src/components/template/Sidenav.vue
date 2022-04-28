<template>
  <div style="padding: 20px;">
    <div style="font-weight: bold; margin-bottom: 10px;">Installation</div>
    <md-list style="background-color: inherit;">
      <md-list-item :to="{ name: 'Overview' }">Overview</md-list-item>
      <md-list-item v-if="this.$store.getters.getAbility.can('manage_install', this.installationId) || this.$store.getters.getAbility.can('manage','all')" :to="{ name: 'Manage'}">Manage</md-list-item>
      <md-list-item class="disabled" :to="{ name: 'Event'}">Event log</md-list-item>
    </md-list>
    <div style="font-weight: bold; margin-bottom: 10px; margin-top: 10px;">Base station</div>
    <md-list style="background-color: inherit;">
      <md-list-item :to="{ name: 'OverviewStation'}">Overview</md-list-item>
      <md-list-item v-if="this.$store.getters.getAbility.can('manage_install', this.installationId) || this.$store.getters.getAbility.can('manage','all')" :to="{ name: 'ConfigurationStation'}">Configuration</md-list-item>
    </md-list>
    <div style="font-weight: bold; margin-bottom: 10px; margin-top: 10px;">Rovers</div>
    <md-list style="background-color: inherit;">
      <rover-item v-for="rover in rovers" :key="rover.system_id" :rover="rover"/>
    </md-list>
  </div>
</template>

<script>
import RoverItem from '../installation/sidenav_rover_element' 

export default {
  name: 'sidenav-installation',
  props:{
   installationId: {
     type: String,
     required : true
   },
   rovers: {
     type: Array,
     required : true
   },
  },
  components : {
    'rover-item':RoverItem,
  }
}
</script>