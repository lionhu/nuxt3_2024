<script lang="ts" setup>
import type { PropType } from 'vue'
import type { Product, Variation } from '~~/types/shop'
import { getStrapiMedia } from '~~/utils/strapi_medias'
import { currencyJPY } from '~~/utils/str'
const _noew = new Date('2023/4/29 12:33:12')

const _modalIsopen = ref(false)
const _modalAddCartIsopen = ref(false)

const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    default: undefined,
  },
})
const hasVariation = computed(() => props.product!.variations.length > 0)
const { minProductPrice } = useShop()
</script>

<template>
  <div v-if="product" class="w-full px-4 mb-7">
    <div
      class="border border-solid border-gray-300 transition-all hover:shadow-product group relative flex flex-wrap flex-col md:flex-row "
    >
      <div class="relative overflow-hidden md:w-1/3">
        <div
          class="flex z-1 w-12 h-12 rounded-full bg-orange border-2 border-white ring-2 ring-orange absolute top-3 right-3 items-center justify-center"
        >
          <span
            class="font-medium uppercase text-sm text-white inline-block py-1 px-2 leading-none"
            >Sale</span
          >
        </div>

        <!-- <span
          class="font-medium uppercase text-sm text-black inline-block py-1 px-2 leading-none absolute top-10 right-3"
          >-11%</span
        >± -->
        <img
          class="md:absolute w-full h-auto md:object-cover"
          :src="product.imagesList.thumb"
          alt="product image"
        />
        <!-- actions start -->
        <div
          class="absolute w-full bottom-0 group-hover:opacity-0 group-hover:invisible transition-all"
        >
          <div class="bg-dark item-1 flex flex-wrap justify-evenly p-2 item-4">
            <!-- <div class="flex items-baseline text-white">
              Batin crofessor pampden
            </div> -->
            <MallWidgetCountdown :endtime="_noew" />
          </div>
        </div>

        <div
          class="absolute left-2/4 top-2/4 transform -translate-x-2/4 -translate-y-2/4 z-10"
        >
          <ul
            class="flex items-center justify-center bg-white shadow opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all ease-linear transform translate-y-4 group-hover:-translate-y-0"
          >
            <li>
              <a
                href="javascript:void(0)"
                class="text-dark flex items-center justify-center text-md hover:text-orange modal-toggle px-4 py-4"
                aria-label="quick veiw"
                data-tippy-content="Quick View"
                @click="_modalIsopen = true"
              >
                <Icon name="ri:zoom-in-fill" />
              </a>
            </li>
          </ul>
        </div>

        <!-- actions end -->

        <!-- variants start -->

        <div
          class="p-2 bg-gray-200 shadow absolute left-2 right-2 -bottom-40 group-hover:bottom-2 z-20 transition-all duration-500 ease-linear"
        >
          <ul class="flex flex-wrap items-center justify-center mb-3">
            <li class="mx-1 leading-none">
              <button class="text-sm">sm</button>
            </li>
            <li class="mx-1 leading-none">
              <button class="text-sm">l</button>
            </li>
            <li class="mx-1 leading-none">
              <button class="text-sm">m</button>
            </li>
            <li class="mx-1 leading-none">
              <button class="text-sm">xl</button>
            </li>
            <li class="mx-1 leading-none">
              <button class="text-sm">xxl</button>
            </li>
          </ul>
          <ul class="flex flex-wrap items-center justify-center">
            <li class="mx-1 leading-none">
              <button
                class="w-4 h-4 rounded-full bg-orange"
                aria-label="colors"
              ></button>
            </li>
            <li class="mx-1 leading-none">
              <button
                class="w-4 h-4 rounded-full bg-primary"
                aria-label="variants"
              ></button>
            </li>
            <li class="mx-1 leading-none">
              <button
                class="w-4 h-4 rounded-full bg-indigo-600"
                aria-label="variants"
              ></button>
            </li>
            <li class="mx-1 leading-none">
              <button
                class="w-4 h-4 rounded-full bg-dark"
                aria-label="variants"
              ></button>
            </li>
          </ul>
        </div>

        <!-- variants end -->
      </div>

      <div class="py-5 px-4 flex-1">
        <h4>
          <a
            class="block text-md hover:text-orange transition-all mb-2"
            href="#"
            >{{ product.name }}
          </a>
        </h4>
        <p
          class="text-sm h-24 overflow-y-auto"
          v-html="product.description"
        ></p>

        <h5 class="font-bold text-md leading-none text-orange mt-4 mb-4">
          <!-- <del class="font-normal text-sm mr-1 inline-block">$110.00</del
          > -->
          {{ hasVariation ? minProductPrice(product) : '' }}
          {{ hasVariation ? '~' : '' }}
        </h5>

        <ul class="flex items-center">
          <!-- <li class="mr-2">
            <a
              href="whishlist.html"
              class="text-dark flex items-center justify-center text-md hover:(text-white bg-orange border-orange transition-all) border border-solid border-dark px-4 md:px-5 py-3 leading-none dark:(text-orange bg-white) dark:hover:(text-white bg-orange)"
            >
              <IconRi:heart-add-fill />
            </a>
          </li> -->
          <li v-if="minProductPrice(product) !== '0'" class="mr-2">
            <a
              href="#modal-addto-cart"
              class="text-dark flex items-center justify-center text-md hover:(text-white bg-orange border-orange transition-all) border border-solid border-dark px-4 md:px-5 py-3 leading-none dark:(text-orange bg-white) dark:hover:(text-white bg-orange)"
              aria-label="Add to cart"
              data-tippy-content="Add to cart"
              @click="_modalIsopen = true"
            >
              <Icon name="ri:shopping-cart-fill" />
              <span class="text-sm ml-2">Add to cart</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <MallModalProductDetail v-model="_modalIsopen" :product="product" />
    <MallModalAddCart v-model="_modalAddCartIsopen" :product="product" />
  </div>
</template>
