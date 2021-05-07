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
                      {{selectedConfig.join('')}}
                  </pre>
              </div>
        </div>
       </section>
       <footer class="modal-footer config-footer">
            <button type="button" class="apply-btn" v-if="!is_pending" >Upload <font-awesome-icon icon="cloud-upload-alt"/></button>
            <button type="button" class="apply-btn" >Download <font-awesome-icon icon="cloud-download-alt"/></button>
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
      }
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