import Vue from 'vue'
import Vuex from 'vuex'
import animal from './modules/animal.js'
import monto from './modules/monto.js'
import user from './modules/user.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    animal,
    monto,
    user,
  },
})