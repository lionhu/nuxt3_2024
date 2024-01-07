<script lang="ts" setup>
onMounted(() => {
  const entryAnimation = () => {
    const tl = gsap.timeline()
    tl.to('.bg', { x: 0, ease: 'power2.easeInOut', duration: 1 }, 0)
    tl.to('.strip', { x: 0, ease: 'power2.easeInOut', duration: 1 }, 0)
    tl.to('.bg', { scale: 1.01, y: 5, duration: 1, repeat: -1, yoyo: true }, 0)
    tl.to('.number', { y: 0, ease: 'power2.easeInOut', duration: 1 }, 0)
    tl.to('.heading-block', { y: 0, opacity: 1, duration: 0.75 }, 1)
    tl.to('.hero p', { y: 0, duration: 0.75 }, 1)
    tl.to('.button-group', { opacity: 1, duration: 0.75, delay: 0.25 })
    tl.to('.arrow', {
      opacity: 1,
      y: 20,
      duration: 0.5,
      delay: 0.25,
      repeat: -1,
      yoyo: true,
    })
  }

  entryAnimation()
})
</script>

<template>
  <div>
    <section class="hero fullscreen">
      <div class="bg fullscreen"></div>
      <span class="strip"></span>
      <span class="number font-audiowide">02</span>
      <div class="block container">
        <div class="heading-block">
          <h2 class="upper-text font-oswald">Eva</h2>
          <h1 class="font-audiowide">Unit 02</h1>
        </div>
        <p class="upper-text font-oswald">
          the first Evangelion built specifically<br />for combat against the
          Angels
        </p>
        <div class="button-group">
          <button class="primary">
            Tech specs &nbsp;<i class="bi bi-download"></i>
          </button>
          <button class="border">
            Audit &nbsp;<i class="bi bi-card-list"></i>
          </button>
        </div>
        <Icon name="ri:arrow-down-double-fill" class="arrow" />
      </div>
    </section>
    <div class="social">
      <a href="#">
        <Icon name="ic:sharp-facebook" class="text-4xl" />
      </a>
      <a href="#">
        <Icon name="ri:wechat-fill" class="text-4xl" />
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
img {
  display: block;
  max-width: 100%;
  height: auto;
}

a {
  text-decoration: none;
  color: var(--blue);
}

a:hover {
  text-decoration: none;
}

.upper-text {
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  font-size: var(--unit);
  line-height: 1.3;
}

.container {
  padding-left: var(--conatinerXPadding);
  padding-right: var(--conatinerXPadding);
}

.fullscreen {
  min-height: 100vh;
  width: 100%;
  display: flex;
}

button {
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 0.05rem;
  padding: 0.6rem 2rem;
  font-family: 'Oswald', sans-serif;
  overflow: hidden;
  min-width: 10rem;
  align-items: center;
  justify-content: center;
  border: none;
  line-height: 1.5;
  border-bottom-right-radius: 1rem;
  display: inline-flex;
  flex-direction: row;
  width: fit-content;
  cursor: pointer;
  border: 1px solid transparent;
  color: var(--white);
  position: relative;
  transition: color 0.5s ease;
  z-index: 1;
}

button::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 0;
  z-index: -1;
  transition: width 0.5s ease;
  background: var(--white);
}

button:hover::before {
  width: 110%;
}

button.primary {
  background: var(--black);
  border-color: var(--black);
}

button.primary:hover {
  color: var(--black);
}

button.border {
  color: var(--black);
  background: transparent;
  border-color: var(--black);
}

.button-group {
  display: flex;
  gap: 1rem;
  flex-direction: column;
}

.button-group button {
  flex: 1;
}

.hero {
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background: var(--red);
}

.number {
  font-size: 10rem;
  opacity: 0.1;
  position: absolute;
  top: 3rem;
  left: 0;
  pointer-events: none;
  z-index: 0;
  transform: translateY(-100vh);
}

.block {
  color: var(--white);
  font-weight: 400;
  display: flex;
  margin-top: auto;
  flex-direction: column;
  width: 100%;
}

.heading-block {
  transform: translateY(-50vh);
  opacity: 0;
}

.hero .button-group {
  opacity: 0;
}

.arrow {
  opacity: 0;
}

.block h2 {
  font-size: 2rem;
}

.block h1 {
  font-size: 3rem;
}

.block h1::before {
  content: '';
  width: 1rem;
  height: 2.5rem;
  background-color: var(--orange);
  margin-right: 0.5rem;
  display: inline-block;
}

.block p {
  font-weight: 200;
  margin-bottom: 2rem;
  transform: translateY(50vh);
}

.arrow {
  margin: 2rem 0;
  font-size: 2rem;
}

.social {
  position: fixed;
  bottom: 0;
  right: var(--conatinerXPadding);
  bottom: 1.5rem;
  display: flex;
}

.social a {
  color: var(--white);
  margin-left: 1rem;
  display: block;
  transition: color 0.3s ease;
}

.social a:hover {
  color: var(--blue);
}

.social .bi {
  font-size: 2rem;
}

.bg {
  position: absolute;
  top: 0;
  left: 0;
  background-image: url('/images/02-m-black.webp');
  background-size: contain;
  background-position: right bottom;
  background-repeat: no-repeat;
  background-color: var(--red);
  background-blend-mode: multiply;
  z-index: -1;
  transform: translateX(100%);
}

.strip {
  position: absolute;
  top: 0;
  right: 0;
  width: 25%;
  bottom: 0;
  background-color: var(--blue);
  mix-blend-mode: hue;
  transform: translateX(-100vw);
}

@media (min-width: 768px) {
  .button-group {
    width: fit-content;
    flex-direction: row;
  }
  .button-group button {
    flex: auto;
  }

  .bg {
    background-image: url('/images/02-t-black.webp');
  }
}

@media (min-width: 1200px) {
  .hero .number {
    font-size: 50vh;
    left: -5vh;
  }
  .block {
    margin: auto 0;
    z-index: 1;
  }
  .block h2 {
    font-size: 2.5rem;
  }
  .block h1 {
    font-size: 6rem;
  }
  .block h1:before {
    width: 2rem;
    height: 4.5rem;
  }
  .block p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    color: var(--black);
  }
  .arrow {
    position: absolute;
    bottom: 0;
    font-size: 4rem;
  }
  .bg {
    background-image: url('/images/02-d-black.webp');
  }
  .social {
    bottom: 2rem;
  }
  .social a {
    color: var(--white);
    margin-left: 1.25rem;
    display: block;
  }
}
</style>
