<template>
  <div class="modal-backdrop">
    <div class="modal">
        <header class="modal-header">
        <div name="header">
          <h1 class="installation-title">Download data</h1>
        </div>
          <button type="button" class="btn-close" @click="close"><font-awesome-icon class="close" icon="times" size="2x"/></button>
      </header>
      <section class="modal-body">
        <div name="body">
            <md-card-header>
          <div class="md-title">Select data sets to download</div>
        </md-card-header>
          <form novalidate class="md-layout" @submit.prevent="onSubmit" style="display: flex;align-content: space-around; flex-direction: column; justify-content: center;">
            <md-checkbox v-model="cbPosition" class="md-primary">Position data</md-checkbox>
            <md-checkbox v-model="cbAccel" class="md-primary">Acceleration data</md-checkbox>
            <md-checkbox v-model="cbBattery" class="md-primary">Battery data</md-checkbox>
          </form>
        </div>
      </section>
      <md-dialog-actions>
        <md-button class="md-primary" @click="downloadData">Download data</md-button>
      </md-dialog-actions>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import moment from 'moment';

  export default {
    name: 'modal-download',
    props:{
      eastings: Object,
      northings: Object,
      altitudes: Object,
      batteries : Object,
      accelerations : Object,
  },
    components:{
        
    },
    data(){
        return{
            cbPosition : true,
            cbAccel : true,
            cbBattery : true
        }
    },
    validations: {
        name:{
          required,
          maxlength : 30
        }
   },
    created(){

    },
    methods: {
      close() {
        this.$emit('close');
      },
      downloadData() {
        if(this.cbPosition){
            var csvPosition = this.buildPositionCSV(this.eastings,this.northings,this.altitudes)
            const anchorPos = document.createElement('a');
            anchorPos.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvPosition);
            anchorPos.target = '_blank';
            anchorPos.download = moment().format('YYYY-MM-DD')+'_installation_'+this.installationId+'_rover_'+this.roverId+'_positions'+'.csv';
            anchorPos.click();
        }
        
        if(this.cbBattery){
            var csvBattery = this.buildBatteryCSV(this.batteries)
            const anchorBat = document.createElement('a');
            anchorBat.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvBattery);
            anchorBat.target = '_blank';
            anchorBat.download = moment().format('YYYY-MM-DD')+'_installation_'+this.installationId+'_rover_'+this.roverId+'_batteries'+'.csv';
            anchorBat.click();
        }
        

        /* var csvPosition = this.buildPositionCSV(this.eastings,this.northings,this.altitudes)
        const anchorPos = document.createElement('a');
        anchorPos.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvPosition);
        anchorPos.target = '_blank';
        anchorPos.download = moment().format('YYYY-MM-DD')+'_installation_'+this.installationId+'_rover_'+this.roverId+'positions'+'.csv';
        anchorPos.click(); */
      },
      buildPositionCSV(eastings,northings,altitudes){
        var csv ='Date,Easting,Northing,Altitude\n';
        /* if(eastings.labels.length == northings.labels.length == altitudes.labels.length)
        { */
          console.log("test")
          for (let i = 0; i < eastings.labels.length; i++) {
            csv += eastings.labels[i] +','+eastings.datasets[0].data[i]+','+northings.datasets[0].data[i]+','+altitudes.datasets[0].data[i]+'\n';
          }
          return csv;
        /* } */
      },
      buildBatteryCSV(batteries){
        var csv ='Date,Battery voltage\n';
        for (let i = 0; i < batteries.labels.length; i++) {
            csv += batteries.labels[i] +','+batteries.datasets[0].data[i]+'\n';
        }
        return csv;
      },

      onCreate: function() {
        this.$v.$touch();
        if(this.$v.$error) return
        this.downloadData();
      },
        
    },
  };
</script>