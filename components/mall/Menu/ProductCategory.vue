<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { capitalize } from '~~/utils/str'
import { useShopStore } from '~~/stores/use-shop'
const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
})

// composable
const { t } = useLang()

const storeShop = useShopStore()
const { CategoriesWithCount } = storeToRefs(storeShop)

const emit = defineEmits(['update:modelValue'])
const categoryId = useSyncProps<number>(props, 'modelValue', emit)

const loadCategoryProducts = (id: any) => {
  categoryId.value = parseInt(id)
}
</script>

<template>
  <client-only>
    <div class="mb-12">
      <h4
        class="font-medium text-md lg:text-lg text-dark capitalize mb-5 dark:text-gray-400"
      >
        {{ $t('pages.mall.category') }}
      </h4>
      <ul>
        <li
          v-for="(category, idx) in CategoriesWithCount"
          :key="idx"
          class="mb-5 flex justify-between items-center transition-all hover:text-orange"
        >
          <a
            href="javascript:void(0)"
            class="w-full flex items-center justify-between text-gray-800 group"
            @click="loadCategoryProducts(category.id)"
          >
            <label
              for="checkbox-1"
              class="relative cursor-pointer text-gray-400 group-hover:(text-orange)"
              >{{ category.name }}
            </label>

            <span
              class="w-6 h-6 flex items-center cursor-pointer justify-center rounded-full bg-gray-300 text-sm group-hover:(text-white bg-orange) transition-all"
              >{{ category.count }}</span
            >
          </a>
        </li>
      </ul>
    </div>
  </client-only>
</template>
