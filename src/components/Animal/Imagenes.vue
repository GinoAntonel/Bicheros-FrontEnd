<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" outline round dark v-on="on" small @click="getPhoto()"> Imagenes </v-btn>
      </template>

        <v-card >
          <v-card-title>
            <span class="headline">Mas Imagenes</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex v-for="image in photo" :key="image.id_photo" xs3>
                      <fullscreen :ref="`${image.id_photo}`" @change="fullscreenChange">
                        <div v-if="fullscreen == true">
                          <v-img
                            class="fulls"
                            :src=image.photo
                          />
                        </div>
                        <div v-else>
                          <v-hover>
                            <v-img
                            id="image"
                            slot-scope="{ hover }"
                              :src=image.photo
                              aspect-ratio="1"
                              class="grey lighten-2"
                            >
                            <v-expand-transition>
                              <div
                                v-if="hover"
                                class="d-flex transition-fast-in-fast-out transparent darken-2 v-card--reveal display-3 white--text"
                                style="height: 100%;"
                              >
                                <div class="text-xs-center">
                                  <v-btn fab dark small color="red" @click="deletePhoto(image.id_photo)">
                                    <v-icon dark>delete</v-icon>
                                  </v-btn>
                                  <v-btn fab dark small color="primary" @click="toggle(image.id_photo)">
                                    <v-icon dark>aspect_ratio</v-icon>
                                  </v-btn>
                                </div>
                              </div>
                            </v-expand-transition>
                          </v-img>
                          </v-hover>
                        </div>
                      </fullscreen>
                </v-flex>
              </v-layout>
            </v-container>
            <small>Mover el cursor sobre la imagen para mas informacion</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <AgregarPhoto/>
            <v-btn color="blue darken-1" flat @click="dialog = false">Cerrar</v-btn>
            <v-btn color="blue darken-1" flat @click="dialog = false">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      
    </v-dialog>
  </v-layout>
</template>

<script>
  import { mapState } from 'vuex'
  import fullscreen from 'vue-fullscreen'
  import Vue from 'vue'
  import AgregarPhoto from './AgregarPhoto'

  Vue.use(fullscreen)

  export default {
    
    props: {
      id: {
        type: Number
      },
    },
    data () {
      return {
        fullscreen: false,
        dialog: false,

      }
    },
    components: {
      AgregarPhoto
    },
    computed: mapState({
      token: state => state.user.token,
      photo: state => state.image.photo,
      animals: state => state.animal.animals,
    }),
    mounted(){
      
    },
    methods: {
      getPhoto(){
        let token = this.token
        let id = this.id
        this.$store.dispatch('image/obtainPhoto', {token, id})
      },
      deletePhoto(id_photo){
        let token = this.token
        this.$store
          .dispatch('image/deletePhoto', {id_photo, token}).then(() => {
            this.$router.go()
          }) 
      },
      toggle (id_photo) {
        this.$refs[id_photo][0].toggle()
      },
      fullscreenChange (fullscreen) {
          this.fullscreen = fullscreen
      }
    }
  }
</script>

<style scoped>
.fulls{
  width: 100%;
}
</style>