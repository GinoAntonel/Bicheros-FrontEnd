<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex v-for="(animal, index) in animals" xs4>
        <v-card height="680px" >
          <v-flex v-if="bottomNav[index] == 'delete'" >
            <v-container fluid grid-list-md>
              <v-flex xs12>
                <v-btn class="btnDelete" round @click="deleteAnimal(animal.id_animal)" color="error">Eliminar</v-btn>
              </v-flex>
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
                    <v-list-tile-content class="align-end">{{ animal.sex }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Fecha de Nacimiento:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ animal.date_of_birth }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Caracter:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ animal.temperament }}</v-list-tile-content>
                  </v-list-tile>

                    <v-list-tile>
                      <v-list-tile-content>Imagenes:</v-list-tile-content>
                      <v-list-tile-content class="align-end">
                        <Imagenes :id='animal.id_animal'/>
                      </v-list-tile-content>
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
                    <div v-if="animal.veterinary == veterinaria.id_veterinaria">
                      <v-list-tile>
                        <v-list-tile-content>Veterinaria:</v-list-tile-content>
                        <v-list-tile-content class="align-end">{{ veterinaria.name }}</v-list-tile-content>
                      </v-list-tile>
                    </div>
                  </div>

                  <v-list-tile>
                    <v-list-tile-content>Historia:</v-list-tile-content>
                    <v-list-tile-content class="align-end">
                      <v-btn
                        color="primary"
                        dark
                        @click.stop="dialog = true"
                        small
                        outline round
                      >
                        Ver Pasado
                      </v-btn>

                      <v-dialog
                        v-model="dialog"
                        max-width="290"
                      >
                        <v-card>
                          <v-card-title class="headline">Historia del Animal</v-card-title>

                          <v-card-text>
                            {{ animal.history }}
                          </v-card-text>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="green darken-1"
                              flat="flat"
                              @click="dialog = false"
                            >
                              Cerrar
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-list-tile-content>
                  </v-list-tile>

                  <router-link :to="{ name: 'historial', params: { id: animal.id_animal } }">
                  <v-list-tile @click=''>
                    <v-list-tile-content>Historial Medico:</v-list-tile-content>
                    <v-list-tile-content class="align-end">
                        <v-icon>assignment</v-icon>
                    </v-list-tile-content>
                  </v-list-tile>
                  </router-link>
                </v-list>
              </v-card>
            </v-flex>
          </v-container>
          </v-flex>
          <v-bottom-nav :active.sync="bottomNav[index]" :value="true"  absolute dark shift>

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
import Imagenes from './Imagenes'
import VueYouTubeEmbed from 'vue-youtube-embed'

Vue.use(VueYouTubeEmbed)
Vue.component('FormModificar', FormModificar)
Vue.component('Imagenes', Imagenes)

export default {
  data () {
    return {
      bottomNav: [],
      dialog: false,
    }
  },
  components: {
    FormModificar,
    Imagenes,
  },
  computed: mapState({
    animals: state => state.animal.animals,
    token: state => state.user.token,
    clientes: state => state.cap.clientes,
    veterinarias: state => state.veterinaria.veterinarias,
    photo: state => state.image.photo
  }),
  mounted() {
    this.getAnimals()
  },
  methods: {
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

<style>
.btnDelete{
  margin-top: 90%;
}
</style>