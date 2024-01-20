<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { capitalize } from '~~/utils/str'
import { useShopStore } from '~~/stores/use-shop'
import type { Product } from '~~/types/shop'
// composable
const { t } = useLang()
const gridview = ref(true)
const { rolename } = useAuth()
const currentCategoryId = ref(0)
// compiler macro
definePageMeta({
  layout: 'page',
  // middleware: ['auth', 'enable-shopping'],
})
// useHead(() => ({
//   title: capitalize(t('pages.blank.title')),
//   meta: [
//     {
//       name: 'description',
//       content: t('pages.blank.description'),
//     },
//   ],
// }))
// const storeShop = useShopStore()
const { products, loadShopSettings, getCategoryProducts } = useShop()
const searchProducts = ref<Array<Product>>([])
const searchKeyword = ref('')
const foundProductNum = ref(0)
const search_for_products = async (keyword: string): Promise<any> => {
  // console.log('searchKeyword', keyword)
  const { search } = useMeilisearch()
  const { hits, nbHits } = await search('product', keyword)
  return { hits, nbHits }
}
const selectCategory = (uid: number) => {
  // console.log('selectCategory', uid)
  searchKeyword.value = ''
}
const loadCategoryProducts = async (id: number) => {
  searchKeyword.value = ''
  console.log('index loadCategoryProducts', id)

  await getCategoryProducts(id)
}

watch([searchKeyword, currentCategoryId], async (newvals: any) => {
  console.log('watch', newvals)

  const newKeyword = newvals[0]
  const newCategoryId = newvals[1]

  if (newCategoryId > 0) {
    console.log('getCategoryProducts newCategoryId ', newCategoryId)
    getCategoryProducts(newCategoryId)
  }
  if (newKeyword.length > 1) {
    console.log('useMeilisearch newKeyword', newKeyword)
    const result = await search_for_products(newKeyword)

    searchProducts.value = result.hits
    foundProductNum.value = result.nbHits
  }
})
onMounted(() => {
  try {
    loadShopSettings()
  } catch (error) {
    console.log('load mall settings error')
  }
})
</script>

<template>
  <LayoutPageWrapper>
    <LayoutPageSection>
      <div class="md:pt-12">
        <div class="w-[90%] mx-auto">
          <div class="flex flex-wrap flex-col lg:flex-row">
            <div class="lg:w-1/4 px-4 order-last lg:order-first mt-8 lg:mt-0">
              <div>
                <div class="mb-12">
                  <div class="pro-sidebar-search mb-20 mt-10">
                    <div class="relative border border-solid border-gray-300">
                      <input
                        v-model="searchKeyword"
                        class="w-full h-12 text-sm py-4 pl-4 pr-16 bg-white text-dark placeholder-current focus:outline-none"
                        type="search"
                        name="search"
                        :placeholder="t('pages.mall.search_placeholder')"
                      />
                      <button
                        class="w-12 h-full absolute top-0 right-0 flex items-center justify-center text-dark text-md border-l border-solid border-gray-300"
                      >
                        <Icon name="material-symbols:search" />
                      </button>
                    </div>
                  </div>
                </div>

                <MallMenuProductCategory
                  v-model="currentCategoryId"
                  @select="selectCategory"
                ></MallMenuProductCategory>
              </div>
            </div>

            <div v-if="searchKeyword" class="flex-1">
              <div
                class="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0"
              >
                <div
                  class="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8"
                >
                  <div
                    class="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full"
                  >
                    <p
                      class="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800"
                    >
                      {{
                        t('pages.mall.found_products', { num: foundProductNum })
                      }}
                    </p>
                    <client-only>
                      <div
                        v-if="searchProducts.length > 0"
                        class="grid grid-cols-3 gap-3"
                      >
                        <div
                          v-for="(product, idx) in searchProducts"
                          :key="idx"
                          class="my-4 md:my-6 w-full"
                        >
                          <MallCardProductMeilisearch :product="product" />
                        </div>
                      </div>
                    </client-only>
                  </div>
                </div>
              </div>
            </div>
            <div v-else id="shoptab" class="flex-1">
              <div class="flex flex-wrap justify-between items-center px-4">
                <div class="flex flex-wrap">
                  <client-only>
                    <p class="my-2 sm:my-0">
                      {{
                        t('pages.mall.found_products', { num: products.length })
                      }}
                    </p>
                  </client-only>
                </div>

                <div>
                  <ul class="shop-tab-nav flex flex-wrap">
                    <li class="active">
                      <a
                        href="javascript:void(0);"
                        class="text-base hover:text-orange inline-block py-2 px-2"
                        @click="gridview = true"
                      >
                        <Icon name="ri:function-line" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0);"
                        class="text-base hover:text-orange inline-block py-2 px-2 ml-5"
                        @click="gridview = false"
                        ><Icon name="gridicons:list-unordered"
                      /></a>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="mt-10">
                <div id="grid" class="shop-tab-content active">
                  <div class="flex flex-wrap -mb-7 -px-4">
                    <client-only>
                      <div v-if="gridview" class="grid md:grid-cols-3 gap-4">
                        <MallCardProductGrid
                          v-for="(product, idx) in products"
                          :key="idx"
                          :product="product"
                        />
                      </div>
                      <div v-else id="list" class="shop-tab-content active">
                        <div class="flex flex-wrap -mb-7 -px-4">
                          <MallCardProductList
                            v-for="(product, idx) in products"
                            :key="idx"
                            :product="product"
                          />
                        </div>
                      </div>
                    </client-only>
                  </div>
                </div>
                <div id="list" class="shop-tab-content" style="display: none">
                  <div class="flex flex-wrap -mb-7 -px-4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutPageSection>
  </LayoutPageWrapper>
</template>
