// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueMaterial from 'vue-material'
import App from './App'
import router from './router'
import { store } from './store/store'
import FlashMessage from '@smartweb/vue-flash-message';
import VueMaterialSlider from 'vue-material-slider';

import 'vue-material-slider/dist/vue-material-slider.css';
import './assets/scss/index.scss'
import './assets/js/tools.js';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBatteryEmpty,faBatteryHalf,faBatteryFull,faBatteryQuarter,faBatteryThreeQuarters,faUserCircle,faCheckCircle, faExclamationCircle,faTimes,faChevronDown, faCaretDown, faPlusCircle,faCloudUploadAlt,faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { Ability } from '@casl/ability'
import Vodal from 'vodal';
import Vuelidate from 'vuelidate'
import vSelect from 'vue-select'
import vueCountryRegionSelect from 'vue-country-region-select'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import Vue2LeafletPolylineDecorator from 'vue2-leaflet-polylinedecorator'
import API from 'http-constants'

Vue.component('polyline-decorator', Vue2LeafletPolylineDecorator)
Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.component('v-select', vSelect);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component(Vodal.name, Vodal);

Vue.use(VueMaterialSlider);
Vue.use(require('vue-moment'));
Vue.use(VueSweetalert2);
Vue.use(vueCountryRegionSelect)
Vue.use(FlashMessage);
Vue.use(Vuelidate);
Vue.use('abilityPlugins', 'ability');
Vue.use(VueMaterial)

library.add([faBatteryEmpty,faBatteryHalf,faBatteryFull,faBatteryQuarter,faBatteryThreeQuarters,faUserCircle,faCheckCircle, faExclamationCircle,faTimes,faChevronDown, faCaretDown, faPlusCircle,faCloudUploadAlt,faCloudDownloadAlt])
Vue.config.productionTip = false;
store.commit('setAbility');
if(store.getters.getToken != null){
  API.defaults.headers.common['Authorization'] = 'Bearer ' + store.getters.getToken
}
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name: 'auth',
      })
    } else {
      next()
    }
  } 
   else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  components: { App },
  template: '<App/>'
})