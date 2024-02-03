<script lang="ts" setup>
import type { Product } from 'types/shop'

// composable
const { t } = useLang()
const screen = useAwesomeScreen()

const gridview = ref(true)
const currentCategoryId = ref(0)
// compiler macro
definePageMeta({
  layout: 'page',
  middleware: ['auth', 'enable-shopping'],
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
// const searchProducts = ref<Array<Product>>([])
const searchKeyword = ref('')
// const foundProductNum = ref(0)
const isOpen = ref(false)

const searchProductsByKey = async (keyword: string): Promise<any> => {
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
    const result = await searchProductsByKey(newKeyword)

    products.value = result.hits
    // foundProductNum.value = result.nbHits
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
          <div class="grid md:grid-cols-12 gap-y-8 md:space-x-12">
            <div
              id="category_menu"
              class="col-span-12 md:col-span-3 w-full md:max-w-sm px-4 order-first lg:order-first mt-3 md:mt-8 lg:mt-0"
            >
              <div v-if="screen.higherThan('md')">
                <div class="mb-3 md:mb-12">
                  <div class="pro-sidebar-search md:mb-20 md:mt-10">
                    <div class="border relative border-solid border-gray-300">
                      <input
                        v-model="searchKeyword"
                        class="w-full h-12 text-sm py-4 pl-4 pr-16 bg-white text-dark placeholder-current focus:outline-none"
                        type="search"
                        name="search"
                        :placeholder="t('pages.mall.search_placeholder')"
                      />
                      <button
                        class="flex w-12 h-full absolute top-0 right-0 items-center justify-center text-dark text-md border-l border-solid border-gray-300"
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
              <div v-else>
                <UButton
                  block
                  color="gray"
                  class="uppercase"
                  @click="isOpen = true"
                  >Product Category</UButton
                >
                <MallMenuProductCategorySidebar
                  v-model="currentCategoryId"
                  :is-open="isOpen"
                  @update:is-open="isOpen = false"
                />
              </div>
            </div>

            <div
              id="category_products"
              class="col-span-12 md:col-span-9 order-last"
            >
              <!-- found products indicator -->
              <div class="w-full mx-auto px-4 relative">
                <div class="flex -mx-4 justify-between items-center px-4">
                  <div class="flex flex-wrap">
                    <p class="my-2 sm:my-0">
                      {{
                        t('pages.mall.found_products', { num: products.length })
                      }}
                    </p>
                  </div>

                  <div>
                    <ul class="flex shop-tab-nav flex-wrap">
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
              </div>

              <div class="col-span-12 md:col-span-9">
                <MallSectionBannerEvent />
                <MallSectionBannerSubscribe />
              </div>
              <div class="mt-10 dark:bg-gray-800 bg-gray-50 p-2">
                <client-only>
                  <div
                    v-if="gridview"
                    class="w-full grid grid-cols-2 md:grid-cols-3 gap-2"
                  >
                    <MallCardProductGrid
                      v-for="(product, idx) in products"
                      :key="idx"
                      :product="product"
                    />
                  </div>
                  <div v-else id="list" class="shop-tab-content active">
                    <div class="flex flex-wrap">
                      <MallCardProductList
                        v-for="(product, idx) in products"
                        :key="idx"
                        :product="product"
                      />
                    </div>
                  </div>
                </client-only>
                <!-- <div id="list" class="shop-tab-content" style="display: none">
                  <div class="flex flex-wrap -mb-7 -px-4"></div>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutPageSection>
  </LayoutPageWrapper>
</template>
