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
          <span class="headline">Agregar Donacion</span>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="addDonation()" method="POST">
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6>
                  <v-select
                    :items="['Comida de Gato', 'Comida de Perro', 'Ropa', 'Otros']"
                    label="Tipo de Donacion"
                    required
                    v-model="donation.type_of_donation"
                  ></v-select>
                </v-flex>
                <v-flex xs6>
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
                        v-model="donation.date"
                        label="Fecha de Encuentro"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      ref="picker"
                      v-model="donation.date"
                      :max="new Date().toISOString().substr(0, 10)"
                      min="1950-01-01"
                      @change="save"
                    ></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="donation.description" label="Descripcion" required></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
          <small>Completar todos antes de seguir</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="addDonation()">Guardar</v-btn>
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
      date: null,
      menu: false,
      donation: {
        description: '',
        type_of_donation: '',
        date: ''
      },
    }),
    computed: mapState({
      token: state => state.user.token
    }),
    watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      }
    },
    methods: {
      addDonation(){
        let donation = this.donation
        let token = this.token
        this.$store.dispatch('donation/createDonation', {donation, token}).then(() => {
          this.$router.go()
        })
      },
      save (date) {
        this.$refs.menu.save(date)
      },
    }
  }
</script>