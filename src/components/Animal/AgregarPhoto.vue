<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <div class="text-xs-center">
          <v-btn v-on="on" color="blue darken-1" flat text-justify-left>
            <v-icon>
              add
            </v-icon>
          </v-btn>
        </div>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Agregar Photo</span>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="addPhoto()" method="POST">
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 class="text-xs-center text-sm-center text-md-center text-lg-center">
                  <v-text-field label="Select Image" @click='pickFile' v-model='imageName' prepend-icon='attach_file'></v-text-field>
                  <input
                    type="file"
                    style="display: none"
                    ref="image"
                    accept="image/*"
                    @change="onFilePicked"
                  >
                  <img :src="photo.imageUrl" height="150" v-if="photo.imageUrl"/>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-select
                    :items="animals"
                    item-text="name"
                    item-value='id_animal'
                    label="Animal"
                    required
                    v-model='photo.animal'
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
          <small>Completar todos antes de seguir</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="addPhoto()">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex' 

  export default {
    data: () => ({
      dialog: false,
      photo: {
        animal: '',
        imageFile: '',
        imageUrl: '',
      },
      imageName: '',
    }),
    computed: mapState({
      token: state => state.user.token,
      animals: state => state.animal.animals
    }),
    mounted() {
    },
    methods: {
      pickFile () {
          this.$refs.image.click ()
      },
      addPhoto(){
        let photo = this.photo
        let token = this.token
        this.$store.dispatch('image/createPhoto', {photo, token})
        this.$router.go()
      },
      onFilePicked (e) {
        const files = e.target.files
        if(files[0] !== undefined) {
          this.imageName = files[0].name
          if(this.imageName.lastIndexOf('.') <= 0) {
            return
          }
          const fr = new FileReader ()
          fr.readAsDataURL(files[0])
          fr.addEventListener('load', () => {
            this.photo.imageUrl = fr.result
            this.photo.imageFile = files[0] // this is an image file that can be sent to server...
          })
        } else {
          this.imageName = ''
          this.photo.imageFile = ''
          this.photo.imageUrl = ''
        }
      },
    }
  }
</script>