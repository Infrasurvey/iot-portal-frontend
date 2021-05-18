<script>
import { Line, mixins } from 'vue-chartjs'
import zoom from 'chartjs-plugin-zoom';
const { reactiveProp } = mixins

export default {
    extends: Line,
    mixins: [reactiveProp],
    data(){
        return{
            options: {
                responsive: true,
                title: {
                  display: false,
                  text: 'Plot title'
              
              },
              scales: {
                xAxes: [{
                  ticks: {
                    display : true,
                    autoskip: true,
                    autoSkipPadding :50 
                  }
                }]
              },
              legend :{
                  position :'bottom'
                },
              plugins: {
                
                pan: {
                          enabled: true,
                          mode: 'x'
                        },
                zoom: {
                      zoom: {
                        enabled: true,
                        drag: false,
                        mode: 'x',
                        speed: 0.99,
                        threshold: 2,

                        // On category scale, minimal zoom level before actually applying zoom
                        sensitivity: 1,
                        
                      }
                    }
              }
            },
        }
    },
    mounted() {
      this.addPlugin(zoom);
        this.renderChart(this.chartData, this.options)
    }
}

		window.resetZoom = function() {
			window.myLine.resetZoom();
		};


</script>
