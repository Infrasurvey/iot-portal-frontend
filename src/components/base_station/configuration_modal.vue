<template>
    <div class="modal-backdrop">
    <div class="modal">
        <header class="modal-header">
        <div name="header">
          <h1 class="installation-title">Configuration file</h1>
        </div>
          <button type="button" class="btn-close" @click="close"><font-awesome-icon class="close" icon="times" size="2x"/></button>
      </header>
      <section class="modal-body">
        <div name="body">
              <div>
                  <pre class="txtfile">
        [GENERAL]
        CONTINUOUS_MODE={{configuration.continuous_mode}}
        RESET={{configuration.reset}}
        WAKEUP_PERIOD_IN_MINUTES={{configuration.wakeup_period_in_minutes}}

        [MEASURE]
        SESSION_START_TIME={{configuration.session_start_time}}
        SESSION_DURATION_IN_MINUTES={{configuration.session_duration_in_minutes}}
        SESSION_PERIOD_IN_WAKEUP_PERIOD={{configuration.session_period_in_wakeup_period}}

        [GPS_REFERENCE]
        GPS_MODULE={{configuration.reference_gps_module}}
        LATITUDE={{configuration.reference_latitude}}
        LONGITUDE={{configuration.reference_longitude}}
        ALTITUDE={{configuration.reference_altitude}}

        [DEBUG]
        NON_CONTINUOUS_STORE_BINR_TO_SD={{configuration.non_continuous_store_binr_to_sd}}
        NON_CONTINUOUS_STORE_BINR_TO_FTP={{configuration.non_continuous_store_binr_to_ftp}}
                  </pre>
              </div>
        </div>
       </section>
       <footer class="modal-footer config-footer">
            <button type="button" class="apply-btn" @click="showDeleteAlert">Upload <font-awesome-icon icon="cloud-upload-alt"/></button>
            <button type="button" class="apply-btn" @click="onUpdate">Download <font-awesome-icon icon="cloud-download-alt"/></button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
    name : 'config-modal',
    props:{
      row: {
          type: Object,
          required : true
      },
  },
  data(){
      return{
          configuration : this.row,
      }
  },
   methods: {
      close() {
        this.$emit('close');
      },
   }
}
</script>