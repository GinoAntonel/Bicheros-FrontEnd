<template>
  <v-app id="base" dark>
    <Toolbar/>
    <v-content>
      <Card/>
    </v-content>
    <router-view/>
    <Footer/>
  </v-app>
</template>

<script>
  import Toolbar from './Base/Toolbar'
  import Footer from './Base/Footer'
  import Card from './Animal/Card'

  export default {
    name: 'Bicheros',
    components: {
      Toolbar,
      Footer,
      Card
    }
  }
</script>

