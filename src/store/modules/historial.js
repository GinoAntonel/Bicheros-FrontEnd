import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = 'http://127.0.0.1:8000';

const client_id = 'MB8ojE81E7nFQcpkcP9fDKNfDTH2GuKwhNzQpED9'
const client_secret = 'xXfJNPqa6bk8ioLg0Uw3xRsfrE3QV2KqUrSl8lYmE9L1Pfz3nC48j975HnW1pBGi5FHZ4gF4KOGe3fOQYR9E8UmoYP1Oc728IVpggv6p5gGiR3mxRVClovTNM3uu6DBq'

const state =  {
  history: null,
}

const mutations = {
  setHistorial(state, history) {
    state.history = history
  },
}

const actions = {
  obtainHistory({ commit }, {token, id}) {
    console.log(token)
    return new Promise((resolve,
      reject) => {
        axios
        .get(`/api/historial/?search=${id}`, {headers: { 'Authorization' : 'Token ' + token }})
        .then(response => {
          console.log(response.data)
          commit('setHistorial', response.data)
          resolve()
        })
        .catch(error => { console.log(error) })
      })
  },
  deleteHistory({ commit }, {id_HM, token}) {
    return new Promise((resolve, reject) => {
      console.log(id_HM)
      axios
      .delete(`/api/historial/${id_HM}/`, {headers: { 'Authorization' : 'Token ' + token }})
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  createHistory({ commit }, {historial, token}) {
    return new Promise((resolve,
      reject) => {
        let formData = new FormData()
        formData.append('enfermedad', historial.enfermedad)
        formData.append('fecha', historial.fecha)
        formData.append('description', historial.description)
          if (historial.estado === 'Curado'){
            formData.append('estado', 0)
          }
          else {
            formData.append('estado', 1)
          }
        formData.append('animal', historial.animal)
        axios({
          method: 'post',
          url: '/api/historial/',
          headers: { 'Content-Type' : 'multipart/form-data', 'Authorization' : 'Token ' + token },
          data: formData,
        })
        .catch(err => console.log(err.response.data))
      })
  },
  modifyHistory({ commit }, {historial, token}){
    return new Promise((resolve,
      reject) => {
        let formData = new FormData()
        formData.append('id_HM', historial.id_HM)
        formData.append('enfermedad', historial.enfermedad)
        formData.append('fecha', historial.fecha)
        formData.append('description', historial.description)
        if(historial.estado === 'Curado') {
          formData.append('estado', 0)
        }else{
          formData.append('estado', 1)
        }
        axios({
          method: 'put',
          url: `/api/historial/${historial.id_HM}/`,
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