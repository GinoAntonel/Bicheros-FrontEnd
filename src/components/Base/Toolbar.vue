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
      <v-tooltip right>
        <template v-slot:activator="{ on }">
          <v-list-tile @click="$router.push({ path: '/monto'})">
            <v-list-tile-action>
              <v-icon v-on="on">attach_money</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </template>
        <span>Monto</span>
      </v-tooltip>
      <v-tooltip right>
        <template v-slot:activator="{ on }">
          <v-list-tile @click="$router.push({ path: '/clientes'})">
            <v-list-tile-action>
              <v-icon v-on="on">account_box</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </template>
        <span>Clientes</span>
      </v-tooltip>
      <v-tooltip right>
        <template v-slot:activator="{ on }">
          <v-list-tile @click="$router.push({ path: '/veterinarias'})">
            <v-list-tile-action>
              <v-icon v-on="on">add_location</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </template>
        <span>Veterinaria</span>
      </v-tooltip>
      <v-tooltip right>
        <template v-slot:activator="{ on }">
          <v-list-tile @click="$router.push({ path: '/donaciones'})">
            <v-list-tile-action>
              <v-icon v-on="on">add_shopping_cart</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </template>
        <span>Donaciones</span>
      </v-tooltip>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar :clipped-left="primaryDrawer.clipped" app absolute>
      <v-toolbar-side-icon
        @click="primaryDrawer.model = !primaryDrawer.model"
      ></v-toolbar-side-icon>
      <v-toolbar-title>Bicheros</v-toolbar-title>
      <v-spacer/>
      <div v-if="
      $router.history.current['path'] == '/' ||
      $router.history.current['path'] == '/search' ||
      $router.history.current['path'] == '/veterinarias' ||
      $router.history.current['path'] == '/searchVet' ||
      $router.history.current['path'] == '/clientes' ||
      $router.history.current['path'] == '/searchCap'
      ">
        <Search/>
      </div>
    </v-toolbar>
  </div>
</template>

<script>
import Search from './Search'

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
        dialog: false
      },
      footer: {
        inset: true
      },
    }),
    components: {
      Search,
    }
  }
</script>