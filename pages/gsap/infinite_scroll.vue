<script setup>
import SplitType from 'split-type'

onMounted(() => {
  useSmoothScroll()
})
definePageMeta({
  layout: 'page',
  // link: [
  //   {
  //     rel: 'stylesheet',
  //     href: '~~/assets/gsap.scss',
  //   },
  // ],
})
let ctx0, ctx, ctx2

// const pRef = ref(null)
// const lfd = useSplitText(pRef, {
//   splitBy: 'chars',
// })
const letters = ref()

const tl = gsap.timeline()
const tl2 = gsap.timeline()
const main = ref()
const lionhubox = ref()

onMounted(() => {
  tl.to('.box1', { duration: 2, x: 100 }, 1.5)
    .to('.box2', { duration: 1, y: 200 }, '-=0.75')
    .to('.box3', { duration: 3, rotation: 360 }, '+=1')

  ctx0 = gsap.context((self) => {
    const chars = self.selector('.char')

    gsap.fromTo(
      chars,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.5,
        duration: 2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: chars,
          start: 'top 80%',
          end: 'top 20%',
          scrub: true,
        },
      },
    )
  }, letters.value)

  ctx = gsap.context((self) => {
    const boxes = self.selector('.box')
    boxes.forEach((box, index) => {
      gsap.to(box, {
        rotation: 180,
        x: 100 * index,
        duration: 2,
        scrollTrigger: {
          trigger: box,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 0.5,
          markers: true,
          toggleActions: 'play reverse restart reverse',
          toggleClass: { targets: '.jumpping-text', className: 'active_box' },
        },
      })
    })
  }, main.value)
  //   ctx2 = gsap.context((self) => {
  //     const lionhu = self.selector('.box')
  //     console.log('box: ', lionhu)
  //     gsap.to(lionhu, {
  //       rotate: 180,
  //       x: 200,
  //       duration: 2,
  //       scrollTrigger: {
  //         trigger: lionhu,
  //         start: 'bottom bottom',
  //         end: 'top 20%',
  //         scrub: true,
  //       },
  //     })
  //   }, lionhubox.value)
})

onUnmounted(() => {
  //   ctx.revert() // <- Easy Cleanup!
  // ctx2.revert()
  ctx0.revert()
})
</script>

<template>
  <LayoutPageWrapper>
    <LayoutPageSection>
      <h1 class="font-grotesk_bold">HELLO</h1>
      <div class="h-screen">
        <div class="box box1 green"></div>
        <div class="box box2 orange"></div>
        <div class="box box3 grey"></div>
      </div>
      <div ref="main" class="section flex-center column">
        <div class="box">box</div>
        <div class="box">box</div>
        <div class="box">box</div>
      </div>
      <div class="h-screen">
        <div ref="lionhubox">
          <div ref="letters">
            <div
              v-split-text="{ splitBy: 'chars' }"
              class="jumpping-text font-ubuntu font-bold text-3xl"
            >
              Nuxt!
            </div>
          </div>
          <div class="box green"></div>
        </div>
      </div>
    </LayoutPageSection>
  </LayoutPageWrapper>
</template>
<style>
.box {
  display: block;
  background-color: var(--green);
  width: 100px;
  height: 100px;
  border-radius: 10px;
  font-size: 24px;
  text-align: center;
  line-height: 100px;
}

.jumpping-text {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
}

.active_box {
  color: red !important;
}
</style>
