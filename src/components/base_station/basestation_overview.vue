<template>
  <div>
    <div class="main-install overview-inst">
      <section-title title= "System information"></section-title>
      <div class="flex-left">
        <md-content class="md-elevation-3 overview-info-tile">
          <h3>Connection</h3>
          <p>
            Last configuration <br> <em>{{configuration.configuration_date | formatDate}}</em> <br>
            Last communication <br> <em>{{basestation.last_communication | formatDate}} </em>
          </p>
        </md-content>
        <md-content class="md-elevation-3 overview-info-tile">
          <h3>General</h3>
          <p>
            Name : {{ basestation.name }}<br>
            Installed rovers : {{ basestation.device_rover_count || 'Undefined'}}<br>
            Battery voltage : {{ basestation.battery_voltage || 'Undefined'}}<br>
            Available memory : {{ basestation.available_memory || 'Undefined'}}
          </p>
        </md-content>
        <md-content class="md-elevation-3 overview-info-tile">
          <h3>BBB Info</h3>
          <p>
            Version : {{ basestation.bbb_version || 'Undefined'}}<br>
            MD5 : {{ basestation.bbb_md5 || 'Undefined'}}<br>
            MAC : {{ basestation.bbb_mac_address || 'Undefined' }}
          </p>
        </md-content>
      </div>

      <section-title title= "Current configuration"></section-title>
      <div class="flex-left">
        <div class="overview-actual-p">
          Application date : <br>
          Wake up period : {{ configuration.wakeup_period_in_minutes || 'Null' }} <span v-if="configuration.wakeup_period_in_minutes">min.</span> <br>
          Non continous store bind to FTP : {{ configuration.non_continuous_store_binr_to_ftp || 'Null'}}<br>
          Reference GPS module : {{ configuration.reference_gps_module || 'Null'}}
        </div>
        <div class="overview-actual-p">
          Continuous mode : {{ configuration.continuous_mode || 'Null' }}<br>
          Session start time : {{ configuration.session_start_time || 'Null' }}<br>
          Session period in wakeup period : {{ configuration.session_period_in_wakeup_period || 'Null' }}<br>
          Reference longitude : {{ configuration.reference_longitude || 'Null' }}
        </div>
        <div class="overview-actual-p">
          Reset : {{ configuration.reset || 'Null' }}<br>
          Session duration : {{ configuration.session_duration_in_minutes || 'Null' }} <span v-if="configuration.session_duration_in_minutes">min.</span><br>
          Reference latitude : {{ configuration.reference_latitude || 'Null' }} <br>
          Reference altitude : {{ configuration.reference_altitude || 'Null' }}
        </div>
      </div>
      
      <vue-slider class="slider-1" v-model="value" :min="min" :max="max" :marks="marks" :enable-cross="false" :tooltip="showTooltip" :tooltip-formatter="formatter" :disabled="true">
      </vue-slider>
    </div>
  </div>
</template>

<script>
//https://github.com/IonDen/ion.rangeSlider
  import API from '../../http-constants'
  import VueSlider from 'vue-slider-component'
  import moment from 'moment'
  import SectionTitle from '../template/SectionTitle';

  export default {
    name: 'basestation-overview',
    components :{
      VueSlider,
      SectionTitle
    },
    data(){
      return{
        installationId : this.$route.params.id,
        basestation:'',
        configuration : '',
        errorMessage: '',
        active : true,
        start_time : 1,
        stop_time : 2,
        showTooltip : 'always',
        min : 0,
        max : 3,
        value :  [this.start_time,this.stop_time],
        marks : val => val % 60 === 0 ? ({
                    label: `${moment().startOf('day').add(val, 'minutes').format('hh:mm')}`,
            }) : false,
        formatter: v =>  `${moment().startOf('day').add(v, 'minutes').format('hh:mm')}`,
      }
    },
    async created(){
      await this.getBaseStationConfig()
      this.setActive()
    },
    methods:{
      getBaseStationConfig(){
        API.get('/api/installation/'+this.installationId+'/basestation')
          .then(response => {
            this.basestation =response.data;
            this.configuration = this.basestation.last_configuration;
            if (this.configuration.session_start_time != null && this.configuration.session_duration_in_minutes != null){
              this.start_time = moment.duration(this.configuration.session_start_time).asMinutes()
              this.stop_time = this.start_time + this.configuration.session_duration_in_minutes
              this.min = this.start_time -180
              this.max = this.stop_time + 180
              this.$nextTick(() => {
                  this.value =  [this.start_time,this.stop_time]
              })
            }
            else{
              this.min = 720 -180
              this.max = 720 + 180
              this.showTooltip = 'none'
            }
          })
          .catch(e => {
            this.errorMessage = e
          })
      },
      setActive(){
         // Check station activity
          var today = new Date();
          var today = Date.parse(today);
          var lastCommunication = Date.parse(this.basestation.last_communication);

          // Compute the difference
          var difference = today - lastCommunication;

          // Compute the number of day of inactivity
          this.inactivityDays = Math.round(difference / 1000  / (24 * 60 * 60));

          // Set active or inactive
          if (this.inactivityDays >= 7)
          {
            this.active = false;
          }
        }
    }
  }
</script>