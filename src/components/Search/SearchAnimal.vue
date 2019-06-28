<template>
  <div id="search">
    <div v-for="animal in animalsSearch"
    :key="animal.id_animal">
      <NewAnimal :animalSearch="animal"/>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import NewAnimal from './NewAnimal'
  import Vue from 'vue'
  
  Vue.component('NewAnimal', NewAnimal)

  export default {
    name: 'Search',
    components: {
      NewAnimal
    },
  computed: mapState({
    animalsSearch: state => state.animal.animalsSearch,
  }),
  }
</script>
