<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="750px" transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-list-tile-title v-on="on">Editar</v-list-tile-title>
      </template>
      <v-card>
        <v-toolbar dark>
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Modificar Cliente</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat  @click="modifyClient()">Guardar</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div>
        <v-container grid-list-md>
          <v-layout row wrap>

            <v-flex xs12 sm6 md6>
              <v-text-field
              label="Nombre"
              required
              v-model="client.nameC"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <v-text-field
              label="Apellido"
              required
              v-model="client.last_nameC"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <v-text-field
              label="Email"
              required
              v-model="client.email"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <v-text-field
              label="Direccion"
              required
              v-model="client.address"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <v-text-field
              label="Telefono"
              required
              v-model="client.phone"
              ></v-text-field>
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
                    v-model="client.date_of_birth"
                    label="Fecha de Encuentro"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  ref="picker"
                  v-model="client.date_of_birth"
                  :max="new Date().toISOString().substr(0, 10)"
                  min="1950-01-01"
                  @change="save"
                ></v-date-picker>
              </v-menu>
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
      client: {
        type: Object
      },
    },
    data () {
      return {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
        date: null,
        menu: false,
      }
    },
    watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      }
    },
    computed: mapState({
      token: state => state.user.token
    }),
    methods: {
      modifyClient() {
        let client = this.client
        let token = this.token
        this.$store.dispatch('cap/modifyClient', {client, token}).then(() => {
        //this.$router.push({ path: '/clientes' })
        this.$router.go()
        })
      },
      save (date) {
        this.$refs.menu.save(date)
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