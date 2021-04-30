<template>
    <div>
        <div class="main-install overview-inst">
            <h2>System informatinons</h2>
            <div class="flex-left">
                <div class="overview-info-tile">
                    <h3>Connection</h3>
                    <p>
                        Last Configuration :  <br>
                        Last communication : 
                    </p>
                </div>
                <div class="overview-info-tile">
                    <h3>General</h3>
                    <p>
                        Name : {{ basestation.name }}<br>
                        Installed rovers : {{ basestation.device_rover_count }}<br>
                        Battery voltage : {{ basestation.battery_voltage }}<br>
                        Available memory : {{ basestation.available_memory }}
                    </p>
                </div>
                <div class="overview-info-tile">
                    <h3>BBB Info</h3>
                    <p>
                        Version : {{ basestation.bbb_version }}<br>
                        MD5 : {{ basestation.bbb_md5 }}<br>
                        MAC : {{ basestation.bbb_mac_address }}
                    </p>
                </div>
            </div>
            <h2>Actual configuration</h2>
            <div class="flex-left">
                <p class="overview-actual-p">
                    Application date : <br>
                    Wake up period : {{ basestation.last_configuration.wakeup_period_in_minutes }} min.<br>
                    Reference GPS module : {{ basestation.last_configuration.reference_gps_module }}
                </p>
                <p class="overview-actual-p">
                    Continuous mode : {{ basestation.last_configuration.continuous_mode }}<br>
                    Session start time : {{ basestation.last_configuration.session_start_time }}<br>
                    Reference longitude : {{ basestation.last_configuration.reference_longitude }}
                </p>
                <p class="overview-actual-p">
                    Reset : {{ basestation.last_configuration.reset }}<br>
                    Session duration : {{ basestation.last_configuration.session_duration_in_minutes }}<br>
                    Reference latitude :{{ basestation.last_configuration.reference_latitude }}
                </p>
                <p class="overview-actual-p">
                    Non continous store bind to FTP : {{ basestation.last_configuration.non_continuous_store_binr_to_ftp }}<br>
                    Session period in wakeup period : {{ basestation.last_configuration.session_period_in_wakeup_period }}<br>
                    Reference altitude :{{ basestation.last_configuration.reference_altitude }}m
                </p>
            </div>
            
            

        </div>
    </div>
</template>

<script>
//https://github.com/IonDen/ion.rangeSlider
    import API from '../../http-constants'

    export default {
        name: 'basestation-overview',
        data(){
            return{
                stationId : this.$route.query.id,
                basestation:'',
                errorMessage: ''
            }
        },
        created(){
            this.getBaseStationConfig()
        },
        methods:{
            getBaseStationConfig(){
                API.get('/api/device/basestation/'+this.stationId)
                    .then(response => {
                        this.basestation =response.data;
                    })
                    .catch(e => {
                        this.errorMessage = e
                    })
            }
        }
    }
</script>