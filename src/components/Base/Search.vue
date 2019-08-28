<template>
  <v-content>
    <div id="animalSearch" v-if="$router.history.current['path'] == '/' || $router.history.current['path'] == '/search' ">
      <v-form @submit.prevent='search'>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm6 md2>
            </v-flex>
            <v-flex xs12 sm6 md3>
              <v-select
                :items="['Masculino', 'Femenino']"
                v-model="sexSearch"
                label="Sexo"
              ></v-select>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-text-field
              v-model="wordSearch"
              class="mx-3"
              label="Search"
              prepend-inner-icon="search"
              flat
              solo-inverte/>
            </v-flex>
            <v-flex xs12 sm6 md1>
              <v-btn type="submit" fab small>
                <v-icon>search</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </div>
    <div id="vetSearch" v-if="$router.history.current['path'] == '/veterinarias'
    || $router.history.current['path'] == '/searchVet'">
      <v-form @submit.prevent='searchVet'>
        <v-text-field
          v-model="wordSearch"
          class="mx-3"
          label="Search"
          prepend-inner-icon="search"
          flat
          solo-inverte/>
        <v-btn type="submit" hidden/>
      </v-form>
    </div>
    <div id="capSearch" v-if="$router.history.current['path'] == '/clientes'
    || $router.history.current['path'] == '/searchCap'">
      <v-form @submit.prevent='searchCAP'>
        <v-text-field
          v-model="capSearch"
          class="mx-3"
          label="Search"
          prepend-inner-icon="search"
          flat
          solo-inverte/>
        <v-btn type="submit" hidden/>
      </v-form>
    </div>
  </v-content>
</template>


<script>
import { mapState } from 'vuex'

  export default {
    name: 'SearchA',
    data() {
      return {
        wordSearch: '',
      }
    },
    computed: mapState({
      token: state => state.user.token
    }),
    methods: {
      search() {
        let sexSearch = this.sexSearch
        let wordSearch = this.wordSearch
        let token = this.token
        this.$store
          .dispatch('animal/searchAnimals', {wordSearch, token, sexSearch})
          .then(() => {
            this.$router.push({ path: '/search' })
          })
      },
      searchVet(animalSearch) {
        console.log(this.wordSearch)
        let wordSearch = this.wordSearch
        let token = this.token
        this.$store
          .dispatch('veterinaria/searchVet', {wordSearch, token})
          .then(() => {
            this.$router.push({ path: '/searchVet' })
          })
      },
      searchCAP(){
        let capSearch = this.capSearch
        let token = this.token
        this.$store
        .dispatch('cap/searchCap', {capSearch, token})
        .then(() => {
          this.$router.push({ path: '/searchCap' })
        })
      }
    }
  }
</script>