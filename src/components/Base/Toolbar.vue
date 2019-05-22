<template>
  <div id="toolbar">
    <v-navigation-drawer
      v-model="primaryDrawer.model"
      :permanent="primaryDrawer.type === 'permanent'"
      :temporary="primaryDrawer.type === 'temporary'"
      :clipped="primaryDrawer.clipped"
      :floating="primaryDrawer.floating"
      :mini-variant="primaryDrawer.mini"
      :drawerIsOpen = false
      
      absolute
      overflow
      app
    ></v-navigation-drawer>
    <v-toolbar :clipped-left="primaryDrawer.clipped" app absolute>
      <v-toolbar-side-icon
        @click="primaryDrawer.model = !primaryDrawer.model"
      ></v-toolbar-side-icon>
      <v-toolbar-title>Bicheros</v-toolbar-title>
    </v-toolbar>
  </div>
</template>

<script>
  export default {
    data: () => ({
      dark: true,
      drawers: ['Default (no property)', 'Permanent', 'Temporary'],
      primaryDrawer: {
        model: false,
        type: 'Permanent',
        clipped: false,
        floating: true,
        mini: true,
      },
      footer: {
        inset: true
      }
    })
  }
</script>