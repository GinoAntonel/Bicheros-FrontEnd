<template>
  <v-app id="base" dark>
    <Toolbar/>
    <v-content>
      <v-container fluid grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex
            xs12
            sm6
            md4
            lg3
            v-for="veterinaria in veterinarias" :key="veterinaria.id_veterinaria"
          >
            <v-toolbar dark>
              <v-toolbar-title>{{ veterinaria.name }}</v-toolbar-title>
              <v-spacer></v-spacer>

                <v-menu bottom left>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      dark
                      icon
                      v-on="on"
                    >
                      <v-icon>more_vert</v-icon>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-tile
                      @click="deleteVeterinaria(veterinaria.id_veterinaria)"
                    >
                      <v-list-tile-title>Eliminar</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile
                      @click=""
                    >
                      <ModificarVeterinaria :veterinaria="veterinaria"/>
                    </v-list-tile>
                  </v-list>
                </v-menu>

            </v-toolbar>

            <v-card>
              <v-list dense>
                <v-list-tile>
                  <v-list-tile-content>Ubicacion:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ veterinaria.address }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Telefono:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ veterinaria.phone }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Email:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ veterinaria.email }}</v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card>
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
    token: state => state.user.token,
    veterinarias: state => state.veterinaria.veterinarias
  }),
  mounted(){
    this.getVeterinarias()
  },
  methods: {
    getVeterinarias(){
      let token = this.token
      let veterinarias = this.veterinarias
      this.$store.dispatch("veterinaria/obtainVeterinarias", {token, veterinarias})
    },
    deleteVeterinaria(id_veterinaria){
      let token = this.token
      this.$store.dispatch("veterinaria/deleteVeterinarias", {token, id_veterinaria}).then(() => {
        this.$router.go()
      })
    }
  }
}
</script>
