<template>
    <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
      :color='error'
    >
      {{ text }}
      <v-btn
        color="pink"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
</template>

<script>
  export default {
    data () {
      return {
        snackbar: true,
        y: 'top',
        x: null,
        mode: '',
        timeout: 2000,
        text: 'No se encontraron animales'
      }
    }
  }
</script>