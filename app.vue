<script lang="ts" setup>
import { AppSetup } from './utils/app'
const { awesome } = useAppConfig()

useHead({
  title: awesome.name,
  titleTemplate: `%s - ${awesome.name}`,
})

AppSetup()
</script>

<template>
  <Body
    class="antialiased duration-300 transition-colors text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-950"
  >
    <NuxtLayout>
      <NuxtLoadingIndicator :height="10" :duration="3000" :throttle="0" />
      <NuxtPage />
    </NuxtLayout>
  </Body>
</template>
