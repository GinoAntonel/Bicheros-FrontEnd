import axios from 'axios'

axios.defaults.baseURL = 'http://192.168.100.231:8080';

const client_id = 'MB8ojE81E7nFQcpkcP9fDKNfDTH2GuKwhNzQpED9'
const client_secret = 'xXfJNPqa6bk8ioLg0Uw3xRsfrE3QV2KqUrSl8lYmE9L1Pfz3nC48j975HnW1pBGi5FHZ4gF4KOGe3fOQYR9E8UmoYP1Oc728IVpggv6p5gGiR3mxRVClovTNM3uu6DBq'


const state =  {
  amounts: null,
  saldos: null
}

const mutations = {
  setAmounts(state, amounts) {
    state.amounts = amounts
  },
  setSaldo(state, saldos) {
    state.saldos = saldos
  },
}

const actions = {
  obtainAmount({ commit }) {
    return new Promise((resolve,
      reject) => {
        axios
        .get('/api/monto/')
        .then(response => {
          commit('setAmounts', response.data)
          resolve()
          var balance = response.data
          for(var x = 0; x < balance.length; x++){
            if (balance[x]['tipo'] == 'Ingreso'){
              saldo += balance[x]['amount'];
            }
            else {
              saldo -= balance[x]['amount']
            }
          }
        })
        .catch(error => { console.log(error) })
      })
  },
  obtainSaldo({ commit }, saldo) {
    return new Promise((resolve,
      reject) => {
        axios
        .get('/api/monto/')
        .then(response => {
          var balance = response.data
          for(var x = 0; x < balance.length; x++){
            if (balance[x]['tipo'] == 'Ingreso'){
              saldo += balance[x]['amount'];
            }
            else {
              saldo -= balance[x]['amount']
            }
          }
          commit('setSaldo', saldo)
          resolve()
          console.log(saldo)
        })
        .catch(error => { console.log(error) })
      })
  },
  deleteMonto({ commit }, id) {
    return new Promise((resolve,
      reject) => {
        axios.delete(`/api/monto/${id}/`)
      })
  },
  createMonto({ commit }, monto) {
    let formData = new FormData()
    formData.append('amount', monto.amount)
    formData.append('date', monto.date)
      if (monto.tipo === 'Ingreso'){
        formData.append('tipo', 0)
      }
      else {
        formData.append('tipo', 1)
      }
    axios({
      method: 'post',
      url: '/api/monto/',
      header: { 'Content-Type' : 'multipart/form-data' },
      data: formData,
    })
    .catch(err => console.log(err.response.data))
  },
  modifyMonto({ commit }, montos){
    return new Promise((resolve,
      reject) => {
        let formData = new FormData()
        formData.append('id', montos.id)
        formData.append('amount', montos.amount)
        formData.append('date', montos.date)
        if (montos.tipo == 'Ingreso'){
          formData.append('tipo', 0)
        }
        else{
          formData.append('tipo', 1)
        }
        axios({
          method: 'put',
          url: `/api/monto/${montos.id}/`,
          header: { 'Content-Type' : 'multipart/form-data' },
          data: formData,
        })
        .then(response => {
          console.log(response.data)
          resolve()
        })
        .catch(err => console.log(err.response.data))
      })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}