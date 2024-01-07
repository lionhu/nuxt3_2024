import Swal from 'sweetalert2'
import '@sweetalert2/theme-bootstrap-4'
const options = {
  reverseButtons: true,
  confirmButtonText: 'OK',
  cancelButtonText: 'Cancel',
  confirmButtonColor: '#009e91',
}
const $swal = {
  install: (Vue: any, options: any) => {
    Vue.provide('$swal', Swal.mixin(options))
  },
}
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use($swal, options)
})
