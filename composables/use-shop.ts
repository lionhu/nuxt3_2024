import Swal from 'sweetalert2'
import { storeToRefs } from 'pinia'
import type {
  Setting,
  Product,
  Variation,
  Order,
  OrderFilter,
} from '../types/shop'
import { currencyJPY } from '../utils/str'
import { useShopStore } from '../stores/use-shop'
import {
  queryCategories,
  queryCategoryProducts,
  queryProduct,
  queryUserOrderDetail,
  mutationDeleteOrder,
  queryUserOrders,
} from '../graphql/queries/shop'

import { querySettings } from '../graphql/queries/system'

export const useShop = () => {
  const storeShop = useShopStore()
  const router = useRouter()
  const { showToast } = useSwal()
  const dataLoading = useState<boolean>('showDataLoading')
  const showQuickview = ref(false)
  const { t } = useLang()
  const {
    categories,
    settings,
    cartitems,
    products,
    order,
    orderlist,
    SelectOrder,
    Total,
    Qty,
    ORDER_STATUS_LIST,
    ORDER_DATERANGE_LIST,
  } = storeToRefs(storeShop)

  async function getCategories() {
    try {
      const graphql = useStrapiGraphQL()
      const { data } = await graphql<any>(queryCategories)
      storeShop.setCategories(data.categories || [])
    } catch (error) {
      console.log('load categories error', error)
    }
  }
  async function getShopSetting(role: string = 'public', key: string = 'mall') {
    try {
      const graphql = useStrapiGraphQL()
      const variable = {
        rolename: {
          eq: role,
        },
        key: {
          eq: key,
        },
      }
      await graphql<{
        data: { settings: Array<Setting> }
      }>(querySettings, variable).then((response: any) => {
        const { data } = response

        const settings = data.settings.length ? data.settings[0].setting : null
        storeShop.setShopSettings(settings)
      })
    } catch (error) {
      console.log('load_SYSTEM_Setting error', error)
    }
  }
  function loadShopSettings() {
    try {
      const user = useStrapiUser()
      const rolename = user?.value
        ? (user?.value?.rolename as string).toLowerCase()
        : 'public'
      getCategories()
      getShopSetting(rolename)
    } catch (error) {}
    // await storeShop.initShop()
  }
  async function getCategoryProducts(uid: number) {
    dataLoading.value = true
    try {
      const graphql = useStrapiGraphQL()
      const { data } = await graphql<any>(queryCategoryProducts, {
        uid,
      })
      storeShop.setCategoryProducts(data.products)
    } catch (error) {
      storeShop.setCategoryProducts([])
    }
    dataLoading.value = false
  }

  function emptyCart() {
    storeShop.emptyCart()
    router.push('/mall')
  }
  function clearSelectedOrder() {
    storeShop.clearSelectedOrder()
  }
  function clearOrderList() {
    storeShop.clearOrderList()
  }

  async function getProduct(uid: number) {
    dataLoading.value = true
    try {
      await storeShop.loadProductDetails(uid)
    } catch (error) {
      console.log('getProduct error', error)
    }
    dataLoading.value = false
  }
  async function loadOrderList(filter: OrderFilter): Promise<void> {
    dataLoading.value = true
    try {
      const result = await storeShop.loadOrderList(filter)
    } catch (error) {
      console.log('placeOrder error', error)
    }
    dataLoading.value = false
  }
  async function placeOrder(data: any): Promise<any> {
    dataLoading.value = true
    try {
      const result = await storeShop.placeOrder(data)
      dataLoading.value = false
      return result
    } catch (error) {
      console.log('placeOrder error', error)
    }
    dataLoading.value = false
  }
  async function getOrderDetail(uid: number) {
    dataLoading.value = true
    try {
      const result = await storeShop.loadOrder(uid)
    } catch (error) {
      console.log('getOrderDetail error', error)
    }
    dataLoading.value = false
  }
  async function orderPayCreditcard(orderId: number, data: any): Promise<any> {
    try {
      const result = await storeShop.orderPayCreditcard(orderId, data)
      return result
    } catch (error) {
      console.log('orderPayCreditcard error: ', error)
      return false
    }
  }
  async function checkUserOrder(orderId: number): Promise<boolean> {
    try {
      const result = await storeShop.checkUserOrder(orderId)
      return result
    } catch (error) {
      console.log('checkUserOrder error: ', error)
      return false
    }
  }
  function deleteOrder(
    orderId: string = '',
    isSelectedOrder: boolean = false,
    syncOrderlist: boolean = false,
  ) {
    // return true
    // if(parseInt(orderId)>0)
    try {
      return Swal.fire({
        icon: 'warning',
        title: t('apps.mall.pages.order.sure_to_delete'),
        showCancelButton: true,
        confirmButtonText: t('buttons.delete'),
      }).then(async (res: any) => {
        /* Read more about isConfirmed, isDenied below */
        let response = null
        if (res.isConfirmed) {
          response = await storeShop.deleteOrder(
            orderId,
            isSelectedOrder,
            syncOrderlist,
          )
        }
        if (response) {
          showToast({
            icon: 'success',
            title: 'successfully done!',
            timer: 3000,
          })
        }
        return response
      })
    } catch (error) {
      console.log('deleteOrder error: ', error)
      return false
    }
  }
  async function completeOrder(orderId: string): Promise<boolean> {
    dataLoading.value = true
    try {
      const result = await storeShop.completeOrder(orderId)
      dataLoading.value = false
      return result
    } catch (error) {
      console.log('completeOrder error: ', error)
      dataLoading.value = false
      return false
    }
  }
  async function updateOrder(
    orderId: string,
    data: any,
    isSelectedOrder: boolean = false,
    syncAttributes: Array<string> = [],
    syncOrderlist: boolean = false,
  ): Promise<any> {
    try {
      const result = await storeShop.updateOrder(
        orderId,
        data,
        isSelectedOrder,
        syncAttributes,
        syncOrderlist,
      )
      return result
    } catch (error) {
      console.log('updateOrder error: ', error)
      return false
    }
  }
  async function cancelOrder(orderId: string): Promise<boolean> {
    try {
      const result = await storeShop.cancelOrder(orderId)
      return result
    } catch (error) {
      console.log('cancelOrder error: ', error)
      return false
    }
  }
  function minProductPrice(product: Product) {
    if (product!.variations.length === 1) return product!.variations[0].price
    const sortedPrices = product!.variations
      .map((v: Variation) => v.price)
      .sort((a: number, b: number) => a - b)

    return currencyJPY(sortedPrices[0])
  }
  function confirmOrderStatus(
    orderId: string,
    status: string,
    isSelectedOrder: boolean = false,
    syncOrderlist: boolean = false,
  ) {
    Swal.fire({
      icon: 'warning',
      title: `Confirm Order # ${orderId}`,
      showCancelButton: true,
      confirmButtonText: 'Go!',
      showLoaderOnConfirm: true,
      preConfirm: async (login: string) => {
        try {
          const { data } = await updateOrder(
            orderId,
            {
              status,
            },
            isSelectedOrder,
            ['status'],

            syncOrderlist,
          )

          if (data.id === orderId)
            Swal.fire({
              icon: 'success',
              title: `Update successfully!`,
            })
        } catch (error) {
          Swal.showValidationMessage(`Request failed: ${error}`)
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    })
  }

  function changeOrderStatus(orderId: string) {
    Swal.fire({
      icon: 'warning',
      title: `Change Order # ${orderId} status`,
      input: 'select',
      inputOptions: {
        NEW: 'NEW',
        CONFIRMED: 'CONFIRMED',
        PROCESSING: 'PROCESSING',
        PROCESSED: 'PROCESSED',
        COMPLETE: 'COMPLETE',
      },
      inputPlaceholder: 'Select a fruit',
      showCancelButton: true,
      confirmButtonText: 'Go!',
      showLoaderOnConfirm: true,
      preConfirm: async (selection: string) => {
        try {
          const { data } = await updateOrder(
            orderId,
            {
              status: selection,
            },
            true,
            ['status'],
          )
          if (data.id === orderId)
            Swal.fire({
              icon: 'success',
              title: `Update successfully!`,
            })
        } catch (error) {
          Swal.showValidationMessage(`Request failed: ${error}`)
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    })
  }

  function changeCreditCardPaymentStatus(orderId: string) {
    Swal.fire({
      icon: 'warning',
      title: `Change Payment # ${orderId} status`,
      input: 'select',
      inputOptions: {
        CANCELED: 'CANCELED',
        COMPLETED: 'COMPLETED',
      },
      inputPlaceholder: 'Select a fruit',
      showCancelButton: true,
      confirmButtonText: 'Go!',
      showLoaderOnConfirm: true,
      preConfirm: async (selection: string) => {
        try {
          let response: any = null
          if (selection === 'CANCELED')
            response = await storeShop.cancelOrder(orderId, true, [
              'payment_info',
            ])
          if (selection === 'COMPLETED')
            response = await storeShop.completeOrder(orderId, true, [
              'payment_info',
            ])

          const { result, order } = response

          if (result)
            Swal.fire({
              icon: 'success',
              title: `Update successfully!`,
            })
        } catch (error) {
          Swal.showValidationMessage(`Request failed: ${error}`)
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    })
  }
  return {
    categories,
    settings,
    products,
    cartitems,
    minProductPrice,
    Total,
    Qty,
    ORDER_STATUS_LIST,
    ORDER_DATERANGE_LIST,

    emptyCart,
    getCategories,
    getCategoryProducts,
    getProduct,
    placeOrder,
    orderPayCreditcard,

    checkUserOrder,
    getOrderDetail,

    deleteOrder,
    completeOrder,
    cancelOrder,
    updateOrder,
    // updateOrderInfo,

    showQuickview,

    loadShopSettings,
    order,
    orderlist,
    SelectOrder,

    loadOrderList,
    clearSelectedOrder,
    clearOrderList,
    confirmOrderStatus,
    changeOrderStatus,
    changeCreditCardPaymentStatus,
  }
}
