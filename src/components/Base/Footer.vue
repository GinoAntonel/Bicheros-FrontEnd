<template>
  <v-app id="footer" :dark="dark">
    <v-footer :inset="footer.inset" app>
      <span class="px-3">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    footer: {
      inset: true
    }
  })
}
</script>
