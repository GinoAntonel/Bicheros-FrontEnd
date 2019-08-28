<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex v-for="(animal, index) in animals" xs4>
        <v-card height="500px">
          <v-flex v-if="bottomNav[index] == 'img'" >
          </v-flex>
          <v-flex v-if="bottomNav[index] == 'delete'">
            <v-container>
              <v-btn @click="deleteAnimal(animal.id_animal)" color="error">Eliminar</v-btn>
            </v-container>
          </v-flex>
          <v-flex v-else-if="bottomNav[index]  == 'info'" xs12>
          <v-container fluid grid-list-md>
            <v-flex xs12>
              <v-card>
                <v-card-title>
                  <v-list-tile>
                    <v-list-tile-content><h4>{{ animal.name }}</h4></v-list-tile-content>           
                    <v-list-tile-content class="align-end"><FormModificar :animales="animal"/> </v-list-tile-content>
                  </v-list-tile>               
                </v-card-title>
                <v-divider></v-divider>
                <v-list dense>
                  <v-list-tile>
                    <v-list-tile-content>Raza:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ animal.race }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Fecha Encontrado:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ animal.date_founded }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Lugar Encontrado:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ animal.place_founded }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Especie:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ animal.species }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Genero:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ animal.gender }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Caracter:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ animal.temperamento }}</v-list-tile-content>
                  </v-list-tile>
                  <div v-for="cap in clientes">
                    <div v-if="animal.cap == cap.id_cap">
                      <v-list-tile>
                        <v-list-tile-content>Cliente:</v-list-tile-content>
                        <v-list-tile-content class="align-end">{{ cap.nameC }}</v-list-tile-content>
                      </v-list-tile>
                    </div>
                  </div>
                  <div v-for="veterinaria in veterinarias">
                    <div v-if="animal.veterinaria == veterinaria.id_veterinaria">
                      <v-list-tile>
                        <v-list-tile-content>Veterinaria:</v-list-tile-content>
                        <v-list-tile-content class="align-end">{{ veterinaria.name }}</v-list-tile-content>
                      </v-list-tile>
                    </div>
                  </div>
                </v-list>
              </v-card>
            </v-flex>
          </v-container>
          </v-flex>
          <v-bottom-nav :active.sync="bottomNav[index]" :value="true"  absolute dark shift>
            <v-btn dark id="btn" value="img">
              <span>Imagen</span>
              <v-icon>image</v-icon>
            </v-btn>

            <v-btn dark value="info">
              <span>Informacion</span>
              <v-icon>info</v-icon>
            </v-btn>

            <v-btn dark value="delete">
              <span>Eliminar</span>
              <v-icon>block</v-icon>
            </v-btn>
          </v-bottom-nav> 
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import Vue from 'vue'
import FormModificar from './FormModificar'
import VueYoutube from 'vue-youtube'

Vue.use(VueYoutube)
Vue.component('FormModificar', FormModificar)

export default {
  data () {
    return {
      bottomNav: [],
      dialog: false,
    }
  },
  components: {
    FormModificar,
  },
  computed: mapState({
    animals: state => state.animal.animals,
    token: state => state.user.token,
    clientes: state => state.cap.clientes,
    veterinarias: state => state.veterinaria.veterinarias,
    player() {
      return this.$refs.youtube.player
    }
  }),
  mounted() {
    this.getAnimals()
  },
  methods: {    
    playVideo() {
      this.player.playVideo()
    },
    getAnimals(token) {
      this.$store.dispatch('animal/obtainAnimals', this.token).then(res => {
      
      for (let i = 0; i < this.animals.length; i++){
        this.bottomNav.push('img')
      }
      })
    },
    deleteAnimal(id_animal) {
      let token = this.token
      this.$store
      .dispatch('animal/deleteAnimal', {id_animal, token}).then(() => {
        this.$router.go()
      }) // accion que va a ejecutar el store

    },
    getBottomnav(id) {
      return this.bottomNav[id-1]
    },
  }
}
</script>

