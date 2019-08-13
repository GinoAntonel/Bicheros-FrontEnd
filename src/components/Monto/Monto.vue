<template>
  <v-app id="base" dark>
    <Toolbar/>
    <v-content>
    <v-container grid-list-md text-xs-center>
      <p> {{ saldos }}</p>
      <v-layout row wrap>
        <v-flex v-for="monto in amounts" xs4>
          <v-card class="elevation-16 mx-auto" width="300">
            <v-card-title class="headline" primary-title>
              {{ monto.amount }}
            </v-card-title>
            <v-card-text>
              {{ monto.date }}
              <div class="text-center mt-12">
                {{ monto.tipo }}
              </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="justify-space-between">
              <FormModificarMonto :montos="monto"/>
              <v-btn color="primary" text @click="deleteMonto(monto.id)">
                Delete
              </v-btn>
            </v-card-actions>
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
        balance: []
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