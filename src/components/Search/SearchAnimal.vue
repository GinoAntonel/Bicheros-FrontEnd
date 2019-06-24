<template>
  <div id="search">
    <v-layout row wrap style="margin-top: 40px; margin-bottom: 40px">
        <!-- <v-flex xs1></v-flex> -->
        <div v-for="animal in animalsSearch"
          :key="animal.id"
          style="margin-right: 40px; margin-left: 110px; margin-top: 40px;">
          <Card
          :key="animal.id"
          :id="animal.id"
          :name="animal.name"/>
        </div>
      </v-layout>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Card from '../Animal/Card'
  
  export default {
    name: 'Search',
    components: {
      Card
    },
    computed: mapState([
      'animalsSearch'
    ]) 
  }
</script>
