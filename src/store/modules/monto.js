import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000';

const client_id = 'MB8ojE81E7nFQcpkcP9fDKNfDTH2GuKwhNzQpED9'
const client_secret = 'xXfJNPqa6bk8ioLg0Uw3xRsfrE3QV2KqUrSl8lYmE9L1Pfz3nC48j975HnW1pBGi5FHZ4gF4KOGe3fOQYR9E8UmoYP1Oc728IVpggv6p5gGiR3mxRVClovTNM3uu6DBq'


const state =  {
  amounts: null,
}

const mutations = {
  setAmounts(state, amounts) {
    state.amounts = amounts
  },
}

const actions = {
  obtainAmount({ commit }) {
    return new Promise((resolve,
      reject) => {
        axios
        .get('/api/monto/')
        .then(response => {
          console.log(response.data)
          commit('setAmounts', response.data)
          resolve()
        })
        .catch(error => { console.log(error) })
      })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}