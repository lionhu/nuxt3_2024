<script lang="ts" setup>
// @ts-ignore
import { Flip } from 'gsap/Flip'
let lastClickedItem = -1
let lastItemTargets: any[]
const dur = 0.5
let targets: any[]

const uibutton = () => {
  console.log('uibutton')
}
onMounted(() => {
  const listitems: Array<any> = gsap.utils.toArray('.listItem')
  // console.log(listitems)
  listitems.forEach((item: any, index: number) => {
    item.addEventListener('click', (e: any) => {
      const itemTargets: any = gsap.utils.toArray(item.querySelectorAll('*'))

      targets =
        lastClickedItem > -1
          ? listitems.concat(itemTargets.concat(lastItemTargets))
          : listitems.concat(itemTargets)

      const state = Flip.getState(targets)

      if (lastClickedItem === index) {
        item.classList.toggle('expanded')
      } else {
        item.classList.toggle('expanded')
        lastClickedItem > -1 &&
          listitems[lastClickedItem].classList.remove('expanded')

        lastClickedItem = index
        lastItemTargets = itemTargets
      }

      Flip.from(state, {
        duration: dur,
        ease: 'power1.inOut',
        absolute: true, // make things position: absolute during the flip
        nested: true, // we've got nested flipping elements (more expensive processing)
        // Fade in or out the elements within the item
        onEnter: (elements) =>
          gsap.fromTo(
            elements,
            { opacity: 0 },
            { opacity: 1, duration: dur / 2, delay: dur / 2 },
          ),
        onLeave: (elements) =>
          gsap.fromTo(
            elements,
            { opacity: (i, el) => state.getProperty(el, 'opacity') },
            { opacity: 0, duration: dur / 2 },
          ),
      })
    })
  })
})
</script>

<template>
  <div class="staggered-list-content">
    <ul class="list">
      <li class="listItem">
        <div class="avatar"></div>

        <div class="description">
          <div class="line"></div>
          <div class="line"></div>
          <div class="line"></div>
        </div>

        <div class="additional-content">
          <div class="chunk"></div>
          <div class="chunk"></div>
          <div class="chunk"></div>
          <div
            class="actions flex place-content-center items-center mt-6 space-x-4"
          >
            <UButton
              icon="i-heroicons-pencil-square"
              size="sm"
              color="primary"
              variant="solid"
              label="Button"
              :trailing="false"
              class="submitBtn"
              @click.prevent="uibutton"
            />
          </div>
        </div>
      </li>

      <li class="listItem">
        <div class="avatar"></div>

        <div class="description">
          <div class="line"></div>
          <div class="line"></div>
          <div class="line"></div>
        </div>

        <div class="additional-content">
          <div class="chunk"></div>
          <div class="chunk"></div>
          <div class="chunk"></div>
        </div>
      </li>

      <li class="listItem">
        <div class="avatar"></div>

        <div class="description">
          <div class="line"></div>
          <div class="line"></div>
          <div class="line"></div>
        </div>

        <div class="additional-content">
          <div class="chunk"></div>
          <div class="chunk"></div>
          <div class="chunk"></div>
        </div>
      </li>

      <li class="listItem">
        <div class="avatar"></div>

        <div class="description">
          <div class="line"></div>
          <div class="line"></div>
          <div class="line"></div>
        </div>

        <div class="additional-content">
          <div class="chunk"></div>
          <div class="chunk"></div>
          <div class="chunk"></div>
        </div>
      </li>

      <li class="listItem">
        <div class="avatar"></div>

        <div class="description">
          <div class="line"></div>
          <div class="line"></div>
          <div class="line"></div>
        </div>

        <div class="additional-content">
          <div class="chunk"></div>
          <div class="chunk"></div>
          <div class="chunk"></div>
        </div>
      </li>

      <li class="listItem">
        <div class="avatar"></div>

        <div class="description">
          <div class="line"></div>
          <div class="line"></div>
          <div class="line"></div>
        </div>

        <div class="additional-content">
          <div class="chunk"></div>
          <div class="chunk"></div>
          <div class="chunk"></div>
        </div>
      </li>

      <li class="listItem">
        <div class="avatar"></div>

        <div class="description">
          <div class="line"></div>
          <div class="line"></div>
          <div class="line"></div>
        </div>

        <div class="additional-content">
          <div class="chunk"></div>
          <div class="chunk"></div>
          <div class="chunk"></div>
        </div>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.staggered-list-content {
  max-width: 400px;
  margin: 2rem auto;
}

.list {
  list-style-type: none;
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 0;
}
.list li + li {
  margin-top: 1rem;
}
.listItem {
  cursor: pointer;
  background-color: #d0d0d0;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem;
}

.avatar {
  width: 4rem;
  height: 4rem;
  border-radius: 100px;
  background-color: grey;
  margin-right: 2rem;
}
.listItem.expanded .avatar {
  width: 8rem;
  height: 8rem;
  margin-right: 0;
  margin-bottom: 1rem;
}

.line {
  background-color: grey;
  width: 14rem;
  border-radius: 6px;
  height: 0.5rem;
}
.line:nth-of-type(2) {
  width: 11rem;
}
.line:nth-of-type(3) {
  width: 8rem;
}
.line + .line {
  margin-top: 1rem;
}

.listItem.expanded .description {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.listItem.expanded {
  background-color: #d0d0d0;
  padding: 2rem;
  flex-direction: column;
}

.additional-content {
  width: 100%;
  margin-top: 2rem;
  display: none;

  button {
    opacity: 0;
  }
}
.listItem.expanded .additional-content {
  display: block;
  button {
    opacity: 1;
  }
}
.chunk {
  border-radius: 3px;
  background-color: gray;
  height: 5rem;
  opacity: 0;
}
.listItem.expanded {
  .chunk {
    opacity: 1;
  }
  .chunk + .chunk {
    margin-top: 1rem;
  }
}
</style>
