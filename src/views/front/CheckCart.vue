<template>
  <LoadingView class="loading" :active="isLoading">
    <div class="spinner-border text-primaryDark m-5" role="status">
    <span class="visually-hidden">Loading...</span>
    </div>
  </LoadingView>
  <div class="front-checkcart">
  <div class="bg-light window-height">
     <OrderSteps :cartData="cartData" :step="step"></OrderSteps>
       <div style="height:50px"></div>
      <div class="container">
        <div class="row">
           <!--左邊: 確認訂單 -->
            <div class="col-lg-8 pb-4">
              <div class="mb-2" style="line-height: 1.57; border-bottom: 1px solid rgba(0, 0, 0, 0.12);align-items: baseline;">
                <i class="fas fa-shopping-cart me-1 fs-3 text-gray600"></i>
                <h2 class="fs-4 fs-md-2 d-inline-block text-gray600">購物車</h2>
              </div>
              <!-- 如果購物車為空 -->
              <div class="w-100 d-flex flex-column align-items-center py-5"
              v-if="cartData.carts.length === 0">
                <i class="fa-solid fa-triangle-exclamation text-primaryDark fa-2x mb-3"></i>
                  <p class="fw-bold mb-4">購物車內沒有商品</p>
              </div>
              <div v-if="cartData.carts.length !== 0">
                <!--左邊: 購物車品項 -->
                <div class="card d-flex flex-row fs-5 shadow-sm text-gray600 bg-white border-0 d-flex justify-content-between mt-3 p-2 rounded-1">
                  <span class="w-60">名稱</span>
                  <span class="w-10">售價</span>
                  <span class="w-20 text-center">數量</span>
                  <span class="w-10">金額</span>
                </div>
                <div class="border-0" v-for="item in cartData.carts" :key="item.id">
                  <div class="card border-0 my-4 text-gray600 shadow-sm">
                      <div class="d-flex align-items-center p-3 fs-5">
                        <img class="me-2" :src="item.product.imageUrl" style="height: 110px; width:80px" :alt="item.product.title">
                        <p class="fw-bold w-50">{{ item.product.title }}</p>
                        <p class="fw-bold h-100 text-end w-25 me-5 ">{{ $filters.currency(item.product.price) }}</p>
                        <div class="text-end cart-qty w-20">
                          <input class="input-qty rounded-0 text-center fs-5"
                            type="number"
                            min="1"
                            max="30"
                            v-model.number="item.qty"
                            inputmode="numeric"
                            :disabled="isDisabled === item.id"
                            @blur="updateCart(item, item.qty)"
                          />
                       </div>
                        <p class="fw-bold text-primaryMiddle text-end w-25">{{ $filters.currency(item.total) }}</p>
                      </div>
                    <div class="delCartItem text-end pe-3" @click="delCartItem(item)" style="cursor: pointer;border-top: 1px solid rgba(0, 0, 0, 0.12);line-height:2.4rem;">
                      <i class="bi bi-trash me-2"></i>刪除
                    </div>
                  </div>
                </div>
                </div>
              </div>
              <!-- 右邊--金額與折扣資料 -->
              <div class="col-lg-4">
                <div v-if="cartData.carts.length !== 0">
                  <div class="card fw-bold border-0 p-3 shadow text-gray600 mb-5">
                        <h5 class="pb-2" style="border-bottom: 1px solid rgba(0, 0, 0, 0.12)">訂單明細</h5>
                        <p class="fs-5 text-gray800 fw-bold" :class="{'mb-3':cartData.final_total !== cartData.total}">
                        商品小計 : <span class="float-end text-gray800 fw-bold">NT$ {{ $filters.currency(cartData.total) }}</span>
                        </p>
                        <p class="text-gray800 fs-5 mb-3 " v-if="cartData.final_total !== cartData.total">折扣金額 : 
                          <span class="float-end "> {{ $filters.currency(discount_price) }}</span></p>
                        <p class="text-gray800 mb-3 fs-5"  style="border-top: 1px solid rgba(0, 0, 0, 0.12)">商品總金額:
                          <span class="float-end text-secondaryDark fs-4 "> NT${{ $filters.currency(final_total) }} </span>
                        </p>
                        <div class="text-primary rounded-2 mb-2" v-if="cartData.final_total !== cartData.total">
                          <div class="fw-bold p-2">
                          <p class="fs-5">已使用 {{ $filters.currency(Math.abs(discount_price)) }} 元優惠券</p>
                          </div>
                        </div>
                        <div class="input-group bg-primaryLight text-primary rounded-2 mb-2">
                            <div class="input-group m-3" v-if="cartData.final_total === cartData.total">
                              <input type="text" class="form-control" placeholder="輸入優惠券" v-if="cartData.final_total === cartData.total" v-model="coupon_code" aria-label="coupon" aria-describedby="coupon">
                              <button class="btn btn-primary text-white" type="button" id="coupon"
                              @click="addCoupon" :class="{'disabled':cartData.final_total !== cartData.total}">套用優惠券</button>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-secondary text-primaryDark fw-bold fs-4 px-2"
                        @click.prevent="onSubmit">來去結帳</button>
                    </div>
                </div>
              </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import OrderSteps from '@/components/front/OrderSteps'
import { mapState, mapActions } from 'pinia'
import cartStore from '@/stores/cartStore'
import statusStore from '@/stores/statusStore'
import Swal from 'sweetalert2'

export default {
  data () {
    return {
      step: 1,
      final_total: '',
      discount_price: '',
      coupon_code: '',
      title: '建立訂單',
      form: {
        user: {
          payment: '',
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      orderId: this.$route.params.id,
      resentlyViewdProducts: JSON.parse(localStorage.getItem('resentlyViewdProducts')) || []
    }
  },
  components: {
    OrderSteps
  },
  watch: {
    cartData: {
      handler () {
        this.final_total = Math.round(this.cartData.final_total)
      },
      deep: true
    },
    final_total: {
      handler () {
        this.discount_price = this.final_total - this.cartData.total
      },
      deep: true
    }
  },
  computed: {
    ...mapState(cartStore, ['cartData', 'coupon_code']),
    ...mapState(statusStore, ['isLoading'])
  },
  methods: {
    ...mapActions(cartStore, ['getCartList', 'updateCart', 'delCartItem', 'addCouponCode']),
    ...mapActions(statusStore, ['loadingEffect', 'pushMsg']),
    // 手機驗證
    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '需要正確的電話號碼'
    },
    // 送出訂單
    onSubmit () {
      this.$router.push('/checkorder')
    },
    addCoupon () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/coupon`
      const coupon = {
        code: this.coupon_code
      }
      this.isLoading = true
      this.$http.post(url, { data: coupon }).then((response) => {
        this.getCartList()
        console.log(response)
        this.isLoading = false
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '已套用優惠券!!!',
          showConfirmButton: false,
          timer: 2000
        })
      })
    },
    // 取得最近瀏覽的資料
    getResentlyViewdProducts () {
      this.resentlyViewdProducts = JSON.parse(localStorage.getItem('resentlyViewdProducts')) || []
    },
    // 清除最近瀏覽
    clearRecentlyViewed () {
      this.loadingEffect()
      localStorage.removeItem('resentlyViewdProducts')
      this.getResentlyViewdProducts()
    }
  },
  mounted () {
    this.final_total = Math.round(this.cartData.final_total)
    this.discount_price = this.final_total - this.cartData.total
    console.log(this.discount_price)
  }
}
</script>

<style lang="scss" scoped>
.min-h-25{
  min-height:100px
}
</style>
