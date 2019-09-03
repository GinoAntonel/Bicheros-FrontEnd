import Vue from 'vue'
import Vuex from 'vuex'
import animal from './modules/animal.js'
import monto from './modules/monto.js'
import user from './modules/user.js'
import cap from "./modules/cap.js"
import donation from "./modules/donation.js"
import veterinaria from './modules/veterinaria.js'
import historial from './modules/historial.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    animal,
    monto,
    user,
    cap,
    donation,
    veterinaria,
    historial
  },
})