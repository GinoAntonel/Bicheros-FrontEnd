import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router.js'
import store from './store'


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
