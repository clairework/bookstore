import axios from 'axios'
import { defineStore } from 'pinia'
import Swal from 'sweetalert2'

import debounce from 'lodash/debounce'
import statusStore from './statusStore'
const status = statusStore()
export default defineStore('cartStore', {
  state: () => ({
    cartData: {
      carts: [],
      final_total: ''
    },
    coupon_code: ''
  }),
  actions: {
    getCartList () {
      status.isBounced = true
      axios.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.cartData = res.data.data
          status.isBounced = false
        }).catch(() => {
          status.pushMsg(false, '載入', '請重新整理')
        })
    },
    updateCart (item, qty = 1) {
      if (item.qty <= 1) {
        item.qty = 1
      } else if (item.qty >= item.product.inventory) {
        item.qty = item.product.inventory
      }
      console.log(qty)
      axios.put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`, {
        data: {
          product_id: item.product.id,
          qty: Number(item.qty)
        }
      })
        .then((res) => {
          this.getCartList()
          console.log(res)
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: '已成功更新購物車',
            showConfirmButton: false,
            timer: 2000
          })
        }).catch(() => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: '更新購物車失敗',
            showConfirmButton: false,
            timer: 2000
          })
        })
    },
    delCartItem (item) {
      axios.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`)
        .then((res) => {
          this.getCartList()
          console.log(res)
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: '已成功刪除品項！',
            showConfirmButton: false,
            timer: 1000
          })
        }).catch(() => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: '刪除品項失敗！',
            showConfirmButton: false,
            timer: 1000
          })
        })
    },
    delAllCart (item) {
      status.isLoadingItem = item.id
      axios.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`)
        .then((res) => {
          status.isLoadingItem = ''
          console.log(res)
          this.getCartList()
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: '已成功刪除所有品項！',
            showConfirmButton: false,
            timer: 2000
          })
        }).catch(() => {
          status.isLoadingItem = ''
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: '刪除所有品項失敗！',
            showConfirmButton: false,
            timer: 2000
          })
        })
    },
    addToCart: debounce(function (product, qty = 1) {
      status.isLoadingItem = product.id
      console.log(status.isLoadingItem)
      let temp = this.cartData.carts.filter(item => item.product_id === product.id)
      temp = { ...temp[0] }
      const resultQty = temp.qty + qty
      if (resultQty > product.inventory) {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: '已無庫存,暫時無法訂購',
          showConfirmButton: false,
          timer: 1000
        })
        status.isLoadingItem = ''
      } else {
        axios.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, {
          data: {
            product_id: product.id,
            qty
          }
        }).then((res) => {
          this.getCartList()
          console.log(res)
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: '已成功加入購物車！',
            showConfirmButton: false,
            timer: 1000
          })
          status.isLoadingItem = ''
        }).catch(() => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: '加入購物車失敗！',
            showConfirmButton: false,
            timer: 1000
          })
        })
      }
    }, 500),
    // 直接購買
    addToCart1: debounce(function (product, qty = 1) {
      status.isLoadingItem = product.id
      console.log(status.isLoadingItem)
      let temp = this.cartData.carts.filter(item => item.product_id === product.id)
      temp = { ...temp[0] }
      const resultQty = temp.qty + qty
      if (resultQty > product.inventory) {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: '已無庫存,暫時無法訂購',
          showConfirmButton: false,
          timer: 1000
        })
        status.isLoadingItem = ''
      } else {
        axios.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, {
          data: {
            product_id: product.id,
            qty
          }
        }).then((res) => {
          this.getCartList()
          console.log(res)
          // Swal.fire({
          //   position: 'center',
          //   icon: 'success',
          //   title: '已成功加入購物車！',
          //   showConfirmButton: false,
          //   timer: 1000
          // })
          status.isLoadingItem = ''
        }).catch(() => {
          // Swal.fire({
          //   position: 'center',
          //   icon: 'error',
          //   title: '加入購物車失敗！',
          //   showConfirmButton: false,
          //   timer: 1000
          // })
        })
      }
      this.$router.push('/checkcart')
    }, 500),
    addCouponCode () {
      // console.log(this.coupon_code)
      if (this.coupon_code === '') {
        // status.pushMsg(false, '套用', '你還沒填入優惠碼呢')
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '您尚未填入優惠碼',
          showConfirmButton: false,
          timer: 2000
        })
      } else {
        axios.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/coupon`, {
          data: { code: this.coupon_code }
        })
          .then((res) => {
            this.getCartList()
            console.log(this.coupon_code)
            console.log(res)
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: '已套用優惠券',
              showConfirmButton: false,
              timer: 2000
            })
          }).catch(() => {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: '套用優惠券失敗',
              showConfirmButton: false,
              timer: 2000
            })
          })
      }
    }
    // copyCouponCode (text) {
    //   navigator.clipboard.writeText(text)
    //     .then(() => {
    //       Swal.fire({
    //         position: 'center',
    //         icon: 'success',
    //         title: '已成功領取優惠碼',
    //         showConfirmButton: false,
    //         timer: 2000
    //       })
    //       this.coupon_code = text
    //     })
    // }
  }
})
