<template>
    <div>
        <sidenav :stationid="this.$route.query.id"></sidenav>
        <div class="main-install overview-inst">
            <h2>Edit</h2>
            <div>
                <div>
                    <label for="mode">Continous mode : </label>
                    <input type="checkbox" name="mode" id="mode">
                    <label for="reset">Reset : </label>
                    <input type="checkbox" name="reset" id="reset">
                    <label for="ncsbf">Non continous stor binr to FTP : </label>
                    <input type="checkbox" name="ncsbf" id="ncsbf">
                    <label for="ncsbs">Non continous store binr to SD : </label>
                    <input type="checkbox" name="ncsbs" id="ncsbs">
                </div>
                <div>
                    <label for="wake">Wake up period : </label>
                    <input type="text" name="wake" id="wake"> <p>min</p>
                    <label for="start">Session strt time : </label> <p>HH:MM:SS</p>
                    <input type="text" name="start" id="start">
                    <label for="duration">Session duration : </label>
                    <input type="text" name="duration" id="duration"> <p>min</p>
                    <label for="period">Session period in wakeup period : </label>
                    <input type="checkbox" name="period" id="period">
                </div>
                <div>
                    <label for="gps">Reference GPS module : </label>
                    <input type="text" name="gps" id="gps">
                    <label for="longitude">Reference longitude : </label>
                    <input type="text" name="longitude" id="longitude">
                    <label for="latitude">Reference latitude : </label>
                    <input type="text" name="latitude" id="latitude"> <p>min</p>
                    <label for="alttitude">Reference altitude : </label>
                    <input type="text" name="alttitude" id="alttitude">
                </div>
            </div>
            <h2>Pending</h2>
            <div>
                <p>One configuration is pending and will be applied as soon as the base station will read the configuration gile</p>
                <button>Cancel</button>
            </div>
            <h2>History</h2>
            #TODO
        </div>
    </div>
</template>

<script>
    import Sidenav from '../template/Sidenav'

    export default {
        name: 'ConfigurationStation',
        components : {
            Sidenav
        }
    }
</script>