<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex v-for="(animal, index) in animals" xs4>
        <v-card height="400px">
          <v-flex v-if="bottomNav[index] == 'img'">
            <v-img :src="`${animal.photo}`" height="400px" contain></v-img>
          </v-flex>
          <v-flex v-if="bottomNav[index] == 'delete'">
            <v-container>
              <v-btn @click="deleteAnimal(animal.id_animal)" color="error">Eliminar</v-btn>
            </v-container>
          </v-flex>
          <v-flex v-else-if="bottomNav[index]  == 'info'" xs12>
            <v-container>
              <v-layout row wrap>
                <v-flex xs4>
                  <v-subheader>Nombre:</v-subheader>
                </v-flex>
                <v-flex xs8>
                  <v-card-text>
                    {{animal.name}}
                  </v-card-text>
                </v-flex>
              </v-layout>

              <v-divider inset></v-divider>

              <v-layout row>
                <v-flex xs4>
                  <v-subheader> Raza:</v-subheader>
                </v-flex>
                <v-flex xs8>
                  <v-card-text>
                    {{animal.race}}
                  </v-card-text>
                </v-flex>
              </v-layout>

              <v-divider inset></v-divider>

              <v-layout row>
                <v-flex xs4>
                  <v-subheader>Fecha encontrado:</v-subheader>
                </v-flex>
                <v-flex xs8>
                  <v-card-text>
                    {{animal.date_founded}}
                  </v-card-text>
                </v-flex>
              </v-layout>

              <v-divider inset></v-divider>

              <v-layout row>
                <v-flex xs4>
                  <v-subheader>Lugar encontrado:</v-subheader>
                </v-flex>
                <v-flex xs8>
                  <v-card-text>
                    {{animal.place_founded}}
                  </v-card-text>
                </v-flex>

              <v-divider inset></v-divider>
              </v-layout>
            </v-container>
          </v-flex>
          <v-bottom-nav :active.sync="bottomNav[animal.id_animal-1]" :value="true"  absolute dark shift>
            <v-btn dark id="btn" value="img">
              <span>Imagen</span>
              <v-icon>image</v-icon>
            </v-btn>

            <v-btn dark value="info">
              <span>Informacion</span>
              <v-icon>info</v-icon>
            </v-btn>

            <v-btn dark value="delete">
              <span>Eliminar</span>
              <v-icon>block</v-icon>
            </v-btn>
          </v-bottom-nav> 
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      bottomNav: []
    }
  },
  computed: mapState({
    animals: state => state.animal.animals,
  }),
  mounted() {
    this.getAnimals()
  },
  methods: {
    getAnimals() {
      this.$store.dispatch('animal/obtainAnimals').then(res => {
      
      for (let i = 0; i < this.animals.length; i++){
        this.bottomNav.push('img')
      }
      })
    },
    deleteAnimal(id) {
      this.$store.dispatch('animal/deleteAnimal', id) // accion que va a ejecutar el store
      this.$router.go()
    },
    getBottomnav(id) {
      
      return this.bottomNav[id-1]
    }
  }
}
</script>

