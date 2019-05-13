import Vue from 'vue'
import Vuex from 'vuex'
import animal from './modules/animal.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    animal
  },
})