<template>
    <div>
        <sidenav :stationid="this.$route.query.id"></sidenav>
        <div class="main-install overview-inst">
            <h2>System informatinons</h2>
            <div class="flex-container">
                <div>
                    <h3>Connection</h3>
                    <p>
                        Last Configuration : <br>
                        Last communication : 
                    </p>
                </div>
                <div>
                    <h3>General</h3>
                    <p>
                        Name : <br>
                        Installed rovers : <br>
                        Battery ovltage : <br>
                        Available memory : 
                    </p>
                </div>
                <div>
                    <h3>BBB Info</h3>
                    <p>
                        Version : <br>
                        MD5 : <br>
                        MAC : 
                    </p>
                </div>
            </div>
            <h2>Actual configuration</h2>
            <div>
                <p>
                    Application date : <br>
                    Wake up period : <br>
                    Reference GPS module : 
                </p>
                <p>
                    Continuous mode : <br>
                    Session start time : <br>
                    Reference longitude : 
                </p>
                <p>
                    Reset : <br>
                    Session duration : <br>
                    Reference latitude :
                </p>
                <p>
                    Non continous store bind to FTP : <br>
                    Session period in wakeup period : <br>
                    Reference altitude :
                </p>
            </div>
            
            

        </div>
    </div>
</template>

<script>
    import Sidenav from '../template/Sidenav'

    export default {
        name: 'OverviewStation',
        components : {
            Sidenav
        }
    }
</script>