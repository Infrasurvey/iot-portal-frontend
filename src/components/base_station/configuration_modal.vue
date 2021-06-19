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
                  <pre class="txtfile">{{selectedConfig.join('')}}</pre>
              </div>
        </div>
       </section>
       <footer class="modal-footer config-footer">
            <button type="button" class="apply-btn" v-if="!is_pending" @click="applyConfig">Apply<font-awesome-icon icon="cloud-upload-alt"/></button>
            <button type="button" class="apply-btn" @click="downloadFile">Download <font-awesome-icon icon="cloud-download-alt"/></button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
    name : 'config-modal',
    props:{
      selectedConfig: {
          type: Array,
          required : true
      },
      is_pending :{
          type: Boolean,
          required :true
      },
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
        console.log(this.selectedConfig)
        this.$emit('close');
      },
      downloadFile(){
        //var f = new File(this.selectedConfig, this.configuration.file_name);
        var FileSaver = require('file-saver');
        var blob = new Blob(this.selectedConfig, {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, this.configuration.file_name);
        this.$emit('close');
      },
      applyConfig(){
        this.$emit('apply',this.selectedConfig);
        this.$emit('close');
      }
   }
}
</script>