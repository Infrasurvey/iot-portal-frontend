    
<template>
    <div>
        <sidenav :stationid="stationId"></sidenav>
        <div class="main-install overview-inst">
            <h2>Informations</h2>
            <p>informatinons...</p>
            <h2>Battery state</h2>
            <div class="flex-container batteries">
                <battery-status v-for="battery in batteryDisplay" :key="battery.id" :battery="battery"> </battery-status>
            </div>
            <h2>Landslide evolution</h2>
            <div>
                <l-map :zoom="zoom"
                :center="center"
                style="height: 500px; width: 100%"
                :maxZoom="maxZoom"> 
                    <l-tile-layer
                        :url="url"
                        :attribution="attribution"
                        :options="{ maxNativeZoom: 18, maxZoom: 25 }"
                    />
                
                        
                    <l-polyline 
                        v-for="polyline in polylines"
                        :key="polyline.key"
                        :lat-lngs="polyline"
                        color="#AB000D"
                    />
                </l-map></div>
        </div>
    </div>

</template>
    
<script>
//                    <polyline-decorator v-for="polyline in polylines" :key="polyline.key" :paths="[polyline]" :patterns="patterns"></polyline-decorator>

    //https://developers.google.com/maps/documentation/javascript/examples/polyline-simple
    //https://developers.google.com/maps/documentation/javascript/examples/overlay-symbol-arrow
    // https://docs.mapbox.com/mapbox.js/example/v1.0.0/dynamically-drawing-a-line/
    // https://developer.here.com/documentation/examples/maps-js/geoshapes/polyline-on-the-map
    import Sidenav from '../template/Sidenav'
    import BatteryStatus from './battery_status'
    import API from '../../http-constants'
    import L from "leaflet";
    import {
    LMap,
    LTileLayer,
    LPolyline,
    LCircle,
    Vue2LeafletPolylineDecorator
    } from "vue2-leaflet";

    export default {
            name: 'Overview',
            components: {
                Sidenav,
                BatteryStatus,
                LMap,
                LTileLayer,
                LPolyline,
                LCircle
        },
            data () {
                      let patterns = [
                    {offset: '100%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 30, pathOptions: {color: '#AB000D'}})}
                ]
                return {
                stationId : this.$route.query.id.toString(),
                station: '',
                batteryDisplay : '',
                rovers : '',
                errorMessage: '',
                zoom: 11,
                center: [46.68002385,7.312523534],
                polylines:[],
                /*
                polyline: {
                    latlngs: [
                    [47.334852, -1.509485],
                    [47.342596, -1.328731],
                    [47.241487, -1.190568],
                    [47.234787, -1.358337]
                    ],
                    color: "#AB000D"
                },*/
                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                
                maxZoom:25,
                options:{
                    maxNativeZoom:19
                },
                patterns,
                }
                
            },
            created(){
                this.getStation(this.$route.query.id)
            },
            methods: {
                getStation: function (stationId) {
                API.get('/api/device/basestation/'+stationId+'/rovers')
                    .then(response => {
                        this.station =response.data;
                        this.rovers = this.station.rovers
                        this.batteryDisplay = [{'unique_id':this.station.name,'battery_voltage':this.station.battery_voltage}]
                        this.batteryDisplay = this.batteryDisplay.concat(this.rovers)
                        
                        this.createMapOverlay()
                    })
                    .catch(e => {
                    this.errorMessage = e
                    })
                },
                createMapOverlay(){
                    this.rovers.forEach(rover => {
                        console.log(rover)
                        var polyline = []
                        //polyline.push([rover.coordinate_x,coordinate_y])
                        /*rover.positions.forEach(position=>{
                            polyline.push([position.latitude,position.longitude])
                        })*/
                        polyline.push([rover.positions[0].latitude,rover.positions[0].longitude])
                        polyline.push([rover.positions[rover.positions.length-1].latitude,rover.positions[rover.positions.length-1].longitude])

                        this.polylines.push(polyline)
                    });
                }
            }
        }
</script>
  