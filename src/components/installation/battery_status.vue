<template>
    <div class="battery-display">
        <div class="b-container">
            <font-awesome-icon v-if="batteryValue < 10" icon="battery-empty" size="3x" rotation="270" />
            <font-awesome-icon v-else-if="batteryValue < 12" icon="battery-quarter" size="3x" rotation="270"/>
            <font-awesome-icon v-else-if="batteryValue < 13" icon="battery-half" size="3x" rotation="270"/>
            <font-awesome-icon v-else-if="batteryValue < 14" icon="battery-three-quarters" size="3x" rotation="270"/>
            <font-awesome-icon v-else icon="battery-full" size="3x" rotation="270" />
            <div class="battery-value">{{batteryValue}} V</div> 
            <div class="battery-name">{{batteryName}}</div>
        </div>
    </div>

</template>

<script>
export default {
    name: 'battery-status',
    props:{
      battery: {
          type: Object,
          required : true
      }
  },
  data(){
      return{
          'batteryValue' : this.battery.batteryValue,
          'batteryName' : this.battery.name
      }
  }
}
</script>