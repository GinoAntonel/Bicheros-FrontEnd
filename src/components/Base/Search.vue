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
  export default {
    name: 'SearchA',
    data() {
      return {
        wordSearch: '',
      }
    },
    methods: {
      search(animalSearch) {
        console.log(this.wordSearch)
        this.$store
          .dispatch('animal/searchAnimals', this.wordSearch)
          .then(() => {
            this.$router.push({ name: 'search' })
          })
      }
    }
  }
</script>