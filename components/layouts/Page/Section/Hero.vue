<script lang="ts" setup>
onMounted(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.box',
      start: 'top 20%',
      end: '+=200',
      // scrub: true,
      toggleActions: 'restart complete restart none',
    },
  })
  tl.to('.line1', {
    top: '0',
    duration: 2,
  }).to(
    '.line2',
    {
      top: '0',
      duration: 2,
    },
    '+0.25',
  )
})
</script>

<template>
  <div class="section w-full h-screen box">
    <div
      class="relative overflow-hidden w-full h-full flex place-content-center items-center"
    >
      <div class="lines">
        <div
          class="line1 absolute bg-primary left-[100px] top-[-100%] w-3 h-full"
        ></div>
        <div
          class="line2 absolute bg-gray-300 left-[120px] top-[-100%] w-3 h-full"
        ></div>
      </div>
      <slot />
    </div>
  </div>
</template>
