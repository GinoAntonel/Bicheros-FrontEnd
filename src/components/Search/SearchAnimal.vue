<template>
  <v-app id="search" dark>
    <Toolbar/>
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex v-for="(animal, index) in animalsSearch" xs4>
            <v-card height="680px">
              <v-flex v-if="bottomNav[index] == 'img'" >
                <a :href="`${animal.video}`">Click para ver el video</a>
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
  import FormModificar from '../Animal/FormModificar'
  import NotFound from '../Search/NotFound'

  Vue.component('FormModificar', FormModificar)

  export default {
    data () {
      return {
        bottomNav: [],
        dialog: false,
      }
    },
    name: 'Search',
    components: {
      FormModificar,
      Toolbar,
      Footer,
      NotFound
    },
  computed: mapState({
    animalsSearch: state => state.animal.animalsSearch,
    token: state => state.user.token,
    clientes: state => state.cap.clientes,
    veterinarias: state => state.veterinaria.veterinarias,
    photo: state => state.image.photo
  }),
  mounted() {
    this.getPhoto()
  },
  methods: {
    getPhoto() {
      console.log(this.animalsSearch.length)
      for (let i = 0; i < this.animalsSearch.length; i++){
        this.bottomNav.push('img')
      }
    },
  }
  }
</script>
