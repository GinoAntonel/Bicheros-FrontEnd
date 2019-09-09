<template>
  <v-app id="base" dark>
    <Toolbar/>
    <v-content>
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs4>
            <v-card class="elevation-16 mx-auto" width="300">
              <v-card-title class="headline" primary-title>
                Comida de Gato
              </v-card-title>
              <v-divider></v-divider>
              <v-card-actions class="justify-space-between">
                <router-link :to="{ name: 'DonationList', params: { TOD: 0 } }">
                  <v-btn class="primary" >Ver</v-btn>
                </router-link>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex xs4>
            <v-card class="elevation-16 mx-auto" width="300">
              <v-card-title class="headline" primary-title>
                Comida de Perro
              </v-card-title>
              <v-divider></v-divider>
              <v-card-actions class="justify-space-between">
                <router-link :to="{ name: 'DonationList', params: { TOD: 1 } }">
                  <v-btn class="primary" >Ver</v-btn>
                </router-link>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex xs4>
            <v-card class="elevation-16 mx-auto" width="300">
              <v-card-title class="headline" primary-title>
                Remedios
              </v-card-title>
              <v-divider></v-divider>
              <v-card-actions class="justify-space-between">
                <router-link :to="{ name: 'DonationList', params: { TOD: 2 } }">
                  <v-btn class="primary" >Ver</v-btn>
                </router-link>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex xs4>
            <v-card class="elevation-16 mx-auto" width="300">
              <v-card-title class="headline" primary-title>
                Collares
              </v-card-title>
              <v-divider></v-divider>
              <v-card-actions class="justify-space-between">
                <router-link :to="{ name: 'DonationList', params: { TOD: 3 } }">
                  <v-btn class="primary" >Ver</v-btn>
                </router-link>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex xs4>
            <v-card class="elevation-16 mx-auto" width="300">
              <v-card-title class="headline" primary-title>
                Otros
              </v-card-title>
              <v-divider></v-divider>
              <v-card-actions class="justify-space-between">
                <router-link :to="{ name: 'DonationList', params: { TOD: 4 } }">
                  <v-btn class="primary" >Ver</v-btn>
                </router-link>
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


  export default {
    data() {
      return {
        
      }  
    },
    computed: mapState({
      token: state => state.user.token,
      donations: state => state.donation.donations,
      donationCG: state => state.donation.donationCG
    }),
    components: {
      Footer,
      Toolbar,
    },
    mounted() {
      this.getDonations()
    },
    methods: {
      getDonations(){
        let token = this.token
        this.$store.dispatch("donation/obtainDonations", { token })
      }
    }
  }
</script>