<template>
  <v-app id="search" dark>
    <Toolbar/>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex v-if="!animalsSearch.length"><NotFound/></v-flex>
        <v-flex v-for="(animal, index) in animalsSearch"
        :key="animal.id_animal" xs4>
          <v-card height="400px">
            <v-flex v-if="bottomNav[index] == 'img'">
              <v-img :src="`${animal.photo}`" height="400px" contain></v-img>
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
                        <v-list-tile-content><h4>{{ animal.name }}</h4><FormModificar :animales="animal"/></v-list-tile-content>           
                        <v-list-tile-content class="align-end"></v-list-tile-content>
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
