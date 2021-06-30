<template>
    <div id="container-three">
    </div>
</template>
<script>
import * as THREE from 'three';
import { TrackballControls } from 'three-trackballcontrols-ts';

export default {
    name : 'inclination-component',
    props :{
        inclination :{
            required : true
        }
    },
    data(){
        return{
            s1:3,
            s2:1,
            s3:0.5,
            perspectiveCamera:null,
            scene : null,
            controls : null,
            renderer : null
        }
    },
    mounted(){
        this.setUpThree()        
    },
    methods:{
        setUpThree(){
            const aspect = 250 / 300;
            this.perspectiveCamera = new THREE.PerspectiveCamera(45,aspect,0.1,1000 );
            this.perspectiveCamera.position.set(0.8,0.8,1.1);
            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color( 0xFAFAFA );

            let axis = new THREE.AxisHelper();
            var colors = axis.geometry.attributes.color;
            colors.setXYZ( 0, 0, 0, 0 ); // index, R, G, B
            colors.setXYZ( 1,  0, 0, 0 ); // red
            colors.setXYZ( 2, 0, 0, 0  );
            colors.setXYZ( 3,  0, 0, 0 ); // green
            colors.setXYZ( 4, 0, 0, 0  );
            colors.setXYZ( 5, 0, 0, 0  ); // blue
            //this.scene.add(axis); 

            if(this.inclination.length > 0){
                var from = new THREE.Vector3( 0,0-0.4,0 );
                var resizeFactor = 0.7;
                var x = this.inclination[0]*resizeFactor;
                var y = this.inclination[1]*resizeFactor-0.4;
                var z = this.inclination[2]*resizeFactor;
                var to = new THREE.Vector3(x,y,z);
                var direction = to.clone().sub(from);
                var length = direction.length();
                var arrowHelper = new THREE.ArrowHelper(direction.normalize(), from, length, 0xff0000,0.1);
                this.scene.add( arrowHelper );

                var points = [];
                points.push( new THREE.Vector3(x,-0.4,z) );
                points.push( new THREE.Vector3(x,y,z) );
                var geometry = new THREE.BufferGeometry().setFromPoints( points );
                var material = new THREE.LineDashedMaterial( { color: 0x000000, dashSize: 0.01, gapSize:0.01,transparent: true,opacity: 0.5 } );
                var line = new THREE.Line( geometry, material );
                line.computeLineDistances();
                this.scene.add(line); 

                points = [];
                points.push( new THREE.Vector3(0,-0.4,z) );
                points.push( new THREE.Vector3(x,-0.4,z) );
                geometry = new THREE.BufferGeometry().setFromPoints( points );
                line = new THREE.Line( geometry, material );
                line.computeLineDistances();
                this.scene.add(line); 

                points = [];
                points.push( new THREE.Vector3(x,-0.4,0) );
                points.push( new THREE.Vector3(x,-0.4,z) );
                geometry = new THREE.BufferGeometry().setFromPoints( points );
                line = new THREE.Line( geometry, material );
                line.computeLineDistances();
                this.scene.add(line); 
            }
            
            material = new THREE.LineBasicMaterial( { color: 0x000000 } );

            points = [];
            points.push( new THREE.Vector3(0,-0.4,0) );
            points.push( new THREE.Vector3(0.4,0-0.4,0) );
            geometry = new THREE.BufferGeometry().setFromPoints( points );
            line = new THREE.Line( geometry, material );
            line.computeLineDistances();
            this.scene.add(line); 

            points = [];
            points.push( new THREE.Vector3(0,-0.4,0) );
            points.push( new THREE.Vector3(0,1-0.4,0) );
            geometry = new THREE.BufferGeometry().setFromPoints( points );
            line = new THREE.Line( geometry, material );
            line.computeLineDistances();
            this.scene.add(line); 

            points = [];
            points.push( new THREE.Vector3(0,-0.4,0) );
            points.push( new THREE.Vector3(0,-0.4,0.4) );
            geometry = new THREE.BufferGeometry().setFromPoints( points );
            line = new THREE.Line( geometry, material );
            line.computeLineDistances();
            this.scene.add(line); 

            this.renderer = new THREE.WebGLRenderer( { antialias: true } );
            this.renderer.setPixelRatio( window.devicePixelRatio );
            this.renderer.setSize( 250, 300);
            document.getElementById('container-three').appendChild( this.renderer.domElement );
            this.controls = new TrackballControls( this.perspectiveCamera, this.renderer.domElement );

            this.controls.rotateSpeed = 1.0;
            this.controls.zoomSpeed = 1.2;
            this.controls.panSpeed = 0.8;    
            this.animate()
        },
        animate(){
            requestAnimationFrame( this.animate);
			    this.controls.update();
                this.renderer.render( this.scene, this.perspectiveCamera );
        },
    }
}
</script>
