<script>
import { Line, mixins } from 'vue-chartjs'
import 'chartjs-plugin-crosshair'
const { reactiveProp } = mixins

export default {
    extends: Line,
    mixins: [reactiveProp],
    data(){
        return{
            options: {
    responsive: true,
    
      title: {
        display: true,
        text: 'Plot title'
    
    },
    scales: {
      xAxes: [{
        ticks: {
          display : false
        }
      }]
    },
    plugins: {
      crosshair: {
        sync: {
          enabled: false,            // enable trace line syncing with other charts
          group: 1,                 // chart group
          suppressTooltips: false   // suppress tooltips when showing a synced tracer
        },
        zoom: {
          enabled: true,                                      // enable zooming
          zoomboxBackgroundColor: 'rgba(66,133,244,0.2)',     // background color of zoom box 
          zoomboxBorderColor: '#48F',                         // border color of zoom box
          zoomButtonText: 'Reset Zoom',                       // reset zoom button text
          zoomButtonClass: 'reset-zoom',                      // reset zoom button class
        },
        callbacks: {
          beforeZoom: function(start, end) {                  // called before zoom, return false to prevent zoom
            return true;
          },
          afterZoom: function(start, end) {                   // called after zoom
          }
        }
      }
    }
  },
        }
    },
    mounted() {
        this.renderChart(this.chartData, this.options)
    }
}
</script>
