import axios from 'axios'

const client_id = 'MB8ojE81E7nFQcpkcP9fDKNfDTH2GuKwhNzQpED9'
const client_secret = 'xXfJNPqa6bk8ioLg0Uw3xRsfrE3QV2KqUrSl8lYmE9L1Pfz3nC48j975HnW1pBGi5FHZ4gF4KOGe3fOQYR9E8UmoYP1Oc728IVpggv6p5gGiR3mxRVClovTNM3uu6DBq'

const state =  {
  animals: null
}

const mutations = {
  setAnimals(state, animals) {
    state.animals = animals
  }
}

const actions = {
  obtainAnimals({ commit }) {
    axios
      .get('http://192.168.20.183:8080/api/animals/')
      .then(response => {
        console.log(response.data)
        commit('setAnimals', response.data)
      })
      .catch(error => { console.log(error) })
    
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}