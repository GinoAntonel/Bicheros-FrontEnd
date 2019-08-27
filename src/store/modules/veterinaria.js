import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = 'http://192.168.150.53:8080';

const veterinaria_id = 'MB8ojE81E7nFQcpkcP9fDKNfDTH2GuKwhNzQpED9'
const veterinaria_secret = 'xXfJNPqa6bk8ioLg0Uw3xRsfrE3QV2KqUrSl8lYmE9L1Pfz3nC48j975HnW1pBGi5FHZ4gF4KOGe3fOQYR9E8UmoYP1Oc728IVpggv6p5gGiR3mxRVClovTNM3uu6DBq'

const state =  {
  veterinarias: null,
  vetSearch: null
}

const mutations = {
  setVeterinarias(state, veterinarias) {
    state.veterinarias = veterinarias
  },
  setSearch(state, vetSearch) {
    state.vetSearch = vetSearch
  }
}

const actions = {
  obtainVeterinarias({commit}, {veterinarias, token}){
    return new Promise((resolve,
      reject) => {
        axios
        .get('/api/veterinaria/', {headers: { 'Authorization' : 'Token ' + token }})
        .then(response => {
          commit('setVeterinarias', response.data)
          resolve()
        })
        .catch(error => { console.log(error) })
      })
  },
  searchVet(context, {wordSearch, token}){
    return new Promise((resolve,
      reject) => {
        axios
        .get(`/api/veterinaria/?search=${wordSearch}`, {headers: { 'Authorization' : 'Token ' + token }})
        .then(response => {
          context.commit('setSearch', response.data)
          console.log(response.data)
          resolve()
        })
        .catch(err => console.log(err.response.data))
      })
  },
  deleteVeterinarias({commit}, {id_veterinaria, token}){
    return new Promise((resolve,
      reject) => {
        axios
        .delete(`/api/veterinaria/${id_veterinaria}/`, {headers: { 'Authorization' : 'Token ' + token }})
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
      })
  },
  createVeterinaria({commit}, {veterinaria, token}){
    return new Promise((resolve,
      reject) => {
        let formData = new FormData()
        formData.append('name', veterinaria.name)
        formData.append('email', veterinaria.email)
        formData.append('address', veterinaria.address)
        formData.append('phone', veterinaria.phone)
        axios({
          method: 'post',
          url: '/api/veterinaria/',
          headers: { 'Content-Type' : 'multipart/form-data', 'Authorization' : 'Token ' + token },
          data: formData,
        })
        .then(res => {
          resolve(res)
        })
        .catch(err => console.log(err.response.data))
      })
  },
  modifyVeterinaria({ commit }, {veterinaria, token}){
    return new Promise((resolve,
      reject) => {
        let formData = new FormData()
        formData.append('id_cap', veterinaria.id_veterinaria)
        formData.append('nameC', veterinaria.name)
        formData.append('email', veterinaria.email)
        formData.append('address', veterinaria.address)
        formData.append('phone', veterinaria.phone)
        axios({
          method: 'put',
          url: `/api/veterinaria/${veterinaria.id_veterinaria}/`,
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