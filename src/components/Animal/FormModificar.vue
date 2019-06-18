<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Modificar</v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat  @click="modifyAnimals()">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div>
        <v-container>
          <v-layout row wrap>

            <v-flex xs12 sm6 md6>
              <label>Nombre:</label>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <v-text-field
              outline
              v-model="animales.name"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <label>Raza:</label>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <v-text-field
              outline
              v-model="animales.race"
              ></v-text-field>

            </v-flex>
            <v-flex xs12 sm6 md6>
              <label>Fecha Encontrado:</label>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <v-text-field
              outline
              v-model="animales.date_founded"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <label>Lugar Encontrado:</label>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <v-text-field
              outline
              v-model="animales.place_founded"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <label>Especie:</label>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <v-text-field
              outline
              v-model="animales.species"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <label>Genero:</label>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <v-text-field
              outline
              v-model="animales.gender"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <label>Foto:</label>
            </v-flex>

            <v-flex xs12 sm6  md6 class="text-xs-center text-sm-center text-md-center text-lg-center">
              <input type="file">
            </v-flex>
          </v-layout>
        </v-container>
        </div>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    props: {
      animales: {
        type: Number
      }
    },
    data () {
      return {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
      }
    },
    methods: {
      modifyAnimals(animales) {
        this.$store.dispatch('animal/modifyAnimals', this.animales)
        this.$router.go()
      },
    }
  }
</script>