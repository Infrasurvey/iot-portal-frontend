<template>
    <div>
        <div class="main-install overview-inst">
            <section-title title= "Edit"></section-title>
            <div class="flex-container configurations">
                <div class="basestation-field ">
                    <label for="mode" class="disabled" >Continous mode : </label>
                    <md-checkbox class="input-config"  name="mode" id="mode" v-model="configuration.continuous_mode" disabled></md-checkbox>
                </div>
                <div class="basestation-field" >
                    <label for="wake">Wake up period : </label>
                    <md-field class="input-config" :class="getValidationClass('wakeup_period_in_minutes')">
                        <md-input type="number" min="0" max="65535" name="wake" id="wake" v-model="configuration.wakeup_period_in_minutes"></md-input>
                        <span class="md-error" style="width: max-content;" v-if="!$v.configuration.wakeup_period_in_minutes.minValue">Min value is 0</span>
                        <span class="md-error" style="width: max-content;" v-if="!$v.configuration.wakeup_period_in_minutes.maxValue">Max value is 65535</span>
                    </md-field>
                    <span>min.</span>
                </div>
                <div class="basestation-field" >
                    <label for="gps">Reference GPS module : </label>
                    <md-field class="input-config" :class="getValidationClass('gps_module')">
                        <md-input name="gps" id="gps" type="number" min="0" max="15" v-model="configuration.gps_module"></md-input>
                        <span class="md-error" style="width: max-content;" v-if="!$v.configuration.gps_module.minValue">Min value is 0</span>
                        <span class="md-error" style="width: max-content;" v-if="!$v.configuration.gps_module.maxValue">Max value is 15</span>
                    </md-field>
                </div>
                <div class="basestation-field">
                    <label for="reset">Reset : </label>
                    <md-checkbox name="reset" id="reset" v-model="configuration.reset"></md-checkbox>
                </div>
                <div class="basestation-field">
                    <label for="start">Session start time : </label> 
                    <md-field class="input-config" :class="getValidationClass('session_start_time')">
                        <md-input name="start" id="start" v-model="configuration.session_start_time"></md-input>
                        <span class="md-error" style="width: max-content;" v-if="!$v.configuration.session_start_time.isTime">Time format not valid hh:mm:ss</span>
                    </md-field>
                </div>
                <div class="basestation-field">
                    <label for="longitude">Reference longitude : </label>
                    <md-field class="input-config" :class="getValidationClass('longitude')">
                        <md-input name="longitude" id="longitude" v-model="configuration.longitude"></md-input>
                        <span class="md-error" style="width: max-content;" v-if="!$v.configuration.longitude.isLongitude">Format not valid</span>
                    </md-field>
                </div>
                <div class="basestation-field">
                    <label for="ncsbf">Non continous stor binr to FTP : </label>
                    <md-checkbox name="ncsbf" id="ncsbf" v-model="configuration.non_continuous_store_binr_to_ftp"></md-checkbox>
                </div>
                <div class="basestation-field">
                    <label for="duration">Session duration : </label>
                    <md-field class="input-config" :class="getValidationClass('session_duration_in_minutes')">
                        <md-input  name="duration" id="duration" type="number" min="1" max="255" v-model="configuration.session_duration_in_minutes"></md-input>
                        <span class="md-error" style="width: max-content;" v-if="!$v.configuration.session_duration_in_minutes.minValue">Min value is 1</span>
                        <span class="md-error" style="width: max-content;" v-if="!$v.configuration.session_duration_in_minutes.maxValue">Max value is 255</span>
                    </md-field>
                    <span>min.</span>
                </div>
                <div class="basestation-field">
                    <label for="latitude">Reference latitude : </label>
                    <md-field class="input-config" :class="getValidationClass('latitude')">
                        <md-input  name="latitude" id="latitude" v-model="configuration.latitude"></md-input>
                        <span class="md-error" style="width: max-content;" v-if="!$v.configuration.latitude.isLatitude">Format not valid</span>
                    </md-field>
                </div>
                <div class="basestation-field">
                    <label for="ncsbs">Non continous store binr to SD : </label>
                    <md-checkbox name="ncsbs" id="ncsbs" v-model="configuration.non_continuous_store_binr_to_sd"></md-checkbox>
                </div>
                <div class="basestation-field">
                    <label for="period" >Session in wakeup period :</label>
                    <md-field class="input-config" :class="getValidationClass('session_period_in_wakeup_period')">
                        <md-input name="spwp" id="spwp" type="number" min="1" max="255" v-model="configuration.session_period_in_wakeup_period"></md-input>
                        <span class="md-error" style="width: max-content;" v-if="!$v.configuration.session_period_in_wakeup_period.minValue">Min value is 1</span>
                        <span class="md-error" style="width: max-content;" v-if="!$v.configuration.session_period_in_wakeup_period.maxValue">Max value is 255</span>
                    </md-field>
                </div>
                <div class="basestation-field">
                    <label for="alttitude">Reference altitude : </label>
                    <md-field class="input-config" :class="getValidationClass('altitude')">
                        <md-input  name="alttitude" id="alttitude"  v-model="configuration.altitude"></md-input>
                        <span class="md-error" style="width: max-content;" v-if="!$v.configuration.altitude.integer">Value must be integer</span>
                    </md-field>
                    <span>m.</span>
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
                    <p>One configuration is pending and will be applied as soon as the base station will read the configuration file</p>
                    <vue-good-table
                    :columns="columns"
                    :rows="pendingConfig"
                    @on-row-click="onPendingClick"/>
                    <div class="apply-container">
                        <button class="apply-btn" @click="removePendingConfiguration">Cancel</button>
                    </div>
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
    import { minValue,maxValue, required,numeric,decimal,integer } from 'vuelidate/lib/validators'
    import API from '../../http-constants'
    import { VueGoodTable } from 'vue-good-table';
    import ConfigModal from './configuration_modal'
    import FormData from 'form-data'
    import SectionTitle from '../template/SectionTitle';
    const isLatitude = (value) => value.match(/^$|^((\-?|\+?)?\d+(\.\d+)?)$/g) != null
    const isLongitude = (value) => value.match(/^$|^((\-?|\+?)?\d+(\.\d+)?)$/g) != null
    const isTime = (value) => value.match(/^$|^([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/g) != null
    export default {
        name: 'basestation-config',
        data(){

            return{
                installationId : this.$route.params.id,
                configurations : [],
                pendingConfig : [],
                configuration :{
                    continuous_mode : true,
                    wakeup_period_in_minutes : '',
                    gps_module : '',
                    reset : false,
                    session_start_time : '',
                    longitude : '',
                    non_continuous_store_binr_to_ftp : false,
                    session_duration_in_minutes : '',
                    latitude :'',
                    non_continuous_store_binr_to_sd: '',
                    session_period_in_wakeup_period : '',
                    altitude : ''
                    
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
        validations: {
            configuration:{
                continuous_mode:{
                    required,
                },
                wakeup_period_in_minutes:{
                    //required,
                    numeric,
                    minValue : minValue(0),
                    maxValue : maxValue(65535)
                },
                gps_module:{
                    //required,
                    numeric,
                    minValue : minValue(0),
                    maxValue : maxValue(15)
                },
                session_period_in_wakeup_period:{
                    //required,
                    numeric,
                    minValue : minValue(1),
                    maxValue : maxValue(255)
                },
                reset:{
                    //required,
                },
                session_start_time:{
                    //required
                    isTime
                },
                non_continuous_store_binr_to_ftp:{
                    //required
                },
                non_continuous_store_binr_to_sd:{
                    //required
                },
                session_duration_in_minutes:{
                    //required,
                    numeric,
                    minValue : minValue(1),
                    maxValue : maxValue(255)
                },
                latitude:{
                    //required,
                    decimal,
                    isLatitude
                },
                longitude:{
                    //required,
                    decimal,
                    isLongitude
                },
                altitude:{
                    //required,
                    integer
                }
            }
        },
        components : {
            VueGoodTable,
            ConfigModal,
            SectionTitle
        },
        watch: {
        async $route(to, from) {
          this.installationId = to.params.id.toString()
          this.getConfigurations()
          this.getPendingConfiguration()
        }
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
                this.$v.$touch();
                if(this.$v.$error) return
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
            isFieldNotEmpty(field){
                if(field != '' && field != null)
                    return true
                return false
            },
            generateConfigFile(config){
                var fileContent = []
                
                if(config.hasOwnProperty('continuous_mode') || config.hasOwnProperty('reset') || config.hasOwnProperty('wakeup_period_in_minutes') ){
                    if(this.isFieldNotEmpty(config.continuous_mode) || this.isFieldNotEmpty(config.reset) || this.isFieldNotEmpty(config.wakeup_period_in_minutes))
                        fileContent.push('[GENERAL]\n')
                }
                if(config.hasOwnProperty('continuous_mode') && this.isFieldNotEmpty(config.continuous_mode))
                    fileContent.push('CONTINUOUS_MODE='+((config.continuous_mode === '1' || config.continuous_mode === true) ? 1 : 0)+'\n')
                if(config.hasOwnProperty('reset') && this.isFieldNotEmpty(config.reset))
                    fileContent.push('RESET='+((config.reset === '1' || config.reset === true) ? 1 : 0)+'\n')
                if(config.hasOwnProperty('wakeup_period_in_minutes') && this.isFieldNotEmpty(config.wakeup_period_in_minutes))
                    fileContent.push('WAKEUP_PERIOD_IN_MINUTES='+config.wakeup_period_in_minutes+'\n')
                fileContent.push('\n')
                if(config.hasOwnProperty('session_start_time') || config.hasOwnProperty('session_duration_in_minutes') || config.hasOwnProperty('session_period_in_wakeup_period') ){
                     if(this.isFieldNotEmpty(config.session_start_time) || this.isFieldNotEmpty(config.session_duration_in_minutes) || this.isFieldNotEmpty(config.session_period_in_wakeup_period))
                        fileContent.push('[MEASURE]\n')
                }
                if(config.hasOwnProperty('session_start_time') && this.isFieldNotEmpty(config.session_start_time))
                    fileContent.push('SESSION_START_TIME='+config.session_start_time+'\n')
                if(config.hasOwnProperty('session_duration_in_minutes') && this.isFieldNotEmpty(config.session_duration_in_minutes))
                    fileContent.push('SESSION_DURATION_IN_MINUTES='+config.session_duration_in_minutes+'\n')
                if(config.hasOwnProperty('session_period_in_wakeup_period') && this.isFieldNotEmpty(config.session_period_in_wakeup_period))
                    fileContent.push('SESSION_PERIOD_IN_WAKEUP_PERIOD='+config.session_period_in_wakeup_period+'\n')
                fileContent.push('\n')
                if(config.hasOwnProperty('gps_module') || config.hasOwnProperty('latitude') || config.hasOwnProperty('longitude')|| config.hasOwnProperty('altitude') ){
                    if(this.isFieldNotEmpty(config.gps_module)|| this.isFieldNotEmpty(config.latitude) || this.isFieldNotEmpty(config.longitude) || this.isFieldNotEmpty(config.altitude))
                        fileContent.push('[GPS_REFERENCE]\n')
                }
                
                if(config.hasOwnProperty('gps_module') && this.isFieldNotEmpty(config.gps_module))
                    fileContent.push('GPS_MODULE='+config.gps_module+'\n')
                if(config.hasOwnProperty('latitude') && this.isFieldNotEmpty(config.latitude))
                    fileContent.push('LATITUDE='+config.latitude+'\n')
                if(config.hasOwnProperty('longitude') && this.isFieldNotEmpty(config.longitude))
                    fileContent.push('LONGITUDE='+config.longitude+'\n')
                if(config.hasOwnProperty('altitude') && this.isFieldNotEmpty(config.altitude))
                    fileContent.push('ALTITUDE='+config.altitude+'\n')
                fileContent.push('\n')
                if(config.hasOwnProperty('non_continuous_store_binr_to_sd') || config.hasOwnProperty('non_continuous_store_binr_to_ftp') ){
                    if(config.non_continuous_store_binr_to_sd != null || config.non_continuous_store_binr_to_ftp != null)
                        fileContent.push('[DEBUG]\n')
                }

                if(config.hasOwnProperty('non_continuous_store_binr_to_sd') && config.non_continuous_store_binr_to_sd != null)
                    fileContent.push('NON_CONTINUOUS_STORE_BINR_TO_SD='+((config.non_continuous_store_binr_to_sd === '1' || config.non_continuous_store_binr_to_sd === true) ? 1 : 0)+'\n')
                if(config.hasOwnProperty('non_continuous_store_binr_to_ftp') && config.non_continuous_store_binr_to_ftp != null)
                    fileContent.push('NON_CONTINUOUS_STORE_BINR_TO_FTP='+((config.non_continuous_store_binr_to_ftp === '1' || config.non_continuous_store_binr_to_ftp === true) ? 1 : 0)+'\n')
                
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
            getValidationClass (fieldName) {
                const field = this.$v.configuration[fieldName]

                if (field) {
                    return {
                    'md-invalid': field.$invalid && field.$dirty
                    }
                }
            },
            setInputValues(file){
                var tmpConfig = {
                        continuous_mode : 1,
                        wakeup_period_in_minutes : '',
                        gps_module : '',
                        reset : false,
                        session_start_time : '',
                        longitude : '',
                        non_continuous_store_binr_to_ftp :false,
                        session_duration_in_minutes : '',
                        latitude :'',
                        non_continuous_store_binr_to_sd: '',
                        session_period_in_wakeup_period : '',
                        altitude : ''
                        
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