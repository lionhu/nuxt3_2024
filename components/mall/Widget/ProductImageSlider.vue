<script lang="ts" setup>
import type { Product } from '~~/types/shop'
import { getStrapiMedia } from '~~/utils/strapi_medias'
// Import Swiper styles
import 'swiper/css'

import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

// composable
const { t } = useLang()

const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    default: undefined,
  },
})

const thumbsSwiper = ref(null)
const setThumbsSwiper = (swiper: any) => {
  thumbsSwiper.value = swiper
}
</script>

<template>
  <div class="hidden md:block">
    <Swiper
      class="w-full fixed mySwiper2"
      :style="{
        '--swiper-navigation-color': '#fff',
        '--swiper-pagination-color': '#fff',
      }"
      :space-between="10"
      :navigation="true"
      :thumbs="{ swiper: thumbsSwiper }"
      :modules="[FreeMode, Navigation, Thumbs]"
    >
      <SwiperSlide v-for="slide in product?.images" :key="slide">
        <img
          class="block mx-auto mb-6 max-h-120"
          :src="getStrapiMedia(slide.url, 'format=webp&resize=480x480&embed')"
          alt="service image"
          loading="lazy"
          height="640"
        />
      </SwiperSlide>
    </Swiper>
    <Swiper
      :space-between="4"
      :slides-per-view="3"
      :free-mode="true"
      :watch-slides-progress="true"
      :modules="[FreeMode, Navigation, Thumbs]"
      class="mySwiper"
      @swiper="setThumbsSwiper"
    >
      <SwiperSlide v-for="slide in product?.images" :key="slide">
        <img
          class="block mx-auto mb-6"
          :src="getStrapiMedia(slide.url, 'format=webp&resize=120x120&embed')"
          alt="service image"
          loading="lazy"
          height="160"
        />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style lang="scss" scoped>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

body {
  background: #000;
  color: #000;
}

.swiper {
  width: 100%;
  height: 300px;
  margin-left: auto;
  margin-right: auto;
}

.swiper-slide {
  background-size: cover;
  background-position: center;
}

.mySwiper2 {
  height: 100%;
  width: 100%;
}

.mySwiper {
  height: 80px;
  box-sizing: border-box;
  padding: 10px 0;
}

.mySwiper .swiper-slide {
  width: 25%;
  height: 100%;
  opacity: 0.4;
}

.mySwiper .swiper-slide-thumb-active {
  opacity: 1;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
