<template>
  <v-layout justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add Amount</span>
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
                    v-model="monto.tipo"
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
          <small>*Complete obligatory</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="addAmount()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      date: null,
      menu: false,
      monto: {
        amount: '',
        tipo: '',
        date: ''
      }
    }),
    watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      }
    },
    methods: {
      addAmount(monto){
        this.$store.dispatch('monto/createMonto', this.monto)
        this.$router.go()
      },
      save (date) {
        this.$refs.menu.save(date)
        console.log(date)
      },
    }
  }
</script>