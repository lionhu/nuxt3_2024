import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { Flip } from 'gsap/Flip'
import { Observer } from 'gsap/Observer'
import { SplitText } from 'gsap-trial/SplitText'

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(
    ScrollTrigger,
    ScrollToPlugin,
    Flip,
    TextPlugin,
    Observer,
    SplitText,
  )
  return {
    provide: {
      gsap,
    },
  }
})
