<script setup lang="ts">
import { useTimeAgo } from '@vueuse/core'
const _props = defineProps({
  endtime: {
    type: Date,
    default: new Date(),
  },
  size: {
    type: String,
    default: 'xs',
  },
})

const timeAgo = computed(() => {
  return useTimeAgo(new Date(_props?.endtime))
})
const endtime = toRef(_props, 'endtime')

const overtime = ref(false)
const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)

setInterval(() => {
  const now = new Date().getTime()
  if (endtime.value) {
    const countDown = new Date(endtime.value).getTime()
    const distance = countDown - now
    overtime.value = !(distance > 0)

    if (distance) {
      days.value = Math.floor(distance / (1000 * 60 * 60 * 24))
      hours.value = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      )
      minutes.value = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      seconds.value = Math.floor((distance % (1000 * 60)) / 1000)
    }
  }
})
</script>
<template>
  <div v-if="!overtime">
    <div
      class="bg-primary grid grid-cols-4 gap-2 p-1 dark:text-gray-700 rounded-lg"
    >
      <div class="flex flex-wrap items-center flex-col mx-auto bg-accent">
        <span
          class="countdown__time mr-1 text-white bg-orange font-500 daysLeft"
          :class="`text-${size}`"
          >{{ days }}</span
        >
        <span
          class="countdown__text capitalize text-white font-light daysText"
          :class="`text-${size}`"
          >day</span
        >
      </div>
      <div class="flex flex-wrap items-center flex-col mx-auto">
        <span
          class="countdown__time mr-1 text-white font-500 hoursLeft"
          :class="`text-${size}`"
          >{{ hours }}</span
        >
        <span
          class="countdown__text capitalize text-white font-light hoursText"
          :class="`text-${size}`"
          >hrs</span
        >
      </div>
      <div class="flex flex-wrap items-center flex-col mx-auto">
        <span
          class="countdown__time mr-1 text-white font-500 minsLeft"
          :class="`text-${size}`"
        >
          {{ minutes }}</span
        >
        <span
          class="countdown__text capitalize text-white font-light minsText"
          :class="`text-${size}`"
        >
          Mins</span
        >
      </div>
      <div class="flex flex-wrap items-center flex-col mx-auto">
        <span
          class="countdown__time mr-1 text-white font-500 secsLeft"
          :class="`text-${size}`"
        >
          {{ seconds }}</span
        >
        <span
          class="countdown__text capitalize text-white font-light secsText"
          :class="`text-${size}`"
          >secs</span
        >
      </div>
    </div>
  </div>
  <div v-else>
    <div class="bg-gray-600 mx-auto text-white text-center font-bold text-xs">
      <p v-html="timeAgo.value"></p>
    </div>
  </div>
</template>
