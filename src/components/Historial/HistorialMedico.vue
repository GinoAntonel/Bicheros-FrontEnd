<template>
  <v-app id="base" dark>
    <Toolbar/>
    <v-content>
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex
            xs12
            sm6
            md4
            v-for="historial in history"
            :key="historial.id_HM"
          >
            <v-card>

              <div v-for="animal in animals" :key="animal.id_animal">
                <div v-if="animal.id_animal == historial.animal">
                  <v-card-title class="subheading font-weight-bold">{{ animal.name }}</v-card-title>
                </div>
              </div>
              
              <v-divider></v-divider>

              <v-list dense>
                <v-list-tile>
                  <v-list-tile-content>Enfermedad:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ historial.enfermedad }}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-content>Descripcion:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ historial.description }}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-content>Estado:</v-list-tile-content>
                  <div v-if='historial.estado == 0'>
                    <v-list-tile-content class="align-end">Curado</v-list-tile-content>
                  </div>
                  <div v-if='historial.estado == 1'>
                    <v-list-tile-content class="align-end">No Curado</v-list-tile-content>
                  </div>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-content>Fecha:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ historial.fecha }}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-content class="align-center">
                    <v-btn icon @click="deleteHistory(historial.id_HM)">
                      <v-icon > delete </v-icon>
                    </v-btn>
                  </v-list-tile-content>
                  <v-list-tile-content class="align-end">
                    <FormModificarHM :historial='historial'/>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <Footer/>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import Toolbar from '../Base/Toolbar'
import Footer from '../Base/Footer'
import FormModificarHM from './FormModificarHM'
import Vue from 'vue'

Vue.component('FormModificarHM', FormModificarHM)

export default {
  data () {
    return {
      id_animal: this.$route.params.id,
    }
  },
  components: {
    Toolbar,
    Footer,
    FormModificarHM
  },
  computed: mapState({
    token: state => state.user.token,
    history: state => state.historial.history,
    animals: state => state.animal.animals
  }),
  mounted() {
    this.getHistorial()
  },
  methods: {
    getHistorial(id_animal){
      let token = this.token
      let id = this.id_animal
      this.$store.dispatch('historial/obtainHistory', {token, id})
    },
    deleteHistory(id_HM){
      let token = this.token
      this.$store
      .dispatch("historial/deleteHistory", {token, id_HM}).then(() => {
        this.$router.go()
      })
    }
  }
}
</script>