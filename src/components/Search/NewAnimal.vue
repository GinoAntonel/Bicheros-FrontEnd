<template>
<v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs4>
        <v-card height="400px">
          <v-flex v-if="bottomNav == 'img'">
            <v-img :src="`${animalSearch.photo}`" height="400px" contain></v-img>
          </v-flex>

          <v-flex v-if="bottomNav == 'delete'">
            <v-container>
              <v-btn @click="deleteAnimal(animalSearch.id_animal)" color="error">Eliminar</v-btn>
            </v-container>
          </v-flex>

          <v-flex v-else-if="bottomNav  == 'info'" xs12>
            <v-container fluid grid-list-md>
              <v-flex xs12>
                <v-card>
                  <v-card-title>
                    <v-list-tile>
                      <v-list-tile-content><h4>{{ animalSearch.name }}</h4></v-list-tile-content>           
                      <v-list-tile-content class="align-end"></v-list-tile-content>
                    </v-list-tile>               
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-list dense>
                    <v-list-tile>
                      <v-list-tile-content>Raza:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ animalSearch.race }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content>Fecha Encontrado:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ animalSearch.date_founded }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content>Lugar Encontrado:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ animalSearch.place_founded }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content>Especie:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ animalSearch.species }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content>Genero:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ animalSearch.gender }}</v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-card>
              </v-flex>
            </v-container>
          </v-flex>

          <v-bottom-nav :active.sync="bottomNav" :value="true"  absolute dark shift>
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
import FormModificar from '../Animal/FormModificar'

Vue.component('FormModificar', FormModificar)

export default {

  data () {
    return {
      bottomNav: [],
      dialog: false,
    }
  },
  props: {
    animalSearch: {
      type: Number
    }
  },
  components: {
    FormModificar,
  },
}
</script>
