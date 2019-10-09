<template>
  <v-app id="footer" dark>
    <v-footer :inset="footer.inset" app>
      <span class="px-3">&copy; {{ new Date().getFullYear() }}</span>
      <v-flex v-if="$router.history.current['path'] == '/'">
        <FormAgregar/>
      </v-flex>
      <v-flex v-if="$router.history.current['path'] == '/clientes'">
        <AgregarCAP/>
      </v-flex>
      <v-flex v-if="$router.history.current['path'] == '/donaciones'">
        <AgregarDonation/>
      </v-flex>
      <v-flex v-if="$router.history.current['path'] == '/monto'">
        <FormAgregarMonto/>
      </v-flex>
      <v-flex v-if="$router.history.current['path'] == '/veterinarias'">
        <AgregarVeterinaria/>
      </v-flex>
      <v-flex v-if="$router.history.current['path'].includes('/historial/') ">
        <FormAgregarHM/>
      </v-flex>
    </v-footer>
  </v-app>
</template>

<script>
import FormAgregar from '../Animal/FormAgregar'
import AgregarCAP from '../CAP/AgregarCAP'
import AgregarDonation from '../Donation/AgregarDonation'
import FormAgregarMonto from '../Monto/FormAgregarMonto'
import AgregarVeterinaria from '../Veterinaria/AgregarVeterinaria'
import FormAgregarHM from "../Historial/FormAgregarHM"
import AgregarPhoto from '../Animal/AgregarPhoto'

export default {
  data: () => ({
    footer: {
      inset: true
    }
  }),
  components: {
    FormAgregar,
    AgregarCAP,
    AgregarDonation,
    FormAgregarMonto,
    AgregarVeterinaria,
    FormAgregarHM,
    AgregarPhoto
  }
}
</script>
