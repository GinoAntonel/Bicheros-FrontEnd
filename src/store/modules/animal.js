import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = 'http://localhost:8000';

const client_id = 'MB8ojE81E7nFQcpkcP9fDKNfDTH2GuKwhNzQpED9'
const client_secret = 'xXfJNPqa6bk8ioLg0Uw3xRsfrE3QV2KqUrSl8lYmE9L1Pfz3nC48j975HnW1pBGi5FHZ4gF4KOGe3fOQYR9E8UmoYP1Oc728IVpggv6p5gGiR3mxRVClovTNM3uu6DBq'

const state =  {
  animals: null,
  animalsSearch: null
}

const mutations = {
  setAnimals(state, animals) {
    state.animals = animals
  },
  setSearch(state, animals) {
    state.animalsSearch = animals
  }
}

const actions = {
  obtainAnimals({ commit }) {
    return new Promise((resolve,
      reject) => {
        axios
        .get('/api/animals/')
        .then(response => {
          console.log(response.data)
          commit('setAnimals', response.data)
          resolve()
        })
        .catch(error => { console.log(error) })
      })
  },
  deleteAnimal({ commit }, id) {
    axios.delete(`/api/animals/${id}/`)
  },
  createAnimal({ commit }, animal) {
    console.log(animal.imageFile)
    let formData = new FormData()
    formData.append('name', animal.name)
    formData.append('race', animal.race)
    formData.append('date_founded', animal.date_founded)
    formData.append('place_founded', animal.place_founded)
    formData.append('species', animal.species)
      if (animal.gender === 'Masculino'){
        formData.append('gender', 0)
      }
      else {
        formData.append('gender', 1)
      }
    formData.append('photo', animal.imageFile)
    axios({
      method: 'post',
      url: '/api/animals/',
      header: { 'Content-Type' : 'multipart/form-data' },
      data: formData,
    })
    .catch(err => console.log(err.response.data))
  },
  modifyAnimals({ commit }, animales){
    return new Promise((resolve,
      reject) => {
        console.log(animales.imageFile)
        let formData = new FormData()
        formData.append('id_animal', animales.id_animal)
        formData.append('name', animales.name)
        formData.append('race', animales.race)
        formData.append('place_founded', animales.place_founded)
        formData.append('date_founded', animales.date_founded)
        formData.append('species', animales.species)
        formData.append('photo', animales.imageFile)
        axios({
          method: 'put',
          url: `/api/animals/${animales.id_animal}/`,
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
  searchAnimals( context , wordSearch){
    return new Promise ((resolve,
      reject) => {
        axios({
          method: 'get',
          url: `/api/animals/?search=${wordSearch}`,
        })
        .then(response => {
          context.commit('setSearch', response.data)
          console.log(response.data)
          resolve()
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