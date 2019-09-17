import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueJsModal from 'plugin'



Vue.config.productionTip = false
window.$ = window.jQuery = require('jquery');
import VueSweetalert2 from 'vue-sweetalert2';


 
const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674'
}
Vue.use(VueJsModal)

Vue.use(VueSweetalert2, options)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
