// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Base from './components/template/Base'
import router from './router'
import { store } from './store/store'
import './assets/scss/index.scss'
import './assets/js/tools.js';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBatteryEmpty,faBatteryHalf,faBatteryFull,faBatteryQuarter,faBatteryThreeQuarters,faUserCircle,faCheckCircle, faExclamationCircle,faTimes,faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { AbilityBuilder, Ability } from '@casl/ability'
import { abilityPlugin } from '@casl/vue'
import Vodal from 'vodal';
import Vuelidate from 'vuelidate'
import FlashMessage from '@smartweb/vue-flash-message';
import vSelect from 'vue-select'
import vueCountryRegionSelect from 'vue-country-region-select'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);
Vue.use(vueCountryRegionSelect)
Vue.component('v-select', vSelect)
Vue.use(FlashMessage);

Vue.use(Vuelidate)

Vue.prototype.$ability = new Ability();

Vue.use('abilityPlugins', 'ability');
library.add([faBatteryEmpty,faBatteryHalf,faBatteryFull,faBatteryQuarter,faBatteryThreeQuarters,faUserCircle,faCheckCircle, faExclamationCircle,faTimes,faChevronDown])
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;
Vue.component(Vodal.name, Vodal);

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name: 'login',
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
  components: { Base },
  template: '<Base/>'
})
