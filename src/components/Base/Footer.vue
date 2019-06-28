<template>
  <v-app id="footer" :dark="dark">
    <v-footer :inset="footer.inset" app>
      <span class="px-3">&copy; {{ new Date().getFullYear() }}</span>
      <v-flex>
        <FormAgregar/>
      </v-flex>
    </v-footer>
  </v-app>
</template>

<script>
import FormAgregar from '../Animal/FormAgregar'

export default {
  data: () => ({
    footer: {
      inset: true
    }
  }),
  components: {
    FormAgregar
  }
}
</script>
