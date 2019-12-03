<template>
  <v-app id="base" dark>
    <Toolbar/>
    <v-content>

      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex
            xs12
            sm6
            md4
            xs4 v-for="donation in donations" 
            :key="donation.id_donations"
          >
            <v-card>

            <v-card-title class="subheading font-weight-bold">
                  {{donation.description}} x{{donation.quantity}}
            </v-card-title>

              <v-divider></v-divider>


                <v-list-tile>
                  <v-list-tile-content>Fecha:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ donation.date }}</v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
                <v-list-tile>
                  <v-list-tile-content class="align-center" >
                    <v-btn fab outline dark small class="btnR">
                      <v-icon dark>delete</v-icon>
                    </v-btn>
                  </v-list-tile-content>
                  <v-list-tile-content class="align-end">
                    <ModificarDonation :donations='donation'/>
                  </v-list-tile-content>
                </v-list-tile>

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
    data() {
      return {
        type_of_donation: this.$route.params.TOD,
      }  
    },
    computed: mapState({
      token: state => state.user.token,
      donations: state => state.donation.donations,
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
      getDonations(type_of_donation){
        let token = this.token
        let TOD = this.type_of_donation
        this.$store.dispatch("donation/obtainDonations2", { token, TOD })
      },
      getDonationsStock(){
        let token = this.token
        let donations = this.donations
        this.$store.dispatch("donation/obtainDonationsStock", { token })
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

<style scoped>
.btnR{
margin-right: 65%;
}
</style>