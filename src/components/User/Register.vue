<template>
  <div id="form">
    <v-app>
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar color="blue">
                  <v-toolbar-title>Registrate</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field v-model="user.username" prepend-icon="person" name="username" label="Username" type="text"/>
                    <v-text-field v-model="user.email" prepend-icon="person" name="email" label="Email" type="text"/>
                    <v-text-field v-model="user.password" prepend-icon="lock" name="password" label="Password" type="password"/>
                    <v-text-field v-model="user.password2" prepend-icon="lock" name="password2" label="Repeat Password" type="password"/>
                    <v-card-actions>
                      <v-spacer/>
                      <v-btn color="primary" @click="register()">Registrarme</v-btn>
                    </v-card-actions>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
  export default {
    data: () => ({
      user: {
        username: '',
        email: "",
        password: '',
        password2: ""
      }
    }),
    methods: {
      register() {
        console.log('asdas')
        this.$store.dispatch("user/registerUser", this.user)
        this.$router.push({ path: '/login' })
        },
    }
  }
</script> 