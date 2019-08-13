<template>
  <v-layout justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Add</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add Veterinaria</span>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="addVeterinaria()" method="POST">
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6>
                  <v-text-field v-model="veterinaria.name" label="Name" required></v-text-field>
                </v-flex>
                <v-flex xs12 >
                  <v-text-field v-model="veterinaria.email" label="Email" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field v-model="veterinaria.address" label="Address" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field v-model="veterinaria.phone" label="Telefono" required></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
          <small>*Complete obligatory</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="addVeterinaria()">Save</v-btn>
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
      veterinaria: {
        name: "",
        email: "",
        date: "",
        address: "",
        phone: ""
      }
    }),
    computed: mapState({
      token: state => state.user.token
    }),
    methods: {
      addVeterinaria(){
        let veterinaria = this.veterinaria
        let token = this.token
        this.$store.dispatch('veterinaria/createVeterinaria', {veterinaria, token}).then(() => {
          this.$router.go()
        })
      },
    }
  }
</script>