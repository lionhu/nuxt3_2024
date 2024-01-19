<script setup lang="ts">
import type { Product } from '~~/types/shop'
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['update:modelValue', 'triggerAction'])
const modelValue = useSyncProps<boolean>(props, 'modelValue', emit)

function setIsOpen(value: any) {
  emit('update:modelValue', value)
}
function TriggerAction(action: string, value: any) {
  emit('triggerAction', action, value)
}
</script>
<template>
  <div
    class="absolute left-2/4 top-2/4 transform -translate-x-2/4 -translate-y-2/4 z-10"
  >
    <ul
      class="flex items-center justify-center bg-white shadow rounded-full h-0 transition-all group-hover:h-16 duration-500 overflow-hidden"
    >
      <li class="px-4 py-2">
        <a
          href="javascript:void(0)"
          class="text-dark flex items-center justify-center text-md hover:text-orange"
          data-tippy-content="Quick View"
          aria-label="Quick View"
          @click="TriggerAction('show_details', true)"
        >
          <Icon name="ri:zoom-in-fill" />
        </a>
      </li>
      <!-- <li class="py-4 pl-7 md:py-5 md:pl-8">
        <a
          href="whishlist.html"
          class="text-dark flex items-center justify-center text-md hover:text-orange"
          data-tippy-content="Add to wishlist"
          aria-label="Add to wishlist"
        >
          <IconRi:heart-add-fill />
        </a>
      </li> -->
      <!-- <li class="py-4 pl-7 pr-7 md:py-5 md:pl-8 md:pr-8">
        <a
          href="#modal-addto-cart"
          class="text-dark flex items-center justify-center text-md hover:text-orange"
          data-tippy-content="Add to cart"
          aria-label="Add to cart"
          @click="TriggerAction('show_cart', true)"
        >
          <IconRi:shopping-bag-2-fill />
        </a>
      </li> -->
    </ul>
  </div>
</template>
