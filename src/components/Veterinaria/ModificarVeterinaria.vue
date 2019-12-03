<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="750px" transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-list-tile-title v-on="on">Editar</v-list-tile-title>
      </template>
      <v-card>
        <v-toolbar dark>
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Modificar Veterinaria</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat  @click="modifyVeterinaria()">Guardar</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div>
        <v-container grid-list-md>
          <v-layout row wrap>

            <v-flex xs12 sm6 md6>
              <v-text-field
              label='Nombre'
              required
              v-model="veterinaria.name"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <v-text-field
              label='Email'
              required
              v-model="veterinaria.email"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <v-text-field
              label='Direccion'
              required
              v-model="veterinaria.address"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <v-text-field
              label='Telefono'
              required
              v-model="veterinaria.phone"
              ></v-text-field>
            </v-flex>

          </v-layout>
        </v-container>
        </div>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'

  export default {
    props: {
      veterinaria: {
        type: Object
      },
    },
    data () {
      return {
        dialog: false,
        notifications: false,
      }
    },
    computed: mapState({
      token: state => state.user.token
    }),
    methods: {
      modifyVeterinaria() {
        let veterinaria = this.veterinaria
        console.log('dd +', this.veterinaria)
        let token = this.token
        this.$store.dispatch('veterinaria/modifyVeterinaria', {veterinaria, token}).then(() => {
        //this.$router.push({ path: '/veterinarias' })
        this.$router.go()
        })
      },

    }
  }
</script>