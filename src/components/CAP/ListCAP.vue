<template>
  <v-app id="base" dark>
    <Toolbar/>
    <v-content>
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs10>
            <v-expansion-panel>
              <v-expansion-panel-content v-for="cap in clientes" :key="cap.id_cap">
                <template v-slot:header>
                  <div> {{ cap.nameC }} {{ cap.last_nameC }} 
                    <EditCAP :client="cap"/>
                    <v-icon small class="mr-2" @click="deleteClient(cap.id_cap)"> delete </v-icon>
                  </div>
                </template>
                <v-card>
                  <v-divider></v-divider>
                  <v-list dense>
                    <v-list-tile>
                      <v-list-tile-content class="align-center">Mail:</v-list-tile-content>
                      <v-list-tile-content class="align-left">{{ cap.email }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content class="align-center">Fecha de Nacimiento:</v-list-tile-content>
                      <v-list-tile-content class="align-left">{{ cap.date_of_birth }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content class="align-center">Direccion:</v-list-tile-content>
                      <v-list-tile-content class="align-left">{{ cap.address }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content class="align-center">Telefono:</v-list-tile-content>
                      <v-list-tile-content class="align-left">{{ cap.telefono }}</v-list-tile-content>
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
import EditCAP from './EditCAP'

Vue.component('EditCAP', EditCAP)

export default {
  components: {
    Toolbar,
    Footer,
    EditCAP
  },
  computed: mapState({
    token: state => state.user.token,
    clientes: state => state.cap.clientes
  }),
  mounted(){
    this.getClientes()
  },
  methods: {
    getClientes(){
      let token = this.token
      let clientes = this.clientes
      this.$store.dispatch("cap/obtainClients", {token, clientes})
    },
    deleteClient(id_cap){
      let token = this.token
      this.$store.dispatch("cap/deleteClient", {token, id_cap}).then(() => {
        this.$router.go()
      })
    }
  }
}
</script>
