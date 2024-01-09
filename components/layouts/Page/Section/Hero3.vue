<script lang="ts" setup>
import { SplitText } from 'gsap-trial/SplitText'
import { Observer } from 'gsap/Observer'

onMounted(() => {
  const sections = document.querySelectorAll('section')
  const images = document.querySelectorAll('.bg')
  const headings = gsap.utils.toArray('.section-heading')
  const outerWrappers = gsap.utils.toArray('.outer')
  const innerWrappers = gsap.utils.toArray('.inner')
  const splitHeadings = headings.map(
    (heading: any) =>
      new SplitText(heading, {
        type: 'chars,words,lines',
        linesClass: 'clip-text',
      }),
  )
  let currentIndex = -1
  const wrap = gsap.utils.wrap(0, sections.length)

  console.log('wrap: ', wrap(0), wrap(1), wrap(2))

  let animating: any

  gsap.set(outerWrappers, { yPercent: 100 })
  gsap.set(innerWrappers, { yPercent: -100 })

  function gotoSection(index: any, direction: any) {
    index = wrap(index) // make sure it's valid
    animating = true
    const fromTop = direction === -1
    const dFactor = fromTop ? -1 : 1
    const tl = gsap.timeline({
      defaults: { duration: 1.25, ease: 'power1.inOut' },
      onComplete: (): void => {
        animating = false
      },
    })
    if (currentIndex >= 0) {
      // The first time this function runs, current is -1
      gsap.set(sections[currentIndex], { zIndex: 0 })
      tl.to(images[currentIndex], { yPercent: -15 * dFactor }).set(
        sections[currentIndex],
        { autoAlpha: 0 },
      )
    }
    gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 })
    tl.fromTo(
      [outerWrappers[index], innerWrappers[index]],
      {
        yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor),
      },
      {
        yPercent: 0,
      },
      0,
    )
      .fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
      .fromTo(
        splitHeadings[index].chars,
        {
          autoAlpha: 0,
          yPercent: 150 * dFactor,
        },
        {
          autoAlpha: 1,
          yPercent: 0,
          duration: 1,
          ease: 'power2',
          stagger: {
            each: 0.02,
            from: 'random',
          },
        },
        0.2,
      )

    currentIndex = index
  }

  Observer.create({
    type: 'wheel,touch,pointer',
    wheelSpeed: -1,
    onDown: () => !animating && gotoSection(currentIndex - 1, -1),
    onUp: () => !animating && gotoSection(currentIndex + 1, 1),
    tolerance: 10,
    preventDefault: true,
  })

  gotoSection(0, 1)
})
</script>

<template>
  <div>
    <section class="first h-screen w-full fixed top-0">
      <div class="outer w-full h-full overflow-y-hidden">
        <div class="inner w-full h-full overflow-y-hidden relative">
          <div
            class="bg one absolute w-full h-full flex place-content-center items-center top-0 bg-cover bg-center"
          >
            <h2 class="section-heading z-2 uppercase font-ubuntu">
              Scroll down
            </h2>
          </div>
        </div>
      </div>
    </section>
    <section class="second h-screen w-full fixed top-0">
      <div class="outer w-full h-full overflow-y-hidden">
        <div class="inner w-full h-full overflow-y-hidden relative">
          <div
            class="bg one absolute w-full h-full flex place-content-center items-center top-0 bg-cover bg-center"
          >
            <h2 class="section-heading z-2 uppercase font-ubuntu">
              Scroll down
            </h2>
          </div>
        </div>
      </div>
    </section>
    <section class="third h-screen w-full fixed top-0">
      <div class="outer w-full h-full overflow-y-hidden">
        <div class="inner w-full h-full overflow-y-hidden relative">
          <div
            class="bg one absolute w-full h-full flex place-content-center items-center top-0 bg-cover bg-center"
          >
            <h2 class="section-heading z-2 uppercase font-ubuntu">
              Scroll down
            </h2>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
$bg-gradient: linear-gradient(
  180deg,
  rgba(0, 0, 0, 0.6) 0%,
  rgba(0, 0, 0, 0.3) 100%
);
h2 {
  font-size: clamp(1rem, 5vw, 5rem);
  font-weight: 400;
  text-align: center;
  letter-spacing: 0.5em;
  margin-right: -0.5em;
  color: rgb(183, 181, 181);
  width: 90vw;
  max-width: 1200px;
}
.section {
  .bg {
    .clip-text {
      overflow: hidden;
    }
  }
}
.first {
  .bg {
    background-image: $bg-gradient,
      url(https://images.unsplash.com/photo-1617478755490-e21232a5eeaf?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxNzU1NjM5NA&ixlib=rb-1.2.1&q=75&w=1920);
  }
}
.second {
  .bg {
    background-image: $bg-gradient,
      url('https://images.unsplash.com/photo-1617128734662-66da6c1d3505?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxNzc3NTM3MA&ixlib=rb-1.2.1&q=75&w=1920');
  }
}

.third {
  .bg {
    background-image: $bg-gradient,
      url(https://images.unsplash.com/photo-1617438817509-70e91ad264a5?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxNzU2MDk4Mg&ixlib=rb-1.2.1&q=75&w=1920);
  }
}
</style>
