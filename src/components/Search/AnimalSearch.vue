<template>
  <div id="animalsearch">
    <v-flex xs6>
      <span class="headline">{{ name }}</span>
    </v-flex>
  </div>
</template>

<script>
  export default {
    name: 'animalsearch',
    props: ['id', 'name']
  }
</script>
