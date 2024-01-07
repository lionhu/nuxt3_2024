<script setup>
// import { gsap, ScrollTrigger } from 'gsap'

definePageMeta({
  layout: 'page',
})

onMounted(() => {
  const anim = gsap.to('.box1', {
    x: 200,
    rotation: 360,
    duration: 3,
  })

  ScrollTrigger.create({
    trigger: '.box1',
    animation: anim,
    // Uncomment these to see how they affect the ScrollTrigger
    markers: true,
    id: 'box1',
    start: 'top 80%',
    end: 'top 20%',
    toggleActions: 'play pause resume reverse',
    // toggleClass: "active",
    pin: true,
    pinSpacing: false,
    scrub: 1,
    // onUpdate: self => {
    //   console.log("progress:", self.progress.toFixed(3), "direction:", self.direction, "velocity", self.getVelocity());
    // }
  })
})
</script>

<template>
  <LayoutPageWrapper :normal="false">
    <LayoutPageSectionParallax image="/images/bgs/parallax2.jpg">
      <h1 class="text-[64px] text-white uppercase font-ubuntu">
        Hello Parallax
      </h1>
    </LayoutPageSectionParallax>
    <LayoutPageSectionParallax>
      <h1 class="text-[64px] text-white uppercase font-ubuntu">
        Hello Parallax
      </h1>
    </LayoutPageSectionParallax>
    <LayoutPageSection>
      <div class="h-screen w-full flex place-content-center items-center">
        <div>
          <div class="box box1 green"></div>
          <div class="box box2 orange"></div>
          <div class="box box3 grey"></div>
        </div>
      </div>
      <div class="h-screen"></div>
    </LayoutPageSection>
  </LayoutPageWrapper>
</template>
<style lang="scss">
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
.box1 {
  margin-left: 100px;
}
</style>
