<template>
  <v-layout row>
    <div v-for="animal in animals" class="xd">
      {{animal}}
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-img
            src="https://picsum.photos/id/237/200/300"
            height="300px"
            contain
          >
          </v-img>

          <v-layout row wrap>
            <v-flex xs4>
              <v-card dark>
                <v-card-text class="px-0">
                  {{animal.name}}
                </v-card-text> 
              </v-card>
            </v-flex>
            <v-flex xs4>
              <v-card dark>
                <v-card-text class="px-0">
                  {{animal.race}}
                </v-card-text> 
              </v-card>
            </v-flex>
            <v-flex xs4>
              <v-card dark>
                <v-card-text class="px-0">
                  {{animal.gender}}
                </v-card-text> 
              </v-card>
            </v-flex>
          </v-layout>
          
          <v-layout row wrap>
            <v-flex xs4>
              <v-card dark>
                <v-card-text class="px-0">
                  {{animal.date_founded}}
                </v-card-text> 
              </v-card>
            </v-flex>
            <v-flex xs4>
              <v-card dark>
                <v-card-text class="px-0">
                  {{animal.place_founded}}
                </v-card-text> 
              </v-card>
            </v-flex>
            <v-flex xs4>
              <v-card dark>
                <v-card-text class="px-0">
                  {{animal.species}}
                </v-card-text> 
              </v-card>
            </v-flex>
          </v-layout>

          <v-card-actions>
            <v-btn @click="deleteAnimal(animal.id_animal)" flat>Delete</v-btn>
            <v-btn flat color="purple">Name</v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click="show = !show">
              <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </div>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState({
    animals: state => state.animal.animals
  }),
  mounted() {
    this.getAnimals()
  },
  methods: {
    getAnimals() {
      this.$store.dispatch('animal/obtainAnimals')
    },
    deleteAnimal(id) {
      console.log(id)
      this.$store.dispatch('animal/deleteAnimal', id) // accion que va a ejecutar el store
      this.$router.go()
    }
  }
}
</script>
