import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = 'http://192.168.100.231:8080';

const client_id = 'MB8ojE81E7nFQcpkcP9fDKNfDTH2GuKwhNzQpED9'
const client_secret = 'xXfJNPqa6bk8ioLg0Uw3xRsfrE3QV2KqUrSl8lYmE9L1Pfz3nC48j975HnW1pBGi5FHZ4gF4KOGe3fOQYR9E8UmoYP1Oc728IVpggv6p5gGiR3mxRVClovTNM3uu6DBq'

const state =  {
  donations: null,
}

const mutations = {
  setDonations(state, donations) {
    state.donations = donations
  },
}

const actions = {
  obtainDonations({commit}, {donations, token}){
    return new Promise((resolve,
      reject) => {
        axios
        .get('/api/donacion/', {headers: { 'Authorization' : 'Token ' + token }})
        .then(response => {
          commit('setDonations', response.data)
          resolve()
        })
        .catch(error => { console.log(error) })
      })
    },
  deleteDonation({commit}, {id_donation, token}){
    return new Promise((resolve,
      reject) => {
        axios
        .delete(`/api/donacion/${id_donation}/`, {headers: { 'Authorization' : 'Token ' + token }})
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
      })
  },
  modifyDonation({ commit }, {donations, token}){
    return new Promise((resolve,
      reject) => {
        let formData = new FormData()
        formData.append('id_donation', donations.id_donation)
        formData.append('date', donations.date)
        if (donations.type_of_donation === 'Comida de Gato'){
          formData.append('type_of_donation', 0)
        }
        if (donations.type_of_donation === 'Comida de Perro'){
          formData.append('type_of_donation', 1)
        }
        if (donations.type_of_donation === 'Ropa'){
          formData.append('type_of_donation', 2)
        }
        if (donations.type_of_donation === 'Otros'){
          formData.append('type_of_donation', 3)
        }
        axios({
          method: 'put',
          url: `/api/donacion/${donations.id_donation}/`,
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
  createDonation({ commit }, {donation, token}) {
    let formData = new FormData()
    formData.append('description', donation.description)
    formData.append('date', donation.date)
    if (donation.type_of_donation === 'Comida de Gato'){
      formData.append('type_of_donation', 0)
    }
    if (donation.type_of_donation === 'Comida de Perro'){
      formData.append('type_of_donation', 1)
    }
    if (donation.type_of_donation === 'Ropa'){
      formData.append('type_of_donation', 2)
    }
    if (donation.type_of_donation === 'Otros'){
      formData.append('type_of_donation', 3)
    }
    axios({
      method: 'post',
      url: '/api/donacion/',
      headers: { 'Content-Type' : 'multipart/form-data', 'Authorization' : 'Token ' + token },
      data: formData,
    })
    .then(response => {
      resolve()
    })
    .catch(err => console.log(err.response.data))
  },
} 

export default {
  namespaced: true,
  state,
  mutations,
  actions
}