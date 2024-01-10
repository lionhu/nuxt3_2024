import { LanguageManager } from './lang'
export { gsap, ScrollTrigger, Flip, Observer, TextPlugin } from 'gsap/all'
export { SplitText } from 'gsap-trial/SplitText'


export function AppSetup() {
  // use language manager
  const languageManager = LanguageManager()
  // state
  const dataLoading = useState<boolean>('dataLoading', () => false)

  // watchers
  watch(dataLoading, (_dataLoading) => {
    console.log('dataLoading', _dataLoading)
  })

  // return
  return {
    languageManager,
  }
}
