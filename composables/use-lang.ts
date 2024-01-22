// import { useI18n } from 'vue-i18n'

export const useLang = () => {
  // const { t } = useI18n()
  const { $i18n } = useNuxtApp()

  const t = $i18n.t
  return {
    t,
  }
}
