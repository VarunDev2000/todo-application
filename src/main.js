import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faList,
  faCalendarWeek,
  faCalendarDay,
  faGear,
  faCheck,
  faClock,
  faXmark,
  faTrash,
  faCalendarXmark,
  faClone
} from '@fortawesome/free-solid-svg-icons'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'

library.add(
  faList,
  faCalendarWeek,
  faCalendarDay,
  faGear,
  faCheck,
  faClock,
  faXmark,
  faTrash,
  faCalendarXmark,
  faClone
)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
