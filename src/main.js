import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router.js'
import store from './store'

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')