import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = 'http://127.0.0.1:8000';

const client_id = 'MB8ojE81E7nFQcpkcP9fDKNfDTH2GuKwhNzQpED9'
const client_secret = 'xXfJNPqa6bk8ioLg0Uw3xRsfrE3QV2KqUrSl8lYmE9L1Pfz3nC48j975HnW1pBGi5FHZ4gF4KOGe3fOQYR9E8UmoYP1Oc728IVpggv6p5gGiR3mxRVClovTNM3uu6DBq'

const state =  {
  photo: null
}

const mutations = {
  setPhoto(state, photo) {
    state.photo = photo
  },
}

const actions = {
  obtainPhoto({ commit }, {token, id}) {
    return new Promise((resolve, reject) => {
      axios
      .get(`/api/photo/?search=${id}`, {headers: { 'Authorization' : 'Token ' + token }})
      .then(response => {
        console.log(response.data)
        commit('setPhoto', response.data)
        resolve()
      })
      .catch(error => { console.log(error) })
    })
  },
  createPhoto({ commit }, {photo, token}) {
    let formData = new FormData()
    formData.append('animal', photo.animal)
    formData.append('photo', photo.imageFile)
    axios({
      method: 'post',
      url: '/api/photo/',
      headers: { 'Content-Type' : 'multipart/form-data', 'Authorization' : 'Token ' + token },
      data: formData,
    })
    .catch(err => console.log(err.response.data))
  },
  deletePhoto({ commit }, {id_photo, token}) {
    return new Promise((resolve, reject) => {
      axios
      .delete(`/api/photo/${id_photo}/`, {headers: { 'Authorization' : 'Token ' + token }})
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
    })
  },
} 

export default {
  namespaced: true,
  state,
  mutations,
  actions
}