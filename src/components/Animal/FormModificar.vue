<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="750px" transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-icon class="mr-2" color="#BDBDBD" v-on="on" @click="">
          edit
        </v-icon>
      </template>
      <v-card>
        <v-toolbar dark>
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
              <label>Lugar Encontrado:</label>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <v-text-field
              outline
              v-model="animales.place_founded"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <label>Fecha de Nacimiento:</label>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <v-menu
                ref="menu2"
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="animales.date_of_birth"
                    label="Fecha de Nacimiento"
                    readonly
                    v-on="on"
                    outline
                  ></v-text-field>
                </template>
                <v-date-picker
                  ref="picker"
                  v-model="animales.date_of_birth"
                  :max="new Date().toISOString().substr(0, 10)"
                  min="1950-01-01"
                  @change="save2"
                ></v-date-picker>
              </v-menu>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <label>Fecha Encontrado:</label>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="animales.date_founded"
                    label="Fecha de Encuentro"
                    readonly
                    v-on="on"
                    outline
                  ></v-text-field>
                </template>
                <v-date-picker
                  ref="picker"
                  v-model="animales.date_founded"
                  :max="new Date().toISOString().substr(0, 10)"
                  min="1950-01-01"
                  @change="save"
                ></v-date-picker>
              </v-menu>
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
              <label>Caracter:</label>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <v-text-field
              outline
              v-model="animales.temperamento"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <label>Video:</label>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <v-text-field
              outline
              v-model="animales.video"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <label>Cliente:</label>
            </v-flex>

            <v-flex xs12 sm6>
              <v-select
                :items="clientes"
                item-text="nameC"
                item-value='id_cap'
                label="Cliente"
                required
                v-model="animales.cap"
              ></v-select>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <label>Veterinaria:</label>
            </v-flex>

            <v-flex xs12 sm6>
              <v-select
                :items="veterinarias"
                item-text="name"
                item-value='id_veterinaria'
                label="Veterinaria"
                required
                v-model="animales.veterinaria"
              ></v-select>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <label>Imagen:</label>
            </v-flex>

            <v-flex xs12 sm6 class="text-xs-center text-sm-center text-md-center text-lg-center">
              <v-text-field v-model="imageName" @click='pickFile' prepend-icon='attach_file' ></v-text-field>
              <input
                type="file"
                style="display: none"
                ref="image"
                accept="image/*"
                @change="onFilePicked"
              >
              <img :src="animales.imageUrl" height="150" v-if="animales.imageUrl"/>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <label>Historia:</label>
            </v-flex>

            <v-flex xs12 sm6>
              <v-text-field
              outline
              v-model="animales.historia"
              ></v-text-field>
            </v-flex>

          </v-layout>
        </v-container>
        </div>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
  export default {
    props: {
      animales: {
        type: Object
      },
    },
    data () {
      return {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
        imageFile: '',
        imageUrl: '',
        imageName: this.animales.photo,
        date: null,
        date2: null,
        menu: false,
        menu2: false
      }
    },
    watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
      menu2 (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      }
    },
    computed: mapState({
      token: state => state.user.token,
      clientes: state => state.cap.clientes,
      veterinarias: state => state.veterinaria.veterinarias
    }),
    methods: {
      modifyAnimals() {
        let animales = this.animales
        let token = this.token
        this.$store
        .dispatch('animal/modifyAnimals', {animales, token})
        .then(() => {
          this.$router.push({ path: '/' })
          this.$router.go()
        })
      },
      save (date) {
        this.$refs.menu.save(date)
      },
      save2 (date2) {
        this.$refs.menu2.save(date2)
      },
      pickFile () {
        this.$refs.image.click () 
      },
      onFilePicked (e) {
        const files = e.target.files
        console.log(files)
        console.log(this.animales.photo)
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