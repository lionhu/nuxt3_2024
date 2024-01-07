<script setup lang="ts">
const props = defineProps({
  image: {
    default: '/images/bgs/parallax.jpg',
    type: String,
  },
})
const section = ref()

let ctx: any

onMounted(() => {
  const getRatio = (el: any) =>
    window.innerHeight / (window.innerHeight + el.offsetHeight)

  ctx = gsap.context((self: any) => {
    const sectionBg: any = self.selector('.section_bg')

    gsap.set(sectionBg[0], {
      backgroundImage: `url(${props.image})`,
    })

    gsap.fromTo(
      sectionBg[0],
      {
        backgroundPosition: '50% 0px',
      },
      {
        backgroundPosition: () =>
          `50% ${window.innerHeight * (1 - getRatio(sectionBg[0]))}px`,
        ease: 'none',
        scrollTrigger: {
          trigger: '.section_bg',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true, // to make it responsive
        },
      },
    )
  }, section.value)
})
onUnmounted(() => {
  ctx.revert()
})
</script>

<template>
  <section ref="section">
    <div class="section_bg"></div>
    <slot />
  </section>
</template>
<style lang="scss" scoped>
section {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.section_bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
