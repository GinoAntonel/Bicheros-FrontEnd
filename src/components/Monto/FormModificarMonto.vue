<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="750px" transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" v-on="on" text>
          Modify
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
            <v-btn dark flat  @click="modifyMonto()">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div>
        <v-container>
          <v-layout row wrap>

            <v-flex xs12 sm6 md6>
              <label>Cantidad:</label>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <v-text-field
              outline
              v-model="montos.amount"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <label>Fecha Encontrado:</label>
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
                    v-model="montos.date"
                    label="Fecha de Encuentro"
                    readonly
                    v-on="on"
                    outline
                  ></v-text-field>
                </template>
                <v-date-picker
                  ref="picker"
                  v-model="montos.date"
                  :max="new Date().toISOString().substr(0, 10)"
                  min="1950-01-01"
                  @change="save"
                ></v-date-picker>
              </v-menu>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <label>Especie:</label>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <v-text-field
              outline
              v-model="montos.tipo"
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
  export default {
    props: {
      montos: {
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
    watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      }
    },
    methods: {
      modifyMonto(montos) {
        this.$store.dispatch('monto/modifyMonto', this.montos)
        this.$router.push({ path: '/monto' })
        this.$router.go()
      },
      save (date) {
        this.$refs.menu.save(date)
      },
    }
  }
</script>