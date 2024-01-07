<script lang="ts" setup>
import FullCalendar from '@fullcalendar/vue3'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import timeGridPlugin from '@fullcalendar/timegrid'
import googleCalendarPlugin from '@fullcalendar/google-calendar'

const { awesome } = useAppConfig()
definePageMeta({ layout: 'page' })
useHead({ titleTemplate: '', title: awesome?.name || 'Nuxt 3 Awesome Starter' })

const { socket } = useSocket()
const { t } = useLang()

const showLoading = () => {
  const dataLoading = useState<boolean>('dataLoading')
  dataLoading.value = true
}
const calendarOptions = {
  plugins: [
    timeGridPlugin,
    dayGridPlugin,
    listPlugin,
    interactionPlugin,
    googleCalendarPlugin,
  ],
  locale: 'ja',
  initialView: 'dayGridMonth',
  nowIndicator: true,
  editable: true,
  // initialEvents: [{ title: 'nice event', start: new Date() }],
  eventSources: [
    {
      googleCalendarApiKey: 'AIzaSyCV6CEALYztiOyGsadsaMNJi3xOv4vKRa4',
      googleCalendarId: 'h6j86788lgrbsode82ckpr166o@group.calendar.google.com',
      display: 'background',
    },
  ],
  eventClick: function (info: any) {
    info.jsEvent.preventDefault() // don't let the browser navigate
    console.log(info)
    console.log(info.event.title, info.event.url)
    // alert('Event: ' + info.event.title)
    // alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY)
    // alert('View: ' + info.view.type)

    // // change the border color just for fun
    info.el.style.borderColor = 'red'
    // if (info.event.url) {
    //   window.open(info.event.url)
    // }
  },
}
const date = ref(new Date())

const attrs = ref([
  {
    key: 'today',
    highlight: {
      color: 'green',
      fillMode: 'solid',
    },
    dates: new Date(),
  },
])

// const { showToast } = useSwal()
// showToast(
//   {
//     title: 'pages.index.header',
//     timer: 3000,
//   },
//   true,
// )
// const swal = inject('$swal')
// // @ts-ignore
// swal.fire({
//   title: 'hello',
//   timer: 2000,
// })

// const { socket } = useSocket()
// socket.onAny((event, ...args) => {
//   console.log('onAny event INDeX: ', event, args[0])
// })

// const storeSystem = useSystemStore()
// storeSystem.set()

// const { login } = useStrapiAuth()
// try {
//   await login({ identifier: 'lionhu2009@gmail.com', password: 'Lionhu2008' })
// } catch (e) {}

// const key = 'system'
// const role = 'public'
// export interface Setting {
//   [key: string]: any
// }

// const querySettings = `
//   query getSetting($rolename: StringFilterInput!, $key: StringFilterInput!) {
//     settings(filters: { role: $rolename, key: $key }) {
//       data {
//         attributes {
//           key
//           setting
//         }
//       }
//     }
//   }
// `

// const graphql = useStrapiGraphQL()
// const variable = {
//   rolename: {
//     eq: role,
//   },
//   key: {
//     eq: key,
//   },
// }
// await graphql<{
//   data: { settings: Array<Setting> }
// }>(querySettings, variable)
//   .then((response: any) => {
//     const { data } = response
//     console.log('data', data)
//   })
//   .catch((_error) => {
//     console.log('_error', _error)
//   })
</script>

<template>
  <LayoutPageWrapper>
    <LayoutPageSectionHero>
      <h1>{{ $t('pages.index.header') }}</h1>
    </LayoutPageSectionHero>
    <div class="app">
      <FullCalendar :options="calendarOptions" />
    </div>
    <WidgetGsapProfileList />
    <WidgetGsapGallery />
    <LayoutPageSection>
      <client-only>
        <h2>Calendar</h2>
        <VCalendar v-model="date" />
        <h2>Date Picker</h2>
        <VDatePicker v-model="date" :attributes="attrs" />

        <div class="h-screen">
          <UButton @click="showLoading">Button</UButton>
          <div class="w-full h-[120px] mt-12 text-black">
            <h1>hello {{ t('title') }}</h1>
          </div>
          <h1 class="text-4xl font-nunito text-slate-900">Nunito</h1>
          <h1 class="text-4xl font-bitter text-slate-900">Bitter</h1>
          <h1 class="text-4xl font-ubuntu text-slate-900">Ubuntu</h1>
          <h1 class="text-4xl font-sacramento text-slate-900">Sacramento</h1>
        </div>
      </client-only>
    </LayoutPageSection>
  </LayoutPageWrapper>
</template>
<style scoped lang="scss">
.app {
  width: 50%;
  font-family:
    Arial,
    Helvetica Neue,
    Helvetica,
    sans-serif;
  font-size: 14px;
}
h1 {
  color: white;
  font-weight: 400;
}

.group {
  width: 100%;
  height: auto;
  padding: 4px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: black;
  position: relative;
  &.reorder {
    flex-direction: row;
    align-items: self-end;
  }
}
</style>
