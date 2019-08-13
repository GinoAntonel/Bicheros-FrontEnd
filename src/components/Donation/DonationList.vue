<template>
  <v-app id="base" dark>
    <Toolbar/>
    <v-content>
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs4 v-for="donation in donations" :key="donation.id_donations">
            <v-card class="elevation-16 mx-auto" width="300">
              <v-card-title class="headline" primary-title>
                {{ donation.type_of_donation }}
              </v-card-title>
              <v-card-text>
                {{ donation.date }}
                <div class="text-center mt-12">
                  {{ donation.description }}
                </div>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions class="justify-space-between">
                <v-btn color="primary" text @click="deleteDonation(donation.id_donation)">
                  Delete
                </v-btn>
                <ModificarDonation :donations='donation'/>
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
import Footer from "../Base/Footer"
import Toolbar from "../Base/Toolbar"
import ModificarDonation from './ModificarDonation'
import AgregarDonation from './AgregarDonation'
import Vue from 'vue'

Vue.component('ModificarDonation', ModificarDonation)

  export default {
    computed: mapState({
      token: state => state.user.token,
      donations: state => state.donation.donations
    }),
    mounted(){
      this.getDonations()
    },
    components: {
      Footer,
      Toolbar,
      ModificarDonation,
      AgregarDonation
    },
    methods: {
      getDonations(){
        let token = this.token
        let donations = this.donations
        this.$store.dispatch("donation/obtainDonations", { token, donations })
      },
      deleteDonation(id_donation){
        let token = this.token
        this.$store.dispatch('donation/deleteDonation', {token, id_donation}).then(() => {
          this.$router.go()
        })
      }
    }
  }
</script>