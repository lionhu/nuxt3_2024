<script setup lang="ts">
import 'floating-vue/dist/style.css'
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'
import type { Variation } from '~~/types/shop'

const breakpoints = useBreakpoints(breakpointsTailwind)

const isMobile = breakpoints.smaller('md')

const msg = ref('setup floating vue')
const count = ref(0)
const onShow = () => {
  if (count.value === 0) {
    document.body.classList.add('no-scroll')
  }
  count.value++
}
const onHide = () => {
  count.value--
  if (count.value === 0) {
    document.body.classList.remove('no-scroll')
  }
}
</script>
<template>
  <div>
    <VDropdown
      :distance="0"
      :arrow-padding="80"
      placement="top-start"
      :triggers="['hover', 'click']"
      :positioning-disabled="isMobile ? true : false"
      @apply-show="onShow()"
      @apply-hide="onHide()"
    >
      <slot name="displayText"> HoverText </slot>

      <template #popper>
        <slot name="popper"> PopperText </slot>
      </template>
    </VDropdown>
  </div>
</template>

<style>
body.no-scroll {
  overflow: hidden;
}

.v-popper__popper--no-positioning {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
}

.v-popper__popper--no-positioning .v-popper__backdrop {
  display: block;
  background: rgba(0 0 0 / 50%);
}

.v-popper__popper--no-positioning .v-popper__wrapper {
  width: 100%;
  pointer-events: auto;
  transition: transform 0.15s ease-out;
}

.v-popper__popper--no-positioning.v-popper__popper--hidden .v-popper__wrapper {
  transform: translateY(100%);
}
</style>
