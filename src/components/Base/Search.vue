<template>
    <div id="animalSearch">
      <v-form @submit.prevent='search'>
        <v-text-field
          v-model="animalSearch.wordSearch"
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
  export default {
    name: 'Search',
    data() {
      return {
        animalSearch: {
        wordSearch: '',
        }
      }
    },
    methods: {
      search(animalSearch) {
        console.log(this.animalSearch.wordSearch)
        this.$store.dispatch('animal/searchAnimals', this.animalSearch)
        .then(() => {
          this.$router.push({ name: 'search' })
        })
      }
    }
  }
</script>