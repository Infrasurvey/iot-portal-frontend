<template>
    <div class="battery-display">
        <div class="b-container">
            <font-awesome-icon class="b-image" v-if="battery_voltage < 10" icon="battery-empty" size="3x" rotation="270" />
            <font-awesome-icon class="b-image" v-else-if="battery_voltage < 12" icon="battery-quarter" size="3x" rotation="270"/>
            <font-awesome-icon class="b-image" v-else-if="battery_voltage < 13" icon="battery-half" size="3x" rotation="270"/>
            <font-awesome-icon class="b-image" v-else-if="battery_voltage < 14" icon="battery-three-quarters" size="3x" rotation="270"/>
            <font-awesome-icon class="b-image" v-else icon="battery-full" size="3x" rotation="270" />
            <div class="battery-value">{{battery_voltage}} V</div> 
            <div class="battery-name" v-if="is_basestation">{{system_id}}</div>
            <div class="battery-name" v-else>Rover {{system_id}}</div>
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
          'battery_voltage' : this.battery.battery_voltage,
          'is_basestation' : this.battery.is_basestation || false,
          'system_id' : this.battery.system_id,
      }
  }
}
</script>