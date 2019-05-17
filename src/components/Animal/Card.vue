<template>
  <v-layout row>
    <div v-for="animal in animals" class="xd">
      {{animal}}
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            height="200px"
          >
          </v-img>

          <v-card-title primary-title>
            <div>
              <div class="headline">{{animal.name}}</div>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Profile photo</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

            </div>
          </v-card-title>
          <v-divider light></v-divider>
          <v-card-actions>
            <v-btn flat>Share</v-btn>
            <v-btn flat color="purple">Name</v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click="show = !show">
              <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-slide-y-transition>
            <v-card-text v-show="show">
              I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
            </v-card-text>
          </v-slide-y-transition>
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
    }
  }
}
</script>
