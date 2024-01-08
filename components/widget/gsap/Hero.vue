<script lang="ts" setup>
// @ts-ignore
import { Flip } from 'gsap/Flip'

onMounted(() => {
  const sections: HTMLCollection = document.getElementsByTagName('section')

  Array.prototype.forEach.call(sections, (section: any) => {
    useIntersectionObserver(
      section,
      ([{ isIntersecting }], observerElement) => {
        handleIntersection(section, isIntersecting)
      },
    )
  })
  const handleIntersection = (section: any, isIntersecting: boolean) => {
    console.log('Intersection section', section)
    const tl = gsap.timeline({ paused: true })

    tl.to(
      section.querySelector('h2'),
      { text: section.dataset.title, duration: 1 },
      0.5,
    )
    tl.fromTo(
      section.querySelector('h4'),
      { y: '-100%', opacity: 0 },
      { y: 0, opacity: 1 },
      1.5,
    )
    tl.fromTo(
      section.querySelector('p'),
      { y: '100%', opacity: 0 },
      { y: 0, opacity: 1 },
      '<',
    )
    tl.fromTo(
      section.querySelector('img'),
      { filter: 'brightness(0)' },
      { filter: 'brightness(1)' },
      2,
    )
    if (isIntersecting) {
      tl.play()
    } else {
      tl.progress(0)
      section.querySelector('h2').innerText = ''
    }
  }
})
</script>

<template>
  <main>
    <section
      data-title="Kaneda's bike"
      class="h-screen w-full flex flex-col place-content-center items-center relative px-32 text-white snap-start overflow-hidden"
    >
      <div class="bg bg-pink-600 absolute inset-0 z-[-1]">
        <img src="/images/kaneda_bike.png" alt="" />
      </div>
      <h2 class="uppercase font-ubuntu text-[64px] font-bold mb-4"></h2>
      <h4 class="uppercase font-ubuntu font-bold bg-black px-4 mb-4">akira</h4>
      <p class="w-1/2 text-[0.8rem] my-0 mx-auto font-oswald">
        Kaneda's bike in "Akira" is an iconic and futuristic red motorcycle.
        It's a custom-built, high-tech machine that reflects the cyberpunk
        aesthetic of the movie. With its sleek design, unconventional shape, and
        powerful engine, Kaneda's bike is not just a mode of transportation but
        also a symbol of rebellion and freedom in the dystopian world of
        Neo-Tokyo. It plays a central role in the film, known for its impressive
        speed and agility, making it an unforgettable element of the "Akira"
        universe.
      </p>
    </section>
  </main>
</template>
<style lang="scss" scoped>
h2 {
  &::after {
    content: '_';
    animation: blink 0.5s steps(5, start) infinite;
  }
}
@keyframes blink {
  to {
    visibility: hidden;
  }
}
h4 {
  &::before {
    content: '> ';
  }
  &::after {
    content: ' <';
  }
}
</style>
