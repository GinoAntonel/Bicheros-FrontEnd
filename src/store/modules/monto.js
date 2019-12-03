import axios from 'axios'

axios.defaults.baseURL = 'http://172.19.0.1:8000';

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
  obtainAmount({ commit }, token) {
    return new Promise((resolve,
      reject) => {
        axios
        .get('/api/monto/', {headers: { 'Authorization' : 'Token ' + token }})
        .then(response => {
          commit('setAmounts', response.data)
          resolve()
        })
        .catch(error => { console.log(error) })
      })
  },
  obtainSaldo({ commit }, {saldo, token}) {
    return new Promise((resolve,
      reject) => {
        axios
        .get('/api/monto/', {headers: { 'Authorization' : 'Token ' + token }})
        .then(response => {
          var balance = response.data
          for(var x = 0; x < balance.length; x++){
            if (balance[x]['type'] == 'Deposit'){
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
  deleteMonto({ commit }, {id, token}) {
    return new Promise((resolve, reject) => {
      axios
      .delete(`/api/monto/${id}/`, {headers: { 'Authorization' : 'Token ' + token }})
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  createMonto({ commit }, {monto, token}) {
    let formData = new FormData()
    formData.append('amount', monto.amount)
    formData.append('date', monto.date)
      if (monto.type === 'Ingreso'){
        formData.append('type', 0)
      }
      else {
        formData.append('type', 1)
      }
    axios({
      method: 'post',
      url: '/api/monto/',
      headers: { 'Content-Type' : 'multipart/form-data', 'Authorization' : 'Token ' + token },
      data: formData,
    })
    .catch(err => console.log(err.response.data))
  },
  modifyMonto({ commit }, {montos, token}){
    return new Promise((resolve,
      reject) => {
        let formData = new FormData()
        formData.append('id', montos.id)
        formData.append('amount', montos.amount)
        formData.append('date', montos.date)
        if (montos.type === 'Deposit'){
          formData.append('type', 0)
        }
        else{
          formData.append('type', 1)
        }
        axios({
          method: 'put',
          url: `/api/monto/${montos.id}/`,
          headers: { 'Content-Type' : 'multipart/form-data', 'Authorization' : 'Token ' + token },
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