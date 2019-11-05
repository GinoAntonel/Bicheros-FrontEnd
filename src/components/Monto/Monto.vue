<template>
  <v-app id="base" dark>
    <Toolbar/>
    <v-content>
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs10>
            <v-expansion-panel>
              <v-expansion-panel-content v-for="monto in amounts" :key="monto.id">
                <template v-slot:header>
                 {{ monto.amount }}
                    <td class="justify-left layout px-0">
                      <FormModificarMonto :montos='monto'/>
                      <v-btn icon class="mr-0" @click="deleteMonto(monto.id)">
                        <v-icon> delete </v-icon>
                      </v-btn>
                      </td>
                </template>
                <v-card>
                  <v-divider></v-divider>
                  <v-list dense>
                    <v-list-tile>
                      <v-list-tile-content class="align-center">Tipo:</v-list-tile-content>
                      <v-list-tile-content class="align-left">{{ monto.type }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content class="align-center">Fecha:</v-list-tile-content>
                      <v-list-tile-content class="align-left">{{ monto.date }}</v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-flex>
          <v-flex xs2 v-if='saldos >= 0'>
            <v-alert
            :value="true"
            type="success"
            >
              Saldo {{ saldos }}
            </v-alert>
          </v-flex>
          <v-flex xs1 v-if='saldos < 0'>
            <v-alert
            :value="true"
            type="error"
            >
              {{ saldos }}
            </v-alert>
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