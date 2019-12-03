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
          <span class="headline">Agregar Veterinaria</span>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="addVeterinaria()" method="POST">
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6>
                  <v-text-field v-model="veterinaria.name" label="Nombre" required></v-text-field>
                </v-flex>
                <v-flex xs12 >
                  <v-text-field v-model="veterinaria.email" label="Email" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field v-model="veterinaria.address" label="Direccion" required></v-text-field>
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
          <v-btn color="blue darken-1" text @click="dialog = false">Cerrar</v-btn>
          <v-btn color="blue darken-1" text @click="addVeterinaria()">Guardar</v-btn>
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