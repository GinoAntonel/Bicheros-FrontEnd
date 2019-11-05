<template>
  <v-app id="base" dark>
    <Toolbar/>
    <v-content>
      <v-container grid-list-md text-xs-center>
        <v-layout row>
          <v-flex xs12 sm6 offset-sm3>
            <v-card>
              <v-toolbar color="cyan" dark>
                <v-toolbar-side-icon></v-toolbar-side-icon>
                <v-toolbar-title>Inbox</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>search</v-icon>
                </v-btn>
              </v-toolbar>

              <v-list two-line>
                <template v-for="cap in clientes">
                  <v-divider></v-divider>
                  <v-list-tile
                    :key="cap.nameC"
                    avatar
                    @click=""
                  >
                    <v-list-tile-avatar>
                      <img src='https://cdn.vuetifyjs.com/images/lists/1.jpg'></img>
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                      <v-list-tile-title v-html="cap.nameC + ' ' + cap.last_nameC">{{ cap.last_nameC }}</v-list-tile-title>
                      <v-list-tile-sub-title><span class='text--primary'>{{ cap.email }}</span> &mdash; {{ cap.date_of_birth }}</v-list-tile-sub-title>
                      <v-list-tile-sub-title><span class='text--primary'>{{ cap.phone }}</span> &mdash; {{ cap.address }} </v-list-tile-sub-title>
                    </v-list-tile-content>
                  <v-list-tile-action>
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
                          v-for="(item, i) in items"
                          :key="i"
                          @click=""
                        >
                          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        </v-list-tile>
                      </v-list>
                    </v-menu>
                  </v-list-tile-action>
                  </v-list-tile>
                </template>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>
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
                      <v-list-tile-content class="align-left">{{ cap.phone }}</v-list-tile-content>
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
  data() {
    return {
      items: [
        { title: 'Eliminar' },
        { title: 'Editar' },
      ]
    }
  },
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
