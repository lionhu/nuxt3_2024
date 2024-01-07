<script lang="ts" setup>
definePageMeta({ layout: 'landing' })

onMounted(() => {
  gsap.to('.dots1', {
    yPercent: 60,
    scrollTrigger: {
      scrub: 0.3,
    },
  })

  gsap.to('.dots2', {
    xPercent: 100,
    scrollTrigger: {
      scrub: 0.3,
    },
  })

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.bg',
      pin: true,
      start: 'top top',
      end: '+=' + window.innerHeight * 2,
      scrub: 0.3,
    },
  })

  tl.to('.bg', {
    rotation: -360,
    xPercent: -100,
    yPercent: 25,
    backgroundColor: 'transparent',
    backgroundSize: '100%',
    clipPath: 'circle(50% at 50% 50%)',
  })

  tl.to('.bg', {
    yPercent: 40,
  })

  tl.to('.bg', {
    yPercent: 0,
    xPercent: -10,
    rotation: '+=10',
  })
})
</script>

<template>
  <LayoutPageWrapper class="bg-purple-600">
    <div class="bg"></div>

    <LayoutPageSectionSplit>
      <template #left>
        <div>
          <p>Hi there, I'm</p>
          <h1>Monkey D. Luffy</h1>
          <h4>
            A <a href="#">pirate</a> that desire to find the legendary treasure
            and become the Pirate King.
          </h4>
        </div>
      </template>
    </LayoutPageSectionSplit>
    <LayoutPageSectionSplit>
      <template #left>
        <img class="dots dots1" src="/images/dots.svg" />
      </template>
      <template #right>
        <p>Some info</p>
        <h2>About me</h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea
          consequuntur expedita, ipsam asperiores earum rerum porro minus
          maiores cumque praesentium sequi distinctio voluptas eligendi minima
          fuga quo quis molestias! Commodi?
        </p>
        <h3>Hobbies</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
          expedita nostrum natus quibusdam minima. At, aspernatur mollitia nihil
          eum esse corrupti reiciendis numquam adipisci voluptate suscipit
          doloremque aliquam hic quam?
        </p>
        <h3>Favourite quote</h3>
        <blockquote>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </blockquote>
      </template>
    </LayoutPageSectionSplit>
    <LayoutPageSectionSplit>
      <template #left>
        <div>
          <p>My fight</p>
          <h2>Skills</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus,
            consectetur? Quae soluta sequi quaerat ipsam expedita et placeat,
            impedit, molestiae alias tempore, facere adipisci modi fugiat
            explicabo animi non tenetur?
          </p>
          <div class="skills-box">
            <span>Gum Gum Pistol</span>
            <span>Gum-Gum Bazooka</span>
            <span>Gum-Gum Elephant Gun</span>
            <span>Gum-Gum Monkey God Gun</span>
            <span>Gum-Gum Lightning</span>
            <span>Gum-Gum Giant</span>
            <span>Gum-Gum King Cobra</span>
            <span>Gum-Gum Jet Gatling</span>
            <span>Gum-Gum Red Hawk</span>
            <span>Gum-Gum King Kong Gun</span>
          </div>
        </div>
      </template>
      <template #right>
        <img class="dots dots2" src="/images/dots2.svg" />
      </template>
    </LayoutPageSectionSplit>
  </LayoutPageWrapper>
</template>
<style lang="scss" scoped>
.bg {
  height: 100%;
  width: 50%;
  position: absolute;
  top: 0;
  right: 0;
  background-image: url(/images/luffy.webp);
  background-size: 150%;
  background-repeat: no-repeat;
  background-color: #1eed86;
  clip-path: circle(20% at 55% 50%);
  z-index: 10;
}

a {
  color: #1eed86;
}

h1 {
  font-size: 4rem;
}

h2 {
  font-size: 3rem;
}

h1,
h2 {
  font-weight: 700;
}

h1,
h2,
h3 {
  color: #fff;
}

h2:after {
  content: '';
  width: 5rem;
  border-bottom: 5px dashed #1eed86;
  display: block;
  margin-top: 0.5rem;
}

h4 {
  font-size: 1.75rem;
}

.dots {
  display: block;
  height: auto;
  position: absolute;
  z-index: 2;
  width: 80%;
}

.dots1 {
  top: -15%;
  left: 6rem;
}

.dots2 {
  top: 10%;
  right: 50%;
}

blockquote {
  font-style: italic;
  padding: 2rem;
  background: rgb(255, 255, 255, 0.1);
  border-radius: 1rem;
}

blockquote::after,
blockquote::before {
  content: '"';
  color: #1eed86;
  font-size: 2rem;
}

.skills-box span {
  display: inline-block;
  margin: 0 0.5rem 0.5rem 0;
  border: 1px solid #1eed86;
  font-size: 85%;
  padding: 0.25rem 0.75rem;
  font-weight: 300;
  border-radius: 1rem;
}
</style>
