import { defineStore, acceptHMRUpdate, storeToRefs } from 'pinia'
import type {
  Setting,
  Category,
  Product,
  Variation,
  SimpleCartItem,
  Shoppingcart,
  DisplayCartItem,
  Order,
  CommonOrder,
  OrderFilter,
} from '~~/types/shop'
import {
  queryCategories,
  queryCategoryProducts,
  queryProduct,
  queryUserOrderDetail,
  mutationDeleteOrder,
  queryUserOrders,
} from '~~/graphql/queries/shop'
import { useAddressbookStore } from './addressbook'
// import { useIdentity } from './use-identity'

interface stateShop {
  settings: Setting | null
  categories: Array<Category<Product>>
  products: Array<Product>
  product: Product | null
  cartitems: Array<DisplayCartItem>
  order: CommonOrder | null
  orderlist: Order[]
}

export const useShopStore = defineStore('shop', {
  persist: true,
  state: (): stateShop => ({
    settings: null,
    categories: [],
    products: [],
    product: null,
    cartitems: [],
    order: null,
    orderlist: [],
  }),

  getters: {
    ORDER_STATUS_LIST(): Array<string> {
      if (this.settings) return this.settings.order_status
      return []
    },
    ORDER_DATERANGE_LIST(): Array<Record<string, string>> {
      if (this.settings) return this.settings.order_dateRange_filter
      return []
    },
    orderId(): number {
      if (!this.order) return 0
      return parseInt(this.order.id)
    },
    CategoriesWithCount(): any {
      return this.categories
        .map((category: Category) => {
          category.count = category.products.length
          return category
        })
        .filter((category) => category.count !== 0)
    },
    ValidCart(): boolean {
      return this.Qty > 0 && parseInt(this.Cart.addressbook) > 0
    },
    Qty(): number {
      if (this.cartitems.length === 0) {
        return 0
      }

      return (this.cartitems as SimpleCartItem[]).reduce(
        (total: number, item: SimpleCartItem) => total + item.qty,
        0,
      )
    },
    Total(): number {
      if (this.cartitems.length === 0) {
        return 0
      }
      return (this.cartitems as SimpleCartItem[]).reduce(
        (total: number, item: SimpleCartItem) => total + item.price * item.qty,
        0,
      )
    },
    Cart(): Shoppingcart {
      const storeAddressbook = useAddressbookStore()
      return {
        Qty: this.Qty,
        Total: this.Total,
        cartitems: this.cartitems,
        addressbook: storeAddressbook.getterSelectAddressbook
          ? storeAddressbook.getterSelectAddressbook.id
          : '0',
      }
    },
    SelectOrder(): Order {
      return this.order as Order
    },
  },

  // actions -> 状態を変更するaction(methodsに相当)
  actions: {
    empty() {
      this.categories = []
      // this.cartitems = []
      this.order = null
      this.products = []
      this.settings = null
      this.orderlist = []
    },
    emptyCart() {
      this.cartitems = []
    },
    clearSelectedOrder() {
      this.order = null
    },
    clearOrderList() {
      this.orderlist = []
    },
    setCategories(categories: Array<Category>) {
      this.categories = categories
    },
    setShopSettings(settings: Setting) {
      this.settings = settings
    },
    setCategoryProducts(products: Array<Product>) {
      this.products = products
    },
    async loadProductDetails(uid: number) {
      try {
        const graphql = useStrapiGraphQL()
        const { data } = await graphql<any>(queryProduct, {
          uid,
        })
        this.product = data.product
      } catch (error) {
        console.log('loadProductDetails error', error)
        this.product = null
      }
    },
    checkCartitemIndex(item: SimpleCartItem): number {
      return this.cartitems.length === 0
        ? -1
        : this.cartitems.findIndex(
            (_item: SimpleCartItem) =>
              _item.product.id === item.productId &&
              _item.variation.id === item.variationId,
          )
    },
    removeCartItem(item: SimpleCartItem) {
      const indexCartItem = this.checkCartitemIndex(item)
      if (indexCartItem > -1) {
        this.cartitems.splice(indexCartItem, 1)
      }
    },
    deleteCartitem(item: SimpleCartItem): number {
      const indexCartItem = this.checkCartitemIndex(item)
      if (indexCartItem > -1) {
        if (this.cartitems[indexCartItem].qty > 1) {
          this.cartitems[indexCartItem].qty--
          this.cartitems[indexCartItem].total -= item.qty * item.price
          return this.cartitems[indexCartItem].qty
        } else {
          this.removeCartItem(item)
          return 0
        }
      }
      return 0
    },
    prepareCartItem(item: SimpleCartItem): DisplayCartItem | null {
      let _item = null

      console.log('prepareCartItem', item)

      const idxProduct = this.products.findIndex(
        (_product: Product) => _product.id === item.productId,
      )
      if (idxProduct > -1) {
        const idxVariation = this.products[idxProduct].variations.findIndex(
          (_variation: Variation) => _variation.id === item.variationId,
        )
        if (idxVariation > -1) {
          _item = {
            ...item,
            product: this.products[idxProduct],
            variation: this.products[idxProduct].variations[idxVariation],
          }
        }
      }

      return _item
    },
    addCartItem(item: SimpleCartItem): number {
      const indexCartItem = this.checkCartitemIndex(item)
      const _item = this.prepareCartItem(item)
      console.log('addCartItem', indexCartItem, _item)
      if (_item) {
        if (indexCartItem > -1) {
          this.cartitems[indexCartItem].qty += item.qty
          this.cartitems[indexCartItem].total += item.qty * item.price

          return this.cartitems[indexCartItem].qty
        } else {
          this.cartitems.push(_item)
          return item.qty
        }
      }
      return 0
    },

    setOrder(_order: Order): void {
      this.order = _order
    },
    update_order_delivery_info(status: string, data: any) {
      console.log('update_order_delivery_info', status, data)
      if (this.order) {
        this.order.delivery_info = data
        this.order.status = status
      }
    },
    async loadOrder(uid: number) {
      try {
        const graphql = useStrapiGraphQL()
        const { data } = await graphql<any>(queryUserOrderDetail, {
          uid,
        })
        this.order = data.order
        return data
      } catch (error) {
        this.order = null
      }
    },
    async cancelOrder(
      orderId: string,
      isSelectedOrder: boolean = false,
      syncAttributes: Array<string> = [],
    ): Promise<boolean> {
      try {
        const client = useStrapiClient()
        const response = await client<Promise<any>>(
          `/order/${orderId}/cancelCredit`,
        )
        console.log(response)
        const { result, order } = response

        if (isSelectedOrder && syncAttributes.length > 0) {
          syncAttributes.forEach((attr) => {
            if (this.order !== null) {
              console.log('updateOrder attributes', attr)
              this.order[attr] = order[attr]
            }
          })
        }
        return response
      } catch (error) {
        return false
      }
    },
    async updateOrder(
      orderId: string,
      _data: any,
      isSelectedOrder: boolean = false,
      syncAttributes: Array<string> = [],
      syncOrderlist: boolean = false,
    ): Promise<any> {
      try {
        const client = useStrapiClient()
        const response = await client<Promise<any>>(`/orders/${orderId}`, {
          method: 'PUT',
          body: { data: _data },
        })
        const { data } = response
        if (isSelectedOrder && syncAttributes.length > 0) {
          syncAttributes.forEach((attr) => {
            if (this.order !== null) {
              console.log('updateOrder attributes', attr)
              this.order[attr] = data.attributes[attr]
            }
          })
        }
        if (syncOrderlist && syncAttributes.length > 0) {
          const idx = this.orderlist.findIndex(
            (_order) => _order.id === orderId,
          )
          if (idx > -1) {
            syncAttributes.forEach((attr: string) => {
              const temp_order: any = this.orderlist[idx]
              temp_order[attr] = data.attributes[attr]
              this.orderlist.splice(idx, 1, temp_order)
            })
          }
        }
        return response
      } catch (error) {
        return false
      }
    },
    async completeOrder(
      orderId: string,
      isSelectedOrder: boolean = false,
      syncAttributes: Array<string> = [],
    ): Promise<boolean> {
      try {
        const client = useStrapiClient()
        const response = await client<Promise<any>>(
          `/order/${orderId}/completeCredit`,
        )
        console.log(response)
        const { result, order } = response

        if (isSelectedOrder && syncAttributes.length > 0) {
          syncAttributes.forEach((attr) => {
            if (this.order !== null) {
              console.log('updateOrder attributes', attr)
              this.order[attr] = order[attr]
            }
          })
        }

        return response
      } catch (error) {
        return false
      }
    },
    // async deleteOrder(
    //   orderId: string,
    //   isSelectedOrder: boolean = false,
    //   syncOrderlist: boolean = false,
    // ): Promise<boolean> {
    //   try {
    //     const { data } = await useAsyncQuery<any>(mutationDeleteOrder, {
    //       orderId: orderId,
    //     })
    //     if (
    //       data.value &&
    //       data.value?.deleteOrder &&
    //       data.value.deleteOrder.id === orderId
    //     ) {
    //       if (syncOrderlist) {
    //         const idx = this.orderlist.findIndex(
    //           (_order) => _order.id === orderId,
    //         )
    //         console.log('idx: ' + idx)

    //         if (idx > -1) {
    //           this.orderlist.splice(idx, 1)
    //         }
    //       }
    //       return true
    //     }
    //     return false
    //   } catch (error) {
    //     console.log('delete Order Error: ' + error)
    //     return false
    //   }
    // },
    async checkUserOrder(orderId: number): Promise<boolean> {
      try {
        const client = useStrapiClient()
        const response = await client<Promise<boolean>>(
          `/order/${orderId}/check`,
        )
        return response
      } catch (error) {
        return false
      }
    },
    async orderPayCreditcard(id: number, data: any): Promise<any> {
      try {
        console.log('orderPayCreditcard', id, data)
        const client = useStrapiClient()
        const response = await client(`/order/${id}/pay`, {
          method: 'POST',
          body: { data },
        })
        console.log(response)
        return true
      } catch (error) {
        return false
      }
    },
    async placeOrder(data: any): Promise<any> {
      try {
        console.log('placeOrder', data)
        const client = useStrapiClient()
        const response = await client('/orders', {
          method: 'POST',
          body: { data },
        })
        return response
      } catch (error) {
        return { result: false, order: null }
      }
    },
    // async loadOrderList(filter: OrderFilter): Promise<void> {
    //   try {
    //     const orderlist: Order[] = []
    //     const { data } = await useAsyncQuery<any>(queryUserOrders, filter)
    //     this.orderlist = data.value ? data.value.userOrders : []
    //   } catch (error) {
    //     this.orderlist = []
    //   }
    // },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useShopStore, import.meta.hot))
