<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Modificar</v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat  @click="modifyAnimals()">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div>
        <v-container>
          <v-layout row wrap>

            <v-flex xs12 sm6 md6>
              <label>Nombre:</label>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <v-text-field
              outline
              v-model="animales.name"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <label>Raza:</label>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <v-text-field
              outline
              v-model="animales.race"
              ></v-text-field>

            </v-flex>
            <v-flex xs12 sm6 md6>
              <label>Fecha Encontrado:</label>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <v-text-field
              outline
              v-model="animales.date_founded"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <label>Lugar Encontrado:</label>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <v-text-field
              outline
              v-model="animales.place_founded"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <label>Especie:</label>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <v-text-field
              outline
              v-model="animales.species"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <label>Genero:</label>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <v-text-field
              outline
              v-model="animales.gender"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <label>Foto:</label>
            </v-flex>

            <v-flex xs12 sm6 class="text-xs-center text-sm-center text-md-center text-lg-center">
              <v-text-field label="Select Image" @click='pickFile' v-model='imageName' prepend-icon='attach_file'></v-text-field>
              <input
                type="file"
                style="display: none"
                ref="image"
                accept="image/*"
                @change="onFilePicked"
              >
              <img :src="animales.imageUrl" height="150" v-if="animales.imageUrl"/>
            </v-flex>
          </v-layout>
        </v-container>
        </div>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    props: {
      animales: {
        type: Number
      }
    },
    data () {
      return {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
        imageFile: '',
        imageUrl: '',
        imageName: '',
      }
    },
    methods: {
      modifyAnimals(animales) {
        this.$store.dispatch('animal/modifyAnimals', this.animales)
        // this.$router.go()
      },
      pickFile () {
        this.$refs.image.click () 
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
            this.animales.imageUrl = fr.result
            this.animales.imageFile = files[0] // this is an image file that can be sent to server...
          })
        } else {
          this.imageName = ''
          this.animales.imageFile = ''
          this.animales.imageUrl = ''
        }
      },
    }
  }
</script>