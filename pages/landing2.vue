<script lang="ts" setup>
import { useIntersectionObserver } from '@vueuse/core'
definePageMeta({ layout: 'landing' })

onMounted(() => {
  const sections: HTMLCollection = document.getElementsByTagName('section')

  const handleIntersection = (section: any, isIntersecting: boolean) => {
    const tl = gsap.timeline()
    const img = section.querySelector('img')
    const title = section.querySelector('.title')
    const circle = section.querySelector('.circle')
    const title_line = section.querySelector('.title_line')
    const lines = section.querySelectorAll('p span')

    tl.fromTo(
      img,
      { x: '-150%', rotate: -360, scale: 0.5, duration: 0.5 },
      { x: 0, scale: 1, rotate: 0, duration: 0.5, ease: 'back.out(1.5)' },
    )
    tl.fromTo(
      circle,
      { y: '100%', opacity: 0, duration: 0.5 },
      { y: 0, opacity: 1, duration: 0.5 },
      0,
    )
    tl.fromTo(
      title,
      { yPercent: 150, opacity: 0, ease: 'power4', duration: 0.3 },
      { yPercent: 0, opacity: 1, ease: 'power4', duration: 0.3 },
    )
    tl.fromTo(
      title_line,
      { width: 0, ease: 'power4', duration: 0.3 },
      { width: '100%', ease: 'power4', duration: 0.3 },
    )
    tl.fromTo(
      lines,
      {
        opacity: 0,
        x: 100,
        stagger: { each: 0.1 },
        ease: 'power4',
        duration: 0.5,
      },
      {
        opacity: 1,
        x: 0,
        stagger: { each: 0.1 },
        ease: 'power4',
        duration: 0.5,
      },
    )
    if (isIntersecting) {
      tl.play()
    } else {
      tl.reverse(0)
    }
  }

  Array.prototype.forEach.call(sections, (section) => {
    useIntersectionObserver(
      section,
      ([{ isIntersecting }], observerElement) => {
        handleIntersection(section, isIntersecting)
      },
    )
  })
})
</script>

<template>
  <LayoutPageWrapper class="bg-purple-600">
    <LayoutPageSectionSplit>
      <template v-slot:main>
        <div class="circle bg-purple-600"></div>
      </template>
      <template v-slot:left>
        <div class="relative m-auto">
          <img
            src="/images/midoriya.webp"
            class="z-100 w-auto h-[80vh] block"
          />
        </div>
      </template>
      <template v-slot:right>
        <div
          class="relative w-1/2 overflow-hidden flex flex-col place-content-center items-center"
        >
          <h1 class="title text-[2rem] font-bold font-ubuntu z-10">MIDORIYA</h1>
          <span
            class="title_line absolute w-full h-[2rem] left-0 bottom-[-0.5rem] bg-purple-500"
          ></span>
        </div>
        <p>
          <span>Full name: <strong>Midoriya Izuku</strong></span>
          <span>Alias: <strong>Deku</strong></span>
          <span>Birthday: <strong>July 15</strong></span>
          <span>Age: <strong>16</strong></span>
          <span>Gender: <strong>Male</strong></span>
          <span>Height: <strong>166 cm</strong></span>
          <span>Hair color: <strong>green</strong></span>
          <span>Eye color: <strong>green</strong></span>
          <span>Quirk: <strong>One for All</strong></span>
        </p>
      </template>
    </LayoutPageSectionSplit>
    <LayoutPageSectionSplit>
      <template v-slot:main>
        <div class="circle bg-green-600"></div>
      </template>
      <template v-slot:left>
        <div class="relative m-auto">
          <img
            src="/images/midoriya.webp"
            class="z-100 w-auto h-[80vh] block"
          />
        </div>
      </template>
      <template v-slot:right>
        <div
          class="relative w-1/2 overflow-hidden flex flex-col place-content-center items-center"
        >
          <h1 class="title text-[2rem] font-bold font-ubuntu z-10">Todoroki</h1>
          <span
            class="title_line absolute w-full h-[2rem] left-0 bottom-[-0.5rem] bg-purple-500"
          ></span>
        </div>
        <p>
          <span>Full name: <strong>Todoroki Shōto</strong></span>
          <span>Alias: <strong>Shoto</strong></span>
          <span>Birthday: <strong>January 11</strong></span>
          <span>Age: <strong>16</strong></span>
          <span>Gender: <strong>Male</strong></span>
          <span>Height: <strong>176 cm</strong></span>
          <span>Hair color: <strong>white/crimson</strong></span>
          <span>Eye color: <strong>dark gray</strong></span>
          <span>Quirk: <strong>Half cold Half hot</strong></span>
        </p>
      </template>
    </LayoutPageSectionSplit>
  </LayoutPageWrapper>
</template>
<style lang="scss" scoped>
.circle {
  content: '';
  position: absolute;
  border-radius: 50%;
  width: 100vh;
  height: 100vh;
  top: 25%;
  right: 55%;
}

p {
  font-size: 1.2rem;
  span {
    display: block;
    margin-bottom: 0.3rem;
  }
}
</style>
