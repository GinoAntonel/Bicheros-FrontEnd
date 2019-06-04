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
    app>

    <v-list dense>
      <v-list-tile @click="">
        <v-list-tile-action>
          <v-icon>add</v-icon>
        </v-list-tile-action>
      </v-list-tile>
      <v-list-tile @click="">
        <v-list-tile-action>
          <v-tooltip right v-model="show" top>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon color="grey lighten-1">shopping_cart</v-icon>
            </v-btn>
          </template>
          <span>Programmatic tooltip</span>
        </v-tooltip>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>

    </v-navigation-drawer>
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