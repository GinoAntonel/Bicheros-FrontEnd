<template>
  <div id="base">
    <Toolbar/>
    <Card/>
    <router-view/>
  </div>
</template>

<script>
  import Toolbar from './Base/Toolbar'
  import Card from './Animal/Card'

  export default {
    name: 'Bicheros',
    components: {
      Toolbar,
      Card
    }
  }
</script>

