<template>
  <v-layout row justify-center>
      <v-card>
        <v-card-title>
          <span class="headline">Agregar Animal</span>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="addAnimal()" method="POST">
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="animal.name" label="Nombre" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="animal.race" label="Raza"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="animal.species"
                    label="Especie"
                    hint="Ej: Perro, Gato, etc"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="animal.place_founded" label="Lugar Encontrado" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="animal.date_founded" label="Date Encontrado" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-select
                    :items="['Masculino', 'Femenino']"
                    label="Genero"
                    required
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-autocomplete
                    :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                    label="Interests"
                    multiple
                  ></v-autocomplete>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
          <small>Completar todos antes de seguir</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="addAnimal()">Guardar</v-btn>
        </v-card-actions>
      </v-card>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      date: null,
      menu: false,
      animal: {
        name: '',
        race: '',
        date_founded: '',
        place_founded: '',
        species: ''
      }
    }),
    watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      }
    },
    methods: {
      save (date) {
        this.$refs.menu.save(date)
      },
      addAnimal(animal){
        this.$store.dispatch('animal/createAnimal', this.animal)
    }
    }
  }
</script>