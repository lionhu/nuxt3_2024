import Swal from 'sweetalert2'
import type { paramsToast, paramsModal } from '../types/swal'
import 'sweetalert2/src/sweetalert2.scss'

export const useSwal = () => {
  const { $i18n } = useNuxtApp()
  const t = $i18n.t

  function showToast(params: paramsToast, isI18n: boolean = false) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      // timer: 3000,
      timerProgressBar: true,
      didOpen: (toast: any) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      },
    })
    Toast.fire({
      icon: params.icon || 'success',
      title: isI18n ? t(params.title) : params.title,
      timer: params.timer || 3000,
    })
  }

  return {
    showToast,
  }
}
