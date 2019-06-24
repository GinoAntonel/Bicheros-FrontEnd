<template>
    <div id="search">
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
    name: 'Search',
    data() {
      return {
        wordSearch: '',
      }
    },
    methods: {
      search(wordSearch, returnValue) {
        console.log(wordSearch)
        console.log(returnValue)
      }
    }
  }
</script>