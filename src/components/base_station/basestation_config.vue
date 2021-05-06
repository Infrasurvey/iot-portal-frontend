<template>
    <div>
        <div class="main-install overview-inst">
            <h2>Edit</h2>
            <div class="flex-container configurations">
                <div class="basestation-field">
                    <label for="mode" class="disabled" >Continous mode : </label>
                    <input type="checkbox" name="mode" id="mode" v-model="configuration.continous_mode" checked disabled>
                </div>
                <div class="basestation-field">
                    <label for="wake">Wake up period : </label>
                    <input type="text" name="wake" id="wake" v-model="configuration.wakeup_period_in_minutes"> <span>min</span>
                </div>
                <div class="basestation-field">
                    <label for="gps">Reference GPS module : </label>
                    <input type="text" name="gps" id="gps" v-model="configuration.reference_gps_module">
                </div>
                <div class="basestation-field">
                    <label for="reset">Reset : </label>
                    <input type="checkbox" name="reset" id="reset" v-model="configuration.reset">
                </div>
                <div class="basestation-field">
                    <label for="start">Session start time : </label> 
                    <input type="text" name="start" id="start" v-model="configuration.session_start_time">
                </div>
                <div class="basestation-field">
                    <label for="longitude">Reference longitude : </label>
                    <input type="text" name="longitude" id="longitude" v-model="configuration.reference_longitude">
                </div>
                <div class="basestation-field">
                    <label for="ncsbf">Non continous stor binr to FTP : </label>
                    <input type="checkbox" name="ncsbf" id="ncsbf" v-model="configuration.non_continuous_store_binr_to_ftp">
                </div>
                <div class="basestation-field">
                    <label for="duration">Session duration : </label>
                    <input type="text" name="duration" id="duration" v-model="configuration.session_duration_in_minutes"> <span>min</span>
                </div>
                <div class="basestation-field">
                    <label for="latitude">Reference latitude : </label>
                    <input type="text" name="latitude" id="latitude" v-model="configuration.reference_latitude"> <span>min</span>
                </div>
                <div class="basestation-field">
                    <label for="ncsbs">Non continous store binr to SD : </label>
                    <input type="checkbox" name="ncsbs" id="ncsbs" v-model="configuration.non_continuous_store_binr_to_sd">
                </div>
                <div class="basestation-field">
                    
                    <label for="period" class="disabled">Session period in wakeup period : 1</label>
                </div>
                <div class="basestation-field">
                    <label for="alttitude">Reference altitude : </label>
                    <input type="text" name="alttitude" id="alttitude"  v-model="configuration.reference_altitude">
                </div>
            </div>
            <div class="apply-container">
                <button type="submit" class="apply-btn">Import a configuration file   <font-awesome-icon icon="cloud-upload-alt"/></button>
                <button type="submit" class="apply-btn" @click="applyConfig">Apply</button>
            </div>
            <h2>Pending</h2>
            <div>
                <p>One configuration is pending and will be applied as soon as the base station will read the configuration gile</p>
                <button>Cancel</button>
            </div>
            <h2>History</h2>
            <vue-good-table
            :columns="columns"
            :rows="configurations"
            @on-row-click="onConfigClick"/>

            <config-modal
                v-if="isConfigModalVisible"
                :row="selectedRow"
                @close="closeModal"
                />
        </div>
        <FlashMessage></FlashMessage>
    </div>
</template>

<script>
    import API from '../../http-constants'
    import { VueGoodTable } from 'vue-good-table';
    import ConfigModal from './configuration_modal'
    import FormData from 'form-data'

    export default {
        name: 'basestation-config',
        data(){
            return{
                installationId : this.$route.params.id,
                configurations : [],
                configuration :{
                    session_period_in_wakeup_period : 1
                },
                isConfigModalVisible : false,
                selectedRow : [],
                columns: [
                {
                    label: 'Filename',
                    field: 'file_name'
                },
                {
                    label: 'Application date',
                    field: 'configuration_date',
                }
            ],
            fileContent : ''
            }
        },
        components : {
            VueGoodTable,
            ConfigModal
        },
        created(){
            this.getConfigurations()
        },
        methods : {
            getConfigurations(){
                API.get('/api/installation/'+this.installationId+'/basestation/configurations')
                    .then(response => {
                        this.configurations =response.data;
                    })
                    .catch(e => {
                        this.errorMessage = e
                    })
            },
        onConfigClick(params) {
            this.selectedRow = params.row;
            this.isConfigModalVisible=true
            this.generateConfigFile()
            console.log(this.fileContent)
        },

        closeModal() {
            this.isConfigModalVisible = false;
        },
        applyConfig(){
            this.generateConfigFile()
            var f = new File(this.fileContent, "config.ini");
            var form = new FormData();
            form.append('configuration', f);
            API.post('/api/installation/'+this.installationId+'/basestation/applyNewConfiguration',form)
            .then(response => {
                    var responseCode = response.status
                    this.displayStatus(responseCode)
                })
                .catch(e => {
                this.errorMessage = e

                })
        },
        generateConfigFile(){
            this.fileContent = []
            if(this.configuration.continuous_mode != null || this.configuration.reset != null || this.configuration.wakeup_period_in_minutes != null)
                this.fileContent.push('[GENERAL]\n')
            if(this.configuration.continuous_mode != null)
                this.fileContent.push('CONTINUOUS_MODE='+this.configuration.continuous_mode+'\n')
            if(this.configuration.reset != null)
                this.fileContent.push('RESET='+this.configuration.reset+'\n')
            if(this.configuration.wakeup_period_in_minutes != null)
                this.fileContent.push('WAKEUP_PERIOD_IN_MINUTES='+this.configuration.wakeup_period_in_minutes+'\n')
            this.fileContent.push('\n')
            if(this.configuration.session_start_time != null || this.configuration.session_duration_in_minutes != null || this.configuration.session_period_in_wakeup_period != null)
                this.fileContent.push('[MEASURE]\n')
            if(this.configuration.session_start_time != null)
                this.fileContent.push('SESSION_START_TIME='+this.configuration.session_start_time+'\n')
            if(this.configuration.session_duration_in_minutes != null)
                this.fileContent.push('SESSION_DURATION_IN_MINUTES='+this.configuration.session_duration_in_minutes+'\n')
            if(this.configuration.session_period_in_wakeup_period != null)
                this.fileContent.push('SESSION_PERIOD_IN_WAKEUP_PERIOD='+this.configuration.session_period_in_wakeup_period+'\n')
            this.fileContent.push('\n')
            if(this.configuration.reference_gps_module != null || this.configuration.reference_latitude != null || this.configuration.reference_longitude != null || this.configuration.reference_altitude != null)
                this.fileContent.push('[GPS_REFERENCE]\n')
            if(this.configuration.reference_gps_module != null)
                this.fileContent.push('GPS_MODULE='+this.configuration.reference_gps_module+'\n')
            if(this.configuration.reference_latitude != null)
                this.fileContent.push('LATITUDE='+this.configuration.reference_latitude+'\n')
            if(this.configuration.reference_longitude != null)
                this.fileContent.push('LONGITUDE='+this.configuration.reference_longitude+'\n')
            if(this.configuration.reference_altitude != null)
                this.fileContent.push('ALTITUDE='+this.configuration.reference_altitude+'\n')
            this.fileContent.push('\n')
            if(this.configuration.non_continuous_store_binr_to_sd != null || this.configuration.non_continuous_store_binr_to_ftp != null)
                this.fileContent.push('[DEBUG]\n')
            if(this.configuration.non_continuous_store_binr_to_sd != null)
                this.fileContent.push('NON_CONTINUOUS_STORE_BINR_TO_SD='+this.configuration.non_continuous_store_binr_to_sd+'\n')
            if(this.configuration.non_continuous_store_binr_to_ftp != null)
                this.fileContent.push('NON_CONTINUOUS_STORE_BINR_TO_FTP='+this.configuration.non_continuous_store_binr_to_ftp+'\n')

        },
        displayStatus(status){
            console.log(status)
            if(status=='201'){
                this.flashMessage.success({title: 'Success', message: 'The configuration has been successfully applied !'});
            }
            else
            {
                this.flashMessage.show({status: 'error', title: 'Error', message: 'An error occured while applying configuration'})
            }
            }
        }
    }
</script>