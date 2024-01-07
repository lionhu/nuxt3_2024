// import FullCalendar from '@fullcalendar/vue3'
// import interactionPlugin from '@fullcalendar/interaction'
// import dayGridPlugin from '@fullcalendar/daygrid'
// import listPlugin from '@fullcalendar/list'
// import timeGridPlugin from '@fullcalendar/timegrid'
// import googleCalendarPlugin from '@fullcalendar/google-calendar'
import { LanguageManager } from './lang'
export { gsap, ScrollTrigger, Flip } from 'gsap/all'

// export {
//   FullCalendar,
//   interactionPlugin,
//   dayGridPlugin,
//   listPlugin,
//   timeGridPlugin,
//   googleCalendarPlugin,
// }
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
