<script lang="ts" setup>
// @ts-ignore
import { Flip } from 'gsap/Flip'
definePageMeta({
  layout: 'landing',
})

const { awesome } = useAppConfig()

let activeItem: any = null

onMounted(() => {
  const items = gsap.utils.toArray('.item')

  items.forEach((item: any) => {
    let tl = gsap.timeline({ paused: true })

    tl.to(
      item.querySelector('p'),
      {
        opacity: 0,
        duration: 0.25,
        x: '-100%',
      },
      0,
    )
    tl.to(
      item.querySelector('.labels'),
      {
        opacity: 0,
        duration: 0.25,
        x: '-100%',
      },
      0,
    )
    tl.to(
      item.querySelectorAll('button'),
      {
        opacity: 0,
        duration: 0.25,
        y: '200%',
        display: 'none',
      },
      0,
    )
    tl.to(
      item,
      {
        borderRadius: 0,
      },
      0.25,
    )
    tl.to(
      item.querySelectorAll('h2'),
      {
        fontSize: '4vw',
      },
      0.25,
    )
    tl.to(
      item.querySelector('.bg'),
      {
        backgroundColor: item.dataset.bg,
      },
      0.25,
    )
    tl.to(
      item.querySelector('img'),
      {
        right: '32.5%',
        top: '7%',
        width: '35%',
        ease: 'linear',
        zIndex: 2,
      },
      0.25,
    )
    tl.to(
      item.querySelector('.details'),
      {
        opacity: 1,
        display: 'block',
        delay: 0.25,
      },
      1,
    )
    tl.to(
      item.querySelector('.description'),
      {
        opacity: 1,
        display: 'block',
        delay: 0.25,
      },
      1,
    )

    item.addEventListener('click', () => {
      if (activeItem === null) {
        activeItem = item
        const placeholder = document.createElement('div')
        placeholder.className = 'item placeholder'
        item.after(placeholder)
        document.body.style.overflow = 'hidden'
        tl.play()
      } else {
        activeItem = null
        tl.reverse(0)
      }

      const state = Flip.getState(item)
      item.classList.toggle('full-screen')

      Flip.from(state, {
        duration: 0.25,
        ease: 'linear',
        absolute: true,
        delay: activeItem ? 0.25 : 0.5,
        zIndex: 10,
        onComplete: () => {
          if (!activeItem) {
            document.querySelector('.placeholder')?.remove()
            document.body.style.overflow = 'auto'
          }
        },
      })
    })
  })
})
</script>

<template>
  <div>
    <section class="w-full h-screen p-16 grid grid-cols-2 md:grid-cols-3 gap-3">
      <!-- <main> -->
      <div class="item" data-bg="#4F6588">
        <h2 class="item_title">Quantum Striker</h2>
        <p class="item_p">
          Quantum Striker is a highly advanced Gundam equipped with
          quantum-based weaponry, allowing it to manipulate time and space for
          strategic advantages on the battlefield.
        </p>
        <div class="labels">
          <label>Quantum Manipulation</label>
          <label>Chrono-Blade</label>
        </div>
        <div class="details">
          <h4><span>Model number</span>RX-I01</h4>
          <h4><span>Pilot</span>Captain Leon Drakon</h4>
        </div>
        <div class="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <div class="bottom">
          <button class="primary Btn">Discover</button>
          <button class="secondary Btn">ⓘ Specification Sheet</button>
        </div>
        <img src="/images/bakugo.webp" class="itemImg" />
        <div class="bg"></div>
      </div>
      <div class="item" data-bg="#4F6588">
        <h2 class="item_title">Quantum Striker</h2>
        <p class="item_p">
          Quantum Striker is a highly advanced Gundam equipped with
          quantum-based weaponry, allowing it to manipulate time and space for
          strategic advantages on the battlefield.
        </p>
        <div class="labels">
          <label>Quantum Manipulation</label>
          <label>Chrono-Blade</label>
        </div>
        <div class="details">
          <h4><span>Model number</span>RX-I01</h4>
          <h4><span>Pilot</span>Captain Leon Drakon</h4>
        </div>
        <div class="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <div class="bottom">
          <button class="primary Btn">Discover</button>
          <button class="secondary Btn">ⓘ Specification Sheet</button>
        </div>
        <img src="/images/fantasy_gundam_4.png" />
        <div class="bg"></div>
      </div>
      <div class="item" data-bg="#4F6588">
        <h2 class="item_title">Quantum Striker</h2>
        <p class="item_p">
          Quantum Striker is a highly advanced Gundam equipped with
          quantum-based weaponry, allowing it to manipulate time and space for
          strategic advantages on the battlefield.
        </p>
        <div class="labels">
          <label>Quantum Manipulation</label>
          <label>Chrono-Blade</label>
        </div>
        <div class="details">
          <h4><span>Model number</span>RX-I01</h4>
          <h4><span>Pilot</span>Captain Leon Drakon</h4>
        </div>
        <div class="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <div class="bottom">
          <button class="primary Btn">Discover</button>
          <button class="secondary Btn">ⓘ Specification Sheet</button>
        </div>
        <img src="/images/bakugo.webp" class="itemImg" />
        <div class="bg"></div>
      </div>
      <div class="item" data-bg="#4F6588">
        <h2 class="item_title">Quantum Striker</h2>
        <p class="item_p">
          Quantum Striker is a highly advanced Gundam equipped with
          quantum-based weaponry, allowing it to manipulate time and space for
          strategic advantages on the battlefield.
        </p>
        <div class="labels">
          <label>Quantum Manipulation</label>
          <label>Chrono-Blade</label>
        </div>
        <div class="details">
          <h4><span>Model number</span>RX-I01</h4>
          <h4><span>Pilot</span>Captain Leon Drakon</h4>
        </div>
        <div class="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <div class="bottom">
          <button class="primary Btn">Discover</button>
          <button class="secondary Btn">ⓘ Specification Sheet</button>
        </div>
        <img src="/images/fantasy_gundam_4.png" />
        <div class="bg"></div>
      </div>
      <div class="item" data-bg="#4F6588">
        <h2 class="item_title">Quantum Striker</h2>
        <p class="item_p">
          Quantum Striker is a highly advanced Gundam equipped with
          quantum-based weaponry, allowing it to manipulate time and space for
          strategic advantages on the battlefield.
        </p>
        <div class="labels">
          <label>Quantum Manipulation</label>
          <label>Chrono-Blade</label>
        </div>
        <div class="details">
          <h4><span>Model number</span>RX-I01</h4>
          <h4><span>Pilot</span>Captain Leon Drakon</h4>
        </div>
        <div class="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <div class="bottom">
          <button class="primary Btn">Discover</button>
          <button class="secondary Btn">ⓘ Specification Sheet</button>
        </div>
        <img src="/images/bakugo.webp" class="itemImg" />
        <div class="bg"></div>
      </div>
      <div class="item" data-bg="#4F6588">
        <h2 class="item_title">Quantum Striker</h2>
        <p class="item_p">
          Quantum Striker is a highly advanced Gundam equipped with
          quantum-based weaponry, allowing it to manipulate time and space for
          strategic advantages on the battlefield.
        </p>
        <div class="labels">
          <label>Quantum Manipulation</label>
          <label>Chrono-Blade</label>
        </div>
        <div class="details">
          <h4><span>Model number</span>RX-I01</h4>
          <h4><span>Pilot</span>Captain Leon Drakon</h4>
        </div>
        <div class="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <div class="bottom">
          <button class="primary Btn">Discover</button>
          <button class="secondary Btn">ⓘ Specification Sheet</button>
        </div>
        <img src="/images/fantasy_gundam_4.png" />
        <div class="bg"></div>
      </div>
      <div class="item" data-bg="#4F6588">
        <h2 class="item_title">Quantum Striker</h2>
        <p class="item_p">
          Quantum Striker is a highly advanced Gundam equipped with
          quantum-based weaponry, allowing it to manipulate time and space for
          strategic advantages on the battlefield.
        </p>
        <div class="labels">
          <label>Quantum Manipulation</label>
          <label>Chrono-Blade</label>
        </div>
        <div class="details">
          <h4><span>Model number</span>RX-I01</h4>
          <h4><span>Pilot</span>Captain Leon Drakon</h4>
        </div>
        <div class="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <div class="bottom">
          <button class="primary Btn">Discover</button>
          <button class="secondary Btn">ⓘ Specification Sheet</button>
        </div>
        <img src="/images/fantasy_gundam_4.png" />
        <div class="bg"></div>
      </div>
      <div class="item" data-bg="#4F6588">
        <h2 class="item_title">Quantum Striker</h2>
        <p class="item_p">
          Quantum Striker is a highly advanced Gundam equipped with
          quantum-based weaponry, allowing it to manipulate time and space for
          strategic advantages on the battlefield.
        </p>
        <div class="labels">
          <label>Quantum Manipulation</label>
          <label>Chrono-Blade</label>
        </div>
        <div class="details">
          <h4><span>Model number</span>RX-I01</h4>
          <h4><span>Pilot</span>Captain Leon Drakon</h4>
        </div>
        <div class="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <div class="bottom">
          <button class="primary Btn">Discover</button>
          <button class="secondary Btn">ⓘ Specification Sheet</button>
        </div>
        <img src="/images/fantasy_gundam_4.png" />
        <div class="bg"></div>
      </div>
      <div class="item" data-bg="#4F6588">
        <h2 class="item_title">Quantum Striker</h2>
        <p class="item_p">
          Quantum Striker is a highly advanced Gundam equipped with
          quantum-based weaponry, allowing it to manipulate time and space for
          strategic advantages on the battlefield.
        </p>
        <div class="labels">
          <label>Quantum Manipulation</label>
          <label>Chrono-Blade</label>
        </div>
        <div class="details">
          <h4><span>Model number</span>RX-I01</h4>
          <h4><span>Pilot</span>Captain Leon Drakon</h4>
        </div>
        <div class="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <div class="bottom">
          <button class="primary Btn">Discover</button>
          <button class="secondary Btn">ⓘ Specification Sheet</button>
        </div>
        <img src="/images/fantasy_gundam_4.png" />
        <div class="bg"></div>
      </div>
      <div class="item" data-bg="#4F6588">
        <h2 class="item_title">Quantum Striker</h2>
        <p class="item_p">
          Quantum Striker is a highly advanced Gundam equipped with
          quantum-based weaponry, allowing it to manipulate time and space for
          strategic advantages on the battlefield.
        </p>
        <div class="labels">
          <label>Quantum Manipulation</label>
          <label>Chrono-Blade</label>
        </div>
        <div class="details">
          <h4><span>Model number</span>RX-I01</h4>
          <h4><span>Pilot</span>Captain Leon Drakon</h4>
        </div>
        <div class="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <div class="bottom">
          <button class="primary Btn">Discover</button>
          <button class="secondary Btn">ⓘ Specification Sheet</button>
        </div>
        <img src="/images/fantasy_gundam_4.png" />
        <div class="bg"></div>
      </div>
      <!-- </main> -->
    </section>
  </div>
</template>
<style lang="scss" scoped>
.lionhu {
  position: relative;
  padding-left: 10px;
  &::before {
    content: '';
    background-color: red;
    left: 2px;
    top: 0;
    bottom: 0;
    width: 10px;
    position: absolute;
  }
}
.item {
  height: 32vw;
  border-radius: 2vw;
  overflow: hidden;
  position: relative;
  padding: 2vw;
  color: #fff;
  display: flex;
  flex-direction: column;
  border-bottom: 0 solid #333;
  cursor: pointer;
}

.item h2 {
  font-size: 2vw;
  margin-bottom: 1.5vw;
  font-weight: 700;
}

.item p {
  width: 50%;
  font-weight: 300;
  font-size: 1vw;
  margin-bottom: 2vw;
  color: #333;
}

.item .labels {
  width: 50%;
}

.item .labels label {
  border: 1px solid #fff;
  font-size: 0.8vw;
  padding: 0.5vw 1vw;
  border-radius: 2vw;
  display: inline-block;
  margin-bottom: 0.7vw;
}

.item .details {
  display: none;
  opacity: 0;
  position: absolute;
  top: 20%;
  left: 2vw;
  font-weight: 300;
}

.item .details h4 {
  font-size: 2vw;
  font-weight: 700;
  margin-bottom: 1vw;
}

.item .details h4 span {
  font-weight: 400;
  display: block;
  opacity: 0.6;
}

.item .description {
  display: none;
  opacity: 0;
  position: absolute;
  bottom: 15%;
  right: 2vw;
  width: 30vw;
  font-size: 1vw;
  font-weight: 300;
  color: #ddd;
}

.item .bottom {
  margin-top: auto;
  display: flex;
  gap: 1vw;
}

.item img {
  position: absolute;
  top: 2vw;
  right: -3vw;
  width: 20vw;
  height: auto;
  z-index: -1;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
}

.item .bg {
  background-color: #b1c5ca;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
}

.item.full-screen {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

button {
  cursor: pointer;
  outline: none;
  border: none;
  padding: 0.8vw 1.6vw;
  border-radius: 2vw;
  font-size: 1.2vw;
  font-family: 'DM Sans', sans-serif;
}

button.primary {
  background-color: #fff;
  color: #000;
  font-weight: 700;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

button.primary:hover {
  background-color: #000;
  color: #fff;
}

button.secondary {
  background-color: transparent;
  color: #fff;
  font-weight: 500;
}
</style>
