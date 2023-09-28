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
  faClone,
  faPlus,
  faBars
} from '@fortawesome/free-solid-svg-icons'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import '@/assets/styles/animation.css'
import '@/assets/styles/tailwind.css'

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
  faClone,
  faPlus,
  faBars
)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
