    
<template>
    <div>
        <sidenav :stationid="stationId"></sidenav>
        <div class="main-install overview-inst">
            <h2>Informations</h2>
            <p>informatinons...</p>
            <h2>Battery state</h2>
            <div class="flex-container batteries">
                <battery-status v-for="battery in fakestation.batteries" :key="battery.id" :battery="battery"> </battery-status>
            </div>
            <h2>Landslide evolution</h2>
            <div>add map</div>
        </div>
    </div>

</template>
    
<script>
    //https://developers.google.com/maps/documentation/javascript/examples/polyline-simple
    //https://developers.google.com/maps/documentation/javascript/examples/overlay-symbol-arrow
    // https://docs.mapbox.com/mapbox.js/example/v1.0.0/dynamically-drawing-a-line/
    // https://developer.here.com/documentation/examples/maps-js/geoshapes/polyline-on-the-map
    import Sidenav from '../template/Sidenav'
    import BatteryStatus from './battery_status'
    import API from '../../http-constants'

    export default {
            name: 'Overview',
            components: {
                Sidenav,
                BatteryStatus
        },
            data () {
                return {
                stationId : this.$route.query.id.toString(),
                station: '',
                fakestation : {
                    name : "test",
                    batteries : [
                        {
                            name : "rover 1",
                            batteryValue : 11.2
                        },
                        {
                            name : "rover 2",
                            batteryValue : 13.2
                        },
                        {
                            name : "rover 3",
                            batteryValue : 8
                        },
                        {
                            name : "rover 3",
                            batteryValue : 8
                        },
                        {
                            name : "rover 3",
                            batteryValue : 8
                        },
                        {
                            name : "rover 3",
                            batteryValue : 8
                        },
                        {
                            name : "rover 3",
                            batteryValue : 8
                        }
                    ]
                },
                errorMessage: ''
                }
            },
            created(){
                this.getStation(this.$route.query.id)
            },
            methods: {
                getStation: function (stationId) {
                API.get('/api/device/basestation/'+stationId)
                    .then(response => {
                    this.station =response.data
                    })
                    .catch(e => {
                    this.errorMessage = e
                    })
                }
            }
        }
</script>
  