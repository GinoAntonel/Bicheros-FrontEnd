<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <button v-on="on" type="button" class="v-btn v-btn--bottom v-btn--floating v-btn--fixed v-btn--right theme--dark green darken-1" style="" data-v-10ea4164="">
          <div class="v-btn__content">
            <i aria-hidden="true" class="v-icon material-icons theme--dark">add</i>
          </div>
        </button>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Agregar Enfermedad</span>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="addHistory()" method="POST">
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="historial.enfermedad" label="Enfermedad" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="historial.description" label="Descripcion"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="historial.fecha"
                        label="Fecha de Encuentro"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      ref="picker"
                      v-model="historial.fecha"
                      :max="new Date().toISOString().substr(0, 10)"
                      min="1950-01-01"
                      @change="save"
                    ></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-select
                    :items="['Curado', 'No Curado']"
                    label="Estado"
                    required
                    v-model="historial.estado"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-select
                    :items="animals"
                    item-text="name"
                    item-value='id_animal'
                    label="Animal"
                    required
                    v-model='historial.animal'
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
          <small>Completar todos antes de seguir</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="addHistory()">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex' 

  export default {
    data: () => ({
      dialog: false,
      menu: false,
      date: null,
      historial: {
        enfermedad: "",
        fecha: "",
        description: "",
        estado: "",
        animal: ""
      }

    }),
    computed: mapState({
      token: state => state.user.token,
      animals: state => state.animal.animals,

    }),
    watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
    },
    mounted() {
      this.obtainAnimals()
    },
    methods: {
      obtainAnimals(){
        let token = this.token
        this.$store.dispatch("animal/obtainAnimals", token)
      },
      addHistory(){
        let token = this.token
        let historial = this.historial
        this.$store.dispatch('historial/createHistory', {historial, token}).then(() => {
          this.$router.go()
        })
      },
      save (date) {
        this.$refs.menu.save(date)
      },
    }
  }
</script>