<template>
  <v-layout justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Add</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add Client</span>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="addClient()" method="POST">
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6>
                  <v-text-field v-model="client.name" label="Name" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field v-model="client.last_name" label="Last Name" required></v-text-field>
                </v-flex>
                <v-flex xs12 >
                  <v-text-field v-model="client.email" label="Email" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field v-model="client.address" label="Address" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field v-model="client.telefono" label="Telefono" required></v-text-field>
                </v-flex>
                <v-flex xs12 >
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
                        v-model="client.date"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      ref="picker" 
                      :max="new Date().toISOString().substr(0, 10)"
                      min="1950-01-01"
                      v-model="client.date"
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
          <v-btn color="blue darken-1" text @click="addClient()">Save</v-btn>
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
      client: {
        name: "",
        last_name: "",
        email: "",
        date: "",
        address: "",
        telefono: ""
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
      addClient(){
        let client = this.client
        let token = this.token
        this.$store.dispatch('cap/createClient', {client, token}).then(() => {
          this.$router.go()
        })
      },
      save (date) {
        this.$refs.menu.save(date)
        console.log(date)
      },
    }
  }
</script>