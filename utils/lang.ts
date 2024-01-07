import { localize, setLocale } from '@vee-validate/i18n'

export interface ILocales {
  [key: string]: {
    name: string
    iso: string
    flag: string
  }
}

export const availableLocales: ILocales = {
  // en: {
  //   name: 'English',
  //   iso: 'en',
  //   flag: '🇺🇸',
  // },
  ja: {
    name: '日本語',
    iso: 'ja',
    flag: '🇯🇵',
  },
  zh: {
    name: '简体中文',
    iso: 'zh',
    flag: '🇨🇳',
  },
}

export function LanguageManager() {
  // composable
  const { locale, locales, setLocale, setLocaleCookie } = useI18n()
  const localeUserSetting = useCookie('locale')

  // methods
  const getSystemLocale = (): string => {
    try {
      // console.log('getSystemLocale', locales.value)
      const foundLang = window
        ? window.navigator.language.substring(0, 2)
        : 'zh'
      return availableLocales[foundLang] ? foundLang : 'zh'
    } catch (error) {
      return 'zh'
    }
  }
  const getUserLocale = (): string =>
    localeUserSetting.value || getSystemLocale()

  // state
  const localeSetting = useState<string>('locale.setting', () =>
    getUserLocale(),
  )

  // watchers
  watch(localeSetting, (localeSetting) => {
    localeUserSetting.value = localeSetting
    locale.value = localeSetting
    setLocaleCookie(localeSetting)
    // Activate @vee-validate/i18n current localization.
    localize(localeSetting)
  })

  // init locale
  const init = () => {
    localeSetting.value = getUserLocale()
    localize(localeSetting.value)
  }
  locale.value = localeSetting.value

  // lifecycle
  onBeforeMount(() => init())

  return {
    localeSetting,
    init,
  }
}
