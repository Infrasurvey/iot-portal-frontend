<template>
    <div>
        <div class="main-install overview-inst">
            <section-title title= "Edit"></section-title>
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
                <button type="submit" class="apply-btn" @click="onPickFile">Import a configuration file   <font-awesome-icon icon="cloud-upload-alt"/></button>
                <input type="file" style="display: none" ref="fileInput" accept=".ini" @change="onFilePicked" multiple="false"/>
                <button type="submit" class="apply-btn" @click="applyConfig(generateConfigFile(configuration))">Apply</button>
            </div>
            <div v-if="pendingExist">
                <section-title title= "Pending"></section-title>
                <div>
                    <p>One configuration is pending and will be applied as soon as the base station will read the configuration gile</p>
                    <vue-good-table
                    :columns="columns"
                    :rows="pendingConfig"
                    @on-row-click="onPendingClick"/>
                    <button @click="removePendingConfiguration">Cancel</button>
                    <config-modal
                    v-if="isPendingModalVisible"
                    :is_pending="true"
                    :row="selectedRow"
                    :selectedConfig="selectedConfig"
                    @close="closeModal"
                    />
                </div>
            </div>
            
            <section-title title= "History"></section-title>
            <vue-good-table
            :columns="columns"
            :rows="configurations"
            @on-row-click="onConfigClick"/>

            <config-modal
                v-if="isConfigModalVisible"
                :is_pending="false"
                @apply="applyConfig"
                :row="selectedRow"
                :selectedConfig="selectedConfig"
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
    import SectionTitle from '../template/SectionTitle';
    export default {
        name: 'basestation-config',
        data(){
            return{
                installationId : this.$route.params.id,
                configurations : [],
                pendingConfig : [],
                configuration :{
                    continuous_mode : 1,
                    wakeup_period_in_minutes : '',
                    reference_gps_module : '',
                    reset : false,
                    session_start_time : '',
                    reference_longitude : '',
                    non_continuous_store_binr_to_ftp : false,
                    session_duration_in_minutes : '',
                    reference_latitude :'',
                    non_continuous_store_binr_to_sd: '',
                    session_period_in_wakeup_period : 1,
                    reference_altitude : ''
                    
                },
                isConfigModalVisible : false,
                isPendingModalVisible : false,
                selectedRow : [],
                pendingExist : false,
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
                uploadedFile : '',
                fileUrl : '',
                selectedConfig : '',
            }
        },
        components : {
            VueGoodTable,
            ConfigModal,
            SectionTitle
        },
        created(){
            this.getConfigurations()
            this.getPendingConfiguration()
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
        getPendingConfiguration(){
                API.get('/api/installation/'+this.installationId+'/basestation/pendingConfiguration')
                    .then(response => {
                        var responseCode = response.status
                        if(parseInt(responseCode) < 204){
                            var tmp = response.data.configuration;
                            tmp.file_name = "GM_BASE_STATION.ini"
                            tmp.configuration_date = response.data.date ;
                            this.pendingConfig = [tmp];
                            this.pendingExist = true;
                        }else{
                            this.pendingExist = false;
                        }
                        
                    })
                    .catch(e => {
                        this.errorMessage = e
                    })
            },
            removePendingConfiguration(){
                API.get('/api/installation/'+this.installationId+'/basestation/removePendingConfiguration')
                    .then(response => {
                       var responseCode = response.status
                        this.displayStatus(responseCode,'removed','removing pending')
                        this.getPendingConfiguration()
                        //this.$emit('getPendingConfiguration');
                    })
                    .catch(e => {
                        this.errorMessage = e
                    })
            },
            
        onConfigClick(params) {
            this.selectedRow = params.row;
            this.selectedConfig = this.generateConfigFile(params.row)
            this.isConfigModalVisible=true
        },
        onPendingClick(params){
            this.selectedRow = params.row;
            this.selectedConfig = this.generateConfigFile(params.row)
            this.isPendingModalVisible=true
        },
        closeModal() {
            this.isConfigModalVisible = false;
            this.isPendingModalVisible = false;
        },
        applyConfig(fileContent){
            
            var f = new File(fileContent, "config.ini");
            var form = new FormData();
            form.append('configuration', f);
            API.post('/api/installation/'+this.installationId+'/basestation/applyNewConfiguration',form)
            .then(response => {
                    var responseCode = response.status
                    this.displayStatus(responseCode,'applied','applying')
                    this.getPendingConfiguration()
                })
                .catch(e => {
                this.errorMessage = e
                })
        },
        generateConfigFile(config){
            var fileContent = []
            if(config.continuous_mode != null || config.reset != null || config.wakeup_period_in_minutes != null)
                fileContent.push('[GENERAL]\n')
            if(config.continuous_mode != null)
                fileContent.push('CONTINUOUS_MODE='+config.continuous_mode+'\n')
            if(config.reset != null)
                fileContent.push('RESET='+config.reset+'\n')
            if(config.wakeup_period_in_minutes != null)
                fileContent.push('WAKEUP_PERIOD_IN_MINUTES='+config.wakeup_period_in_minutes+'\n')
            fileContent.push('\n')
            if(config.session_start_time != null || config.session_duration_in_minutes != null || config.session_period_in_wakeup_period != null)
                fileContent.push('[MEASURE]\n')
            if(config.session_start_time != null)
                fileContent.push('SESSION_START_TIME='+config.session_start_time+'\n')
            if(config.session_duration_in_minutes != null)
                fileContent.push('SESSION_DURATION_IN_MINUTES='+config.session_duration_in_minutes+'\n')
            if(config.session_period_in_wakeup_period != null)
                fileContent.push('SESSION_PERIOD_IN_WAKEUP_PERIOD='+config.session_period_in_wakeup_period+'\n')
            fileContent.push('\n')
            if(config.reference_gps_module != null || config.reference_latitude != null || config.reference_longitude != null || config.reference_altitude != null)
                fileContent.push('[GPS_REFERENCE]\n')
            if(config.reference_gps_module != null)
                fileContent.push('GPS_MODULE='+config.reference_gps_module+'\n')
            if(config.reference_latitude != null)
                fileContent.push('LATITUDE='+config.reference_latitude+'\n')
            if(config.reference_longitude != null)
                fileContent.push('LONGITUDE='+config.reference_longitude+'\n')
            if(config.reference_altitude != null)
                fileContent.push('ALTITUDE='+config.reference_altitude+'\n')
            fileContent.push('\n')
            if(config.non_continuous_store_binr_to_sd != null || config.non_continuous_store_binr_to_ftp != null)
                fileContent.push('[DEBUG]\n')
            if(config.non_continuous_store_binr_to_sd != null)
                fileContent.push('NON_CONTINUOUS_STORE_BINR_TO_SD='+config.non_continuous_store_binr_to_sd+'\n')
            if(config.non_continuous_store_binr_to_ftp != null)
                fileContent.push('NON_CONTINUOUS_STORE_BINR_TO_FTP='+config.non_continuous_store_binr_to_ftp+'\n')
            return fileContent;
        },
        displayStatus(status, type,type2){
            console.log(status)
            if(parseInt(status) < 204){
                this.flashMessage.success({title: 'Success', message: 'The configuration has been successfully '+type+' !'});
            }
            else
            {
                this.flashMessage.show({status: 'error', title: 'Error', message: 'An error occured while '+type2+' configuration'})
            }
            },
        onPickFile () {
            this.$refs.fileInput.click()
        },
        onFilePicked (event) {
            const files = event.target.files
            let filename = files[0].name
            const fileReader = new FileReader()
            fileReader.addEventListener('load', () => {
                this.uploadedFile = fileReader.result.split("\n")
                this.setInputValues(this.uploadedFile)
            })
            fileReader.readAsText(files[0])
            
            
        },
        setInputValues(file){
            var tmpConfig = {
                    continuous_mode : 1,
                    wakeup_period_in_minutes : '',
                    reference_gps_module : '',
                    reset : false,
                    session_start_time : '',
                    reference_longitude : '',
                    non_continuous_store_binr_to_ftp :false,
                    session_duration_in_minutes : '',
                    reference_latitude :'',
                    non_continuous_store_binr_to_sd: '',
                    session_period_in_wakeup_period : 1,
                    reference_altitude : ''
                    
                }
            file.forEach(line => {
                if(line != '' && !line.includes("[") ){
                    var key = line.split("=")[0].toLowerCase()
                    var value = line.split("=")[1]
                    tmpConfig[key] = value
                }
            });
            this.configuration = tmpConfig
        }
        }
    }
</script>