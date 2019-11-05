import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = 'http://127.0.0.1:8000';

const client_id = 'MB8ojE81E7nFQcpkcP9fDKNfDTH2GuKwhNzQpED9'
const client_secret = 'xXfJNPqa6bk8ioLg0Uw3xRsfrE3QV2KqUrSl8lYmE9L1Pfz3nC48j975HnW1pBGi5FHZ4gF4KOGe3fOQYR9E8UmoYP1Oc728IVpggv6p5gGiR3mxRVClovTNM3uu6DBq'

const state =  {
  animals: null,
  animalsSearch: null,
  photo: null
}

const mutations = {
  setAnimals(state, animals) {
    state.animals = animals
  },
  setSearch(state, animals) {
    state.animalsSearch = animals
  },
  setPhoto(state, photo) {
    state.photo = photo
  },
}

const actions = {
  obtainAnimals({ commit }, token) {
    console.log(token)
    return new Promise((resolve,
      reject) => {
        axios
        .get('/api/animals/', {headers: { 'Authorization' : 'Token ' + token }})
        .then(response => {
          console.log(response.data)
          commit('setAnimals', response.data)
          resolve()
        })
        .catch(error => { console.log(error) })
      })
  },
  deleteAnimal({ commit }, {id_animal, token}) {
    return new Promise((resolve, reject) => {
      axios
      .delete(`/api/animals/${id_animal}/`, {headers: { 'Authorization' : 'Token ' + token }})
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  createAnimal({ commit }, {animal, token}) {
    console.log(animal.imageFile)
    let formData = new FormData()
    formData.append('name', animal.name)
    formData.append('race', animal.race)
    formData.append('date_founded', animal.date_founded)
    formData.append('place_founded', animal.place_founded)
    formData.append('species', animal.species)
      if (animal.sex === 'Masculino'){
        formData.append('sex', 0)
      }
      else {
        formData.append('sex', 1)
      }
    formData.append('cap', animal.cap)
    formData.append('veterinary', animal.veterinary)
    formData.append('temperament', animal.temperament)
    formData.append('video', animal.video)
    formData.append('date_of_birth', animal.date_of_birth)
    formData.append('history', animal.history)
    axios({
      method: 'post',
      url: '/api/animals/',
      headers: { 'Content-Type' : 'multipart/form-data', 'Authorization' : 'Token ' + token },
      data: formData,
    })
    .catch(err => console.log(err.response.data))
  },
  modifyAnimals({ commit }, {animales, token}){
    return new Promise((resolve,
      reject) => {
        let formData = new FormData()
        formData.append('id_animal', animales.id_animal)
        formData.append('name', animales.name)
        formData.append('race', animales.race)
        formData.append('place_founded', animales.place_founded)
        formData.append('date_founded', animales.date_founded)
        formData.append('species', animales.species)
        if(animales.imageFile != null){
          formData.append('photo', animales.imageFile)
        }
        formData.append('cap', animales.cap)
        formData.append('veterinary', animales.veterinary)
        formData.append('temperament', animales.temperament)
        formData.append('video', animales.video)
        formData.append('date_of_birth', animales.date_of_birth)
        formData.append('history', animales.history)
        axios({
          method: 'put',
          url: `/api/animals/${animales.id_animal}/`,
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
  searchAnimals( context , {wordSearch, token, sexSearch}){
    return new Promise ((resolve,
      reject) => {
        let x = 5
        console.log(sexSearch + ' ' + wordSearch)
        if (sexSearch === "Masculino"){
          x = 0
        }else{
          x = 1
        }
        if (sexSearch === undefined){
          x = ''
        }
        axios({
          method: 'get',
          url: `/api/animals/?search=${x + ' ' + wordSearch}`, 
          headers: { 'Authorization' : 'Token ' + token},
        })
        .then(response => {
          context.commit('setSearch', response.data)
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