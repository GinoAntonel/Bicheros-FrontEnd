import axios from 'axios'

const client_id = 'MB8ojE81E7nFQcpkcP9fDKNfDTH2GuKwhNzQpED9'
const client_secret = 'xXfJNPqa6bk8ioLg0Uw3xRsfrE3QV2KqUrSl8lYmE9L1Pfz3nC48j975HnW1pBGi5FHZ4gF4KOGe3fOQYR9E8UmoYP1Oc728IVpggv6p5gGiR3mxRVClovTNM3uu6DBq'

const state =  {
  name: String
}

const mutations = {
  setName(state, name) {
    state.name = name
  }
}

const actions = {
  name({ commit }, animal) {
    axios
      .get('http://172.20.10.2:8080/api/animals/')
      .then(response => {
        console.log(response.data)
        commit('setName', response.data.name)
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