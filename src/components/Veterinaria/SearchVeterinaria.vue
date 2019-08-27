<template>
  <v-app id="base" dark>
    <Toolbar/>
    <v-content>
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs10>
            <v-expansion-panel>
              <v-expansion-panel-content v-for="veterinaria in vetSearch" :key="veterinaria.id_veterinaria">
                <template v-slot:header>
                  <div> {{ veterinaria.name }}
                      <ModificarVeterinaria :veterinaria="veterinaria"/>
                    <v-icon small class="mr-2" @click="deleteVeterinaria(veterinaria.id_veterinaria)"> delete </v-icon>
                  </div>
                </template>
                <v-card>
                  <v-divider></v-divider>
                  <v-list dense>
                    <v-list-tile>
                      <v-list-tile-content class="align-center">Mail:</v-list-tile-content>
                      <v-list-tile-content class="align-left">{{ veterinaria.email }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content class="align-center">Direccion:</v-list-tile-content>
                      <v-list-tile-content class="align-left">{{ veterinaria.address }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content class="align-center">Telefono:</v-list-tile-content>
                      <v-list-tile-content class="align-left">{{ veterinaria.phone }}</v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-flex>

        </v-layout>
      </v-container>
    </v-content>
    <router-view/>
    <Footer/>
  </v-app>
</template>

<script>
import Toolbar from "../Base/Toolbar"
import Footer from "../Base/Footer"
import { mapState } from 'vuex'

import Vue from 'vue'
import ModificarVeterinaria from './ModificarVeterinaria'

Vue.component('ModificarVeterinaria', ModificarVeterinaria)

export default {
  components: {
    Toolbar,
    Footer,
    ModificarVeterinaria
  },
  computed: mapState({
    vetSearch: state => state.veterinaria.vetSearch
  }),
  mounted(){
    this.getVeterinarias()
  },
  methods: {
    getVeterinarias(){
        
    },
  }
}
</script>
