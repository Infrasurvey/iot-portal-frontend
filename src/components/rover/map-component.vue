<template>
    <div id="container-map">
        <l-map :zoom="zoom"
                :center="center"
                style="height: 500px; width: 100%"
                :maxZoom="maxZoom"> 
                    <l-tile-layer
                        :url="url"
                        :attribution="attribution"
                        :options="{ maxNativeZoom: 18, maxZoom: 25 }"
                    />
                    <l-marker 
                    style="background-color: transparent;"
                    v-for="circle in circles"
                    :key="circle.id"
                    :lat-lng="circle.pos"
                    >
                    <l-icon
                        :icon-size="[10, 10]"
                        :icon-anchor="[5, 5]"
                        >
                        <img src="./reddot.png" >
                        </l-icon>
                    </l-marker> 

                </l-map>
    </div>

</template>
<script>
    import L from "leaflet";
    import {
        LMap,
        LTileLayer,
        LPolyline,
        LCircle,
        LPopup,
        LMarker,
        LIcon,
        Vue2LeafletPolylineDecorator
        } from "vue2-leaflet";
    export default {
        name : 'map-component',
        props : {
            positions :{
                type:Array,
                required : true
            }
        },
        watch: {
            positions (val, oldVal) {
            if (val !== oldVal){
                console.log("true")
                this.createMapOverlay()
            } 
            }
        },
        components :{
            LMap,
            LTileLayer,
            LPolyline,
            LPopup,
            LMarker,
            LIcon,
            LCircle
        },
        data () {
            let patterns = [
                {offset: '100%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 30, pathOptions: {color: '#AB000D'}})}]
            return {
            src : '',
            zoom: 11, 
            center: [46.303663499,7.200980761],
            polylines:[],
            circles : [
              
            ],
            
            greenIcon : L.divIcon({
                html: "<div style='background-color: transparent;' class='marker-pin'>test</div>",

                iconSize:     [25, 19], // size of the icon
                iconAnchor:   [22, 18], // point of the icon which will correspond to marker's location
                popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
            }),
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
        mounted(){
            this.createMapOverlay()      
        },
        methods:{
            createMapOverlay(){
                if(this.positions.length > 0){
                    this.positions.forEach(position => {
                    this.circles.push({'id':position.id, 'pos':[position.latitude,position.longitude]})
                });
                this.center = [this.positions[0].latitude,this.positions[0].longitude]
                console.log(this.circles)
                }
                
            }
        }
    }
</script>
