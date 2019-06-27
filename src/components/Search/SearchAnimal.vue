<template>
  <div id="search">
    <v-layout row wrap style="margin-top: 40px; margin-bottom: 40px">
        <!-- <v-flex xs1></v-flex> -->
      <div v-for="animal in animalsSearch"
      :key="animal.id_animal">
        <AnimalSearch
        :key="animal.id_animal"
        :id="animal.id_animal"
        :name="animal.name"/>
      </div>
      <h1>x</h1>
      </v-layout>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import AnimalSearch from './AnimalSearch'
  
  export default {
    name: 'Search',
    components: {
      AnimalSearch
    },
  computed: mapState(['animalsSearch']),
  }
</script>
