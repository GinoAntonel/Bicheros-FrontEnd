<template>
  <v-layout justify-center>
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
          <span class="headline">Agregar Monto</span>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="addAmount()" method="POST">
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="monto.amount" label="Monto" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-select
                    :items="['Ingreso', 'Gasto']"
                    label="Tipo"
                    required
                    v-model="monto.type"
                  ></v-select>
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
                        label="Fecha"
                        readonly
                        v-on="on"
                        v-model="monto.date"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      ref="picker" 
                      :max="new Date().toISOString().substr(0, 10)"
                      min="1950-01-01"
                      v-model="monto.date"
                      @change="save"
                    ></v-date-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
          <small>*Completar los requeridos</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Cerrar</v-btn>
          <v-btn color="blue darken-1" text @click="addAmount()">Guardar</v-btn>
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
      monto: {
        amount: '',
        type: '',
        date: ''
      }
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
      addAmount(){
        let monto = this.monto
        let token = this.token
        this.$store.dispatch('monto/createMonto', {monto, token})
        this.$router.go()
      },
      save (date) {
        this.$refs.menu.save(date)
        console.log(date)
      },
    }
  }
</script>