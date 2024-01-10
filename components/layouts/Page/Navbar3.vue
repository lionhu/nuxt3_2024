<script lang="ts" setup>
const { awesome } = useAppConfig()
const { parseMenuRoute, parseMenuTitle } = useNavbarParser()
const $screen = useAwesomeScreen()
const nuxtApp = useNuxtApp()
const menus = computed(
  () =>
    (awesome?.layout?.page?.navbar?.menus ||
      []) as AwesomeLayoutPageNavbarMenu[],
)
const props = defineProps({
  switchNav: {
    type: Boolean,
    default: false,
  },
})
onMounted(() => {
  const toggleHeader = () => {
    // if (width.value < 800) return
    const tlNav = gsap.timeline({
      scrollTrigger: {
        trigger: 'header',
        start: 'top top',
        end: '+60',
        scrub: true,
      },
    })

    tlNav.to('header', {
      backgroundColor: 'white',
      opacity: 0.8,
      duration: 0.25,
    })
    tlNav.to('.menu ul li a', { color: 'black', duration: 0.25 }, 0)
  }
  const mobileMenuInteraction = () => {
    const tl = gsap.timeline()
    const toggle = document.querySelector('.toggle')
    const logo = document.querySelector('.logo')
    const menu = document.querySelector('.menu')
    if (toggle && menu) {
      toggle.addEventListener('click', () => {
        toggle.classList.toggle('active')
        menu.classList.toggle('active')
      })
    }
    tl.fromTo(
      logo,
      { yPercent: -200, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1 },
      2,
    )

    tl.play()
    
    if ($screen.higherThan('md', $screen.current.value) && props.switchNav) {
      toggleHeader()
    }
  }

  mobileMenuInteraction()
})
</script>

<template>
  <header class="header_container">
    <a href="#">
      <img src="/images/nerv-logo-black.png" class="logo w-[4rem] h-auto" />
    </a>
    <span class="toggle">
      <span></span>
      <span></span>
    </span>
    <div class="menu">
      <ul>
        <li v-for="(item, i) in menus" :key="i">
          <NuxtLink
            :key="i"
            :to="parseMenuRoute(item.to)"
            v-if="item?.type === 'link'"
          >
            {{ parseMenuTitle(item?.title) }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </header>
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
  font-family: 'Oswald';
  font-weight: 400;
}

a:hover {
  text-decoration: none;
}

.header_container {
  padding-left: var(--conatinerXPadding);
  padding-right: var(--conatinerXPadding);
}

header {
  position: fixed;
  z-index: 50;
  width: 100%;
  top: 0;
  padding-top: 1.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.logo {
  width: 4rem;
  height: auto;
}

.toggle {
  width: 2rem;
  height: 1.5rem;
  cursor: pointer;
  position: relative;
}

.toggle span {
  width: 100%;
  display: block;
  border-bottom: 1px solid var(--white);
  position: absolute;
  transition:
    top 0.3s ease,
    transform 0.3s ease;
}

.toggle span:first-child {
  top: 0.4rem;
}

.toggle span:last-child {
  top: 0.9rem;
}

.toggle.active span {
  top: 0.75rem;
}

.toggle.active span:first-child {
  transform: rotate(45deg);
}

.toggle.active span:last-child {
  transform: rotate(-45deg);
}

.menu {
  position: fixed;
  top: 5rem;
  right: -15rem;
  width: 15rem;
  background: var(--darkGray);
  padding: 1rem;
  opacity: 0;
  transition:
    right 0.3s ease,
    opacity 0.3s ease;
}

.menu.active {
  right: var(--conatinerXPadding);
  opacity: 1;
}

.menu ul {
  list-style-type: none;
}

.menu ul li {
  text-transform: uppercase;
  font-weight: 300;
}

.menu ul li a {
  display: block;
  color: var(--lightGray);
  padding: 0.5rem;
  letter-spacing: 0.1rem;
  transition: color 0.3s ease;
}

.menu ul li a:hover {
  color: var(--blue);
}

.menu ul li + li {
  border-top: 1px solid var(--gray);
}

.menu ul li a.active {
  color: var(--orange);
  pointer-events: none;
}

@media (min-width: 768px) {
  :root {
    --conatinerXPadding: 2rem;
  }
}

@media (min-width: 1200px) {
  :root {
    --conatinerXPadding: 3rem;
  }

  .logo {
    width: 6rem;
  }
  .toggle {
    display: none;
  }
  .menu {
    background: transparent;
    position: static;
    top: auto;
    right: auto;
    opacity: 1;
    width: auto;
    padding: 0;
  }
  .menu ul {
    display: flex;
    gap: 3rem;
  }
  .menu ul li a {
    color: var(--white);
    padding: 0;
  }
  .menu ul li + li {
    border-top: none;
  }
}
</style>
