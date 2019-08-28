import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = 'http://192.168.150.53:8080';

const client_id = 'MB8ojE81E7nFQcpkcP9fDKNfDTH2GuKwhNzQpED9'
const client_secret = 'xXfJNPqa6bk8ioLg0Uw3xRsfrE3QV2KqUrSl8lYmE9L1Pfz3nC48j975HnW1pBGi5FHZ4gF4KOGe3fOQYR9E8UmoYP1Oc728IVpggv6p5gGiR3mxRVClovTNM3uu6DBq'

const state =  {
  clientes: null,
  capSearch: null
}

const mutations = {
  setClientes(state, clientes) {
    state.clientes = clientes
  },
  setSearch(state, capSearch) {
    state.capSearch = capSearch
  }
}

const actions = {
  obtainClients({commit}, {clientes, token}){
    return new Promise((resolve,
      reject) => {
        axios
        .get('/api/cap/', {headers: { 'Authorization' : 'Token ' + token }})
        .then(response => {
          commit('setClientes', response.data)
          resolve()
        })
        .catch(error => { console.log(error) })
      })
  },
  deleteClient({commit}, {id_cap, token}){
    return new Promise((resolve,
      reject) => {
        axios
        .delete(`/api/cap/${id_cap}/`, {headers: { 'Authorization' : 'Token ' + token }})
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
      })
  },
  searchCap(context, {capSearch, token}){
    return new Promise((resolve,
      reject) => {
        axios
        .get(`/api/cap/?search=${capSearch}`, {headers: { 'Authorization' : 'Token ' + token }})
        .then(response => {
          context.commit('setSearch', response.data)
          console.log(response.data)
          resolve()
        })
        .catch(err => console.log(err.response.data))
      })
  },
  createClient({commit}, {client, token}){
    return new Promise((resolve,
      reject) => {
        let formData = new FormData()
        formData.append('nameC', client.name)
        formData.append('last_nameC', client.last_name)
        formData.append('email', client.email)
        formData.append('date_of_birth', client.date)
        formData.append('address', client.address)
        formData.append('telefono', client.telefono)
        axios({
          method: 'post',
          url: '/api/cap/',
          headers: { 'Content-Type' : 'multipart/form-data', 'Authorization' : 'Token ' + token },
          data: formData,
        })
        .then(res => {
          resolve(res)
        })
        .catch(err => console.log(err.response.data))
      })
  },
  modifyClient({ commit }, {client, token}){
    return new Promise((resolve,
      reject) => {
        let formData = new FormData()
        formData.append('id_cap', client.id_cap)
        formData.append('nameC', client.nameC)
        formData.append('last_nameC', client.last_nameC)
        formData.append('email', client.email)
        formData.append('date_of_birth', client.date_of_birth)
        formData.append('address', client.address)
        formData.append('telefono', client.telefono)
        axios({
          method: 'put',
          url: `/api/cap/${client.id_cap}/`,
          headers: { 'Content-Type' : 'multipart/form-data', 'Authorization' : 'Token ' + token},
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