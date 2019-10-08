<template>
  <v-app id="images" dark>
    <Toolbar/>
    <v-content>
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs4 v-for="image in photo" :key="image.id_photo">
            <div v-for="animal in animals" :key="animal.id_animal">
              <div v-if="animal.id_animal == image.animal">
                <v-card height="410px" width='410px' >
                  <v-flex class="imgg">
                    <img :src="`${image.photo}`" height="400px" width='400px' contain aspect-ratio="1"/>
                  </v-flex>
                </v-card>
              </div>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <router-view/>
    <Footer/>
  </v-app>
</template>

<script>
  import Toolbar from '../Base/Toolbar'
  import Footer from '../Base/Footer'
  import { mapState } from 'vuex'

  export default {
    name: 'Bicheros',
    data () {
      return {
        id_animal: this.$route.params.id,
      }
    },
    components: {
      Toolbar,
      Footer,
    },
    computed: mapState({
      token: state => state.user.token,
      animals: state => state.animal.animals,
      photo: state => state.image.photo
    }),
    mounted(){
      this.getPhoto()
    },
    methods: {
      getPhoto(){
        let token = this.token
        let id = this.id_animal
        this.$store.dispatch('image/obtainPhoto', {token, id})
      },
    }
  }
  
</script>

<style scoped>
.imgg{
  padding: 4px;
}
</style>