<template>
    <div id="animalSearch">
      <v-form @submit.prevent='search'>
        <v-text-field
          v-model="wordSearch"
          class="mx-3"
          label="Search"
          prepend-inner-icon="search"
          flat
          solo-inverte/>
        <v-btn type="submit" hidden/>
      </v-form>
    </div>
</template>


<script>
import { mapState } from 'vuex'

  export default {
    name: 'SearchA',
    data() {
      return {
        wordSearch: '',
      }
    },
    computed: mapState({
      token: state => state.user.token
    }),
    methods: {
      search(animalSearch) {
        console.log(this.wordSearch)
        let wordSearch = this.wordSearch
        let token = this.token
        this.$store
          .dispatch('animal/searchAnimals', {wordSearch, token})
          .then(() => {
            this.$router.push({ name: 'search' })
          })
      }
    }
  }
</script>