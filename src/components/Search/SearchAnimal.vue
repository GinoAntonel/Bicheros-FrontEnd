<template>
  <v-app id="search" dark>
    <Toolbar/>
    <v-content>
      <div v-for="animal in animalsSearch"
      :key="animal.id_animal">
        <NewAnimal :animalSearch="animal"/>
      </div>
    </v-content>
    <router-view/>
    <Footer/>
  </v-app>
</template>

<script>
  import { mapState } from 'vuex'
  import NewAnimal from './NewAnimal'
  import Vue from 'vue'
  import Toolbar from '../Base/Toolbar'
  import Footer from '../Base/Footer'
  
  Vue.component('NewAnimal', NewAnimal)

  export default {
    name: 'Search',
    components: {
      NewAnimal,
      Toolbar,
      Footer,
    },
  computed: mapState({
    animalsSearch: state => state.animal.animalsSearch,
  }),
  }
</script>
