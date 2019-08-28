<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <button v-on="on" type="button" class="v-btn v-btn--bottom v-btn--floating v-btn--fixed v-btn--right theme--dark green darken-1" style="" data-v-10ea4164="">
          <div class="v-btn__content">
            <i aria-hidden="true" class="v-icon material-icons theme--dark">add</i>
          </div>
        </button>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Agregar Animal</span>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="addAnimal()" method="POST">
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="animal.name" label="Nombre" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="animal.race" label="Raza"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="animal.species"
                    label="Especie"
                    hint="Ej: Perro, Gato, etc"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field v-model="animal.place_founded" label="Lugar Encontrado" required></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field v-model="animal.temperamento" label="Caracter" hint="Ej: Cariñoso, Agresivo, etc" required></v-text-field>
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
                        v-model="animal.date_founded"
                        label="Fecha de Encuentro"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      ref="picker"
                      v-model="animal.date_founded"
                      :max="new Date().toISOString().substr(0, 10)"
                      min="1950-01-01"
                      @change="save"
                    ></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-select
                    :items="['Masculino', 'Femenino']"
                    label="Genero"
                    required
                    v-model="animal.gender"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-select
                    :items="clientes"
                    item-text="nameC"
                    item-value='id_cap'
                    label="Cliente"
                    required
                    v-model='animal.cap'
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-select
                    :items="veterinarias"
                    item-text="name"
                    item-value='id_veterinaria'
                    label="Veterinaria"
                    required
                    v-model='animal.veterinaria'
                  ></v-select>
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
                  <img :src="animal.imageUrl" height="150" v-if="animal.imageUrl"/>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
          <small>Completar todos antes de seguir</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="addAnimal()">Guardar</v-btn>
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
      date: null,
      menu: false,
      animal: {
        name: '',
        race: '',
        date_founded: '',
        place_founded: '',
        species: '',
        gender: '',
        imageFile: '',
        imageUrl: '',
        cap: '',
        veterinaria: '',
        temperamento: ''
      },
      imageName: '',
    }),
    computed: mapState({
      token: state => state.user.token,
      clientes: state => state.cap.clientes,
      veterinarias: state => state.veterinaria.veterinarias
    }),
    watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      }
    },
    mounted() {
      let token = this.token
      let clientes = this.clientes
      this.$store.dispatch("cap/obtainClients", {token, clientes})
      this.getVeterinaria()
    },
    methods: {
      getVeterinaria(){
      let token = this.token
      let veterinarias = this.veterinarias
      this.$store.dispatch("veterinaria/obtainVeterinarias", {token, veterinarias})
      },
      addAnimal(){
        let animal = this.animal
        let token = this.token
        this.$store.dispatch('animal/createAnimal', {animal, token})
        this.$router.go()
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
            this.animal.imageUrl = fr.result
            this.animal.imageFile = files[0] // this is an image file that can be sent to server...
          })
        } else {
          this.imageName = ''
          this.animal.imageFile = ''
          this.animal.imageUrl = ''
        }
      },
      save (date) {
        this.$refs.menu.save(date)
      },
    }
  }
</script>