<template>
  <v-app id="base" dark>
    <Toolbar/>
    <v-content>
      <v-container fluid grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs5></v-flex>
          <v-flex xs2 v-if='saldos >= 0'>
            <v-alert :value="true" type="success">
              Saldo ${{ saldos }}
            </v-alert>
          </v-flex>
          <v-flex xs5></v-flex>
          <v-flex xs5></v-flex>
          <v-flex xs2 v-if='saldos < 0'>
            <v-alert :value="true" type="error">
              Saldo ${{ saldos }}
            </v-alert>
          </v-flex>
          <v-flex xs5></v-flex>
          <v-flex xs12 sm6 md4 lg3 v-for="monto in amounts" :key="monto.id">
            <div v-if="monto.type === 'Deposit'">
              <v-toolbar class="green" dark>
                <v-toolbar-title><v-icon>check_circle</v-icon></v-toolbar-title>
                <v-toolbar-title>${{ monto.amount }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-menu bottom left>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      dark
                      icon
                      v-on="on"
                    >
                      <v-icon>more_vert</v-icon>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-tile
                      @click="deleteMonto(monto.id)"
                    >
                      <v-list-tile-title>Eliminar</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile
                      @click=""
                    >
                      <FormModificarMonto :montos='monto'/>
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </v-toolbar>
            </div>

            <div v-if="monto.type === 'Expense'">
              <v-toolbar class="red" dark>
                <v-toolbar-title><v-icon>warning</v-icon></v-toolbar-title>
                <v-toolbar-title>${{ monto.amount }}</v-toolbar-title>
                <v-spacer></v-spacer>

                  <v-menu bottom left>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        dark
                        icon
                        v-on="on"
                      >
                        <v-icon>more_vert</v-icon>
                      </v-btn>
                    </template>

                    <v-list>
                      <v-list-tile
                        @click="deleteMonto(monto.id)"
                      >
                        <v-list-tile-title>Eliminar</v-list-tile-title>
                      </v-list-tile>
                      <v-list-tile
                        @click=""
                      >
                        <FormModificarMonto :montos='monto'/>
                      </v-list-tile>
                    </v-list>
                  </v-menu>
              </v-toolbar>
            </div>

            <v-card>
              <v-list dense>
                <v-list-tile>
                  <v-list-tile-content>Fecha:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ monto.date }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Tipo:</v-list-tile-content>
                  <v-list-tile-content class="align-end" v-if="monto.type === 'Deposit'">
                    Ingreso
                  </v-list-tile-content>
                  <v-list-tile-content class="align-end" v-if="monto.type === 'Expense'">
                    Gasto
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <router-view/>
    <Footer/>
  </v-app>
</template>

<script>
  import { mapState } from 'vuex'
  import Toolbar from '../Base/Toolbar'
  import Footer from '../Base/Footer'
  import Vue from 'vue'
  import FormModificarMonto from './FormModificarMonto'

  Vue.component('FormModificarMonto', FormModificarMonto)

  export default {
    data() {
      return {
        saldo: 0,
        balance: [],
      }  
    },
    computed: mapState({
      amounts: state => state.monto.amounts,
      saldos: state => state.monto.saldos,
      token: state => state.user.token
    }),
    mounted() {
      this.getAmount()
      this.getSaldo()
    },
    name: 'Bicheros',
    components: {
      Toolbar,
      Footer,
      FormModificarMonto
    },
    methods: {
      getAmount(){
        this.$store.dispatch('monto/obtainAmount', this.token)
      },
      getSaldo(){
        let saldo = this.saldo
        let token = this.token
        this.$store.dispatch('monto/obtainSaldo', {saldo, token})
      },
      deleteMonto(id){
        let token = this.token
        this.$store
        .dispatch('monto/deleteMonto', {id, token}).then(() => {
        this.$router.go()
      }) 
      }
    }
  }
  
</script>