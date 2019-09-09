import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = 'http://192.168.150.248:8080';

const client_id = 'MB8ojE81E7nFQcpkcP9fDKNfDTH2GuKwhNzQpED9'
const client_secret = 'xXfJNPqa6bk8ioLg0Uw3xRsfrE3QV2KqUrSl8lYmE9L1Pfz3nC48j975HnW1pBGi5FHZ4gF4KOGe3fOQYR9E8UmoYP1Oc728IVpggv6p5gGiR3mxRVClovTNM3uu6DBq'

const state =  {
  token: localStorage.getItem('access_token') || null,
  user: localStorage.getItem('user') || null,
}

const mutations = {
  setToken(state, token) {
    state.token = token
  },
  setUser(state, user) {
    state.user = user
  }
}

const actions = {
  obtainToken({ commit }, user) {
    return new Promise((resolve, reject) => {
      let formData = new FormData()
      formData.append('username', user.username)
      formData.append('password', user.password)
      axios({
        method: 'post',
        url: '/auth/login/',
        header: { 'Content-Type' : 'multipart/form-data' },
        data: formData,
      })
      .then(response => {
        const token = response.data.key
        localStorage.setItem('access_token', token)
        commit('setToken', token)
        console.log(token)
        resolve()
      })
    })
  },
  registerUser({ commit }, user) {
    return new Promise((resolve, reject) => {
      let formData = new FormData()
      formData.append("username", user.username)
      formData.append("email", user.email)
      formData.append("password1", user.password)
      formData.append("password2", user.password2)
      axios({
        method: 'post',
        url: '/registration/',
        headers: { 'Content-Type' : 'multipart/form-data'},
        data: formData,
      })
      .then(res => {
        resolve(res)
      })
      .catch(err => console.log(err.response.data))
    })
  }
} 

export default {
  namespaced: true,
  state,
  mutations,
  actions
}