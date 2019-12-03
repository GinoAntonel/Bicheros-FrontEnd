<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="750px" transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-btn  outline fab dark small v-on="on">
          <v-icon >edit</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-toolbar dark>
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat  @click="modifyDonation()">Guardar</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12 sm6>
              <v-select
                :items="['Comida de Gato', 'Comida de Perro', 'Ropa', 'Otros']"
                label="Tipo de Donacion"
                required
                v-model="donations.type_of_donation"
              ></v-select>
            </v-flex>

            <v-flex xs12 sm6 md6>
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
                    v-model="donations.date"
                    label="Fecha de Encuentro"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  ref="picker"
                  v-model="donations.date"
                  :max="new Date().toISOString().substr(0, 10)"
                  min="1950-01-01"
                  @change="save"
                ></v-date-picker>
              </v-menu>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <v-text-field
              required
              label='Descripcion'
              v-model="donations.description"
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
      donations: {
        type: Object
      },
    },
    data () {
      return {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
        date: null,
        menu: false,
      }
    },
    computed: mapState({
      token: state => state.user.token
    }),
    watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      }
    },
    methods: {
      modifyDonation() {
        let donations = this.donations
        let token = this.token
        this.$store.dispatch('donation/modifyDonation', {donations, token}).then(() => {
          this.$router.go()
        })
      },
      save (date) {
        this.$refs.menu.save(date)
      },
    }
  }
</script>