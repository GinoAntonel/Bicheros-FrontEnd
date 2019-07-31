<template>
  <v-app id="base" dark>
    <Toolbar/>
    <v-content>
    <v-container grid-list-md text-xs-center>
      <p> {{ saldos }}</p>
      <FormAgregarMonto/>
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
              <v-btn text>Modify</v-btn>
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
  import FormAgregarMonto from './FormAgregarMonto'

  export default {
    data() {
      return {
        saldo: 0,
        balance: []
      }  
    },
    computed: mapState({
      amounts: state => state.monto.amounts,
      saldos: state => state.monto.saldos
    }),
    mounted() {
      this.getAmount()
      this.getSaldo()
    },
    name: 'Bicheros',
    components: {
      Toolbar,
      Footer,
      FormAgregarMonto
    },
    methods: {
      getAmount(){
        this.$store.dispatch('monto/obtainAmount')
      },
      getSaldo(){
        this.$store.dispatch('monto/obtainSaldo', this.saldo)
      },
      deleteMonto(id){
        this.$store.dispatch('monto/deleteMonto', id)
        this.$router.go()
      }
    }
  }
  
</script>