<script lang="ts" setup>
const { awesome } = useAppConfig()
definePageMeta({ layout: 'page' })
useHead({ titleTemplate: '', title: awesome?.name || 'Nuxt 3 Awesome Starter' })

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

const { login } = useStrapiAuth()
try {
  await login({ identifier: 'lionhu2009@gmail.com', password: 'Lionhu2008' })
} catch (e) {
  console.log('strapi login error: ', e)
}

const key = 'system'
const role = 'public'
export interface Setting {
  [key: string]: any
}

const querySettings = `
  query getSetting($rolename: StringFilterInput!, $key: StringFilterInput!) {
    settings(filters: { role: $rolename, key: $key }) {
      data {
        attributes {
          key
          setting
        }
      }
    }
  }
`

const graphql = useStrapiGraphQL()
const variable = {
  rolename: {
    eq: role,
  },
  key: {
    eq: key,
  },
}
await graphql<{
  data: { settings: Array<Setting> }
}>(querySettings, variable)
  .then((response: any) => {
    const { data } = response
    console.log('data', data)
  })
  .catch((_error) => {
    console.log('_error', _error)
  })
</script>

<template>
  <div>
    <h1>{{ $t('pages.index.header') }}</h1>
  </div>
  <!-- <AwesomeWelcome :with-alert="true" /> -->
</template>
