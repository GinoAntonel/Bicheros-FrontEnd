<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-icon class="mr-2" color="#BDBDBD" v-on="on" @click="">
          edit
        </v-icon>
      </template>
      <v-card>
        <v-toolbar dark  >
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Editar Animal</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat  @click="modifyAnimals()">Guardar</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="animales.name" label="Nombre" required></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="animales.race" label="Raza"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field
                v-model="animales.species"
                label="Especie"
                hint="Ej: Perro, Gato, etc"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field v-model="animales.place_founded" label="Lugar Encontrado" required></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field v-model="animales.temperament" label="Caracter" hint="Ej: Cariñoso, Agresivo, etc" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field v-model="animales.video" label="Video" required></v-text-field>
            </v-flex>
            <v-flex xs12>
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
                  ></v-text-field>
                </template>
                <v-date-picker
                  @input="menu2 = false"
                  ref="picker"
                  v-model="animales.date_of_birth"
                  :max="new Date().toISOString().substr(0, 10)"
                  min="1950-01-01"
                  @change="save2"
                ></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12>
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
            <v-flex xs12 sm6>
              <v-select
                v-model="animales.sex"
                :items="['Masculino', 'Femenino']"
                label="Genero"
                required
              ></v-select>
            </v-flex>
            <v-flex xs12 sm6>
              <v-select
                :items="clientes"
                item-text="nameC"
                item-value='id_cap'
                label="Cliente"
                required
                v-model='animales.cap'
              ></v-select>
            </v-flex>
            <v-flex xs12 sm6>
              <v-select
                :items="veterinarias"
                item-text="name"
                item-value='id_veterinaria'
                label="Veterinaria"
                required
                v-model='animales.veterinary'
              ></v-select>
            </v-flex>
            <v-flex xs12 sm6> 
              <v-text-field v-model="animales.history" label="Historia"></v-text-field>
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
    mounted() {
      console.log(this.animales.sex)
    },
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