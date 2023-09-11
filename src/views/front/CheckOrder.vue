<template>
  <LoadingView class="loading" :active="isLoading">
    <div class="spinner-border text-primaryDark m-5" role="status">
    <span class="visually-hidden">Loading...</span>
    </div>
  </LoadingView>
  <div class="front-check">
  <div class="bg-light">
     <OrderSteps :cartData="cartData" :step="step"></OrderSteps>
       <div style="height:50px"></div>
      <div class="container">
        <div class="row">
           <!--左邊: 確認訂單 -->
            <div class="col-lg-8 pb-4">
              <div class="mb-2" style="line-height: 1.57; border-bottom: 1px solid rgba(0, 0, 0, 0.12);align-items: baseline;">
                <h2 class="fs-4 fs-md-2 d-inline-block text-gray600">結帳資料填寫</h2>
              </div>
               <!--付款方式-->
              <div class="bg-white p-4 mb-4">
                <h3 class="pb-3 text-gray600 fs-4" style="border-bottom: 1px solid rgba(0, 0, 0, 0.12);align-items: baseline;">付款方式</h3>
                <select class="form-select form-select-lg my-3 w-40 border-gray300 text-gray600" aria-label=".form-select-lg example" style="font-size: 18px">
                  <option selected>信用卡</option>
                  <option value="1">ATM 轉帳</option>
                  <option value="2">超商付款</option>
                  <option value="3">信用卡</option>
                </select>
                <p class="fs-5 text-gray600 ">下一步將連至第三方金流服務進行刷卡，你所有的交易資訊皆獲得安全保護。</p>
              </div>
              <!--個人資料填寫-->
              <div class="bg-white mt-4 rounded-2 text-gray600">
                <form-view ref="form" class=" p-4 p-md-8" v-slot="{ errors }">
                <h2 class=" fs-4 fs-md-3 mb-3 pb-2" style="border-bottom: 1px solid rgba(0, 0, 0, 0.12);align-items: baseline;">填寫訂購人資料</h2>
                 <div classs="row">
                  <div class="mb-4 col-md-6 fs-5">
                    <label for="name" class="form-label fs-5">訂購人姓名<span class="text-danger">*</span></label>
                    <field-view id="name" name="姓名" type="text" class="form-control rounded-2" :class="{ 'is-invalid': errors['姓名'] }"
                            placeholder="請輸入姓名" rules="required" v-model="form.user.name"></field-view>
                    <error-message name="姓名" class="invalid-feedback"></error-message>
                  </div>
                  <div class="mb-4 col-md-6 fs-5">
                    <label for="Email" class="form-label fs-5">聯絡用電子信箱<span class="text-danger">*</span></label>
                    <field-view id="Email" name="Email" type="Email" class="form-control rounded-2"
                    :class="{ 'is-invalid': errors['Email'] }" rules="required" placeholder="請輸入 Email"
                          v-model="form.user.email" ></field-view>
                    <error-message name="Email" class="invalid-feedback text-start"></error-message>
                  </div>
                  <div class="mb-3">
                    <label for="tel" class="form-label">訂購人電話<span class="text-danger">*</span></label>
                    <field-view id="tel" name="電話" type="text" class="form-control rounded-2" :class="{ 'is-invalid': errors['電話'] }"
                            placeholder="請輸入電話" :rules="isPhone" v-model="form.user.tel"></field-view>
                    <error-message name="電話" class="invalid-feedback"></error-message>
                  </div>
                  <div class="mb-3" style="height:100px">
                    <label for="address" class="form-label">訂購人地址<span class="text-danger">*</span></label>
                    <field-view id="address" name="地址" type="text" class="form-control rounded-2" :class="{ 'is-invalid': errors['地址'] }"
                    placeholder="請輸入地址" rules="required" v-model="form.user.address"></field-view>
                    <error-message name="地址" class="invalid-feedback"></error-message>
                  </div>
                  <div class="mb-3">
                    <label for="message" class="form-label">備註</label>
                    <textarea id="message" class="form-control min-h-25 rounded-2" v-model="form.message"></textarea>
                  </div>
                </div>
              </form-view>
              </div>
              <!-- 如果購物車為空 -->
              <div class="w-100 d-flex flex-column align-items-center py-5"
              v-if="cartData.carts.length === 0">
                <i class="fa-solid fa-triangle-exclamation text-primaryDark fa-2x mb-3"></i>
                  <p class="fw-bold mb-4">購物車內沒有商品</p>
              </div>
            </div>
            <!-- 右邊--金額與折扣資料 -->
            <div class="col-lg-4">
              <div class="card border-0 p-3 shadow text-gray600 fw-bold">
                    <h5 class="fw-bold pb-2" style="border-bottom: 1px solid rgba(0, 0, 0, 0.12)">訂單明細</h5>
                    <p class="text-gray700 fs-5" :class="{'mb-3':cartData.final_total !== cartData.total}">
                    商品小計 : <span class="float-end ">{{ $filters.currency(cartData.total) }}</span>
                    </p>
                    <p class="text-gray700 fs-5 mb-3 " v-if="cartData.final_total !== cartData.total">折扣金額 : 
                      <span class="float-end "> {{ $filters.currency(discount_price) }}</span></p>
                    <p class="text-gray700 mb-3 fs-5"  style="border-top: 1px solid rgba(0, 0, 0, 0.12)">商品總金額:
                      <span class="float-end text-secondaryDark fs-4 "> NT${{ $filters.currency(final_total) }} </span>
                    </p>
                    <div class="text-primary rounded-2 p-2 mb-2 fw-bold" v-if="cartData.final_total !== cartData.total">
                       <p class="fs-5">已使用 {{ $filters.currency(Math.abs(discount_price)) }} 元優惠券</p>
                    </div>
                    <button type="submit" class="btn btn-secondary text-primaryDark fw-bold fs-4 px-2"
                    @click.prevent="onSubmit">同意並送出</button>
                </div>

                <!--右邊: 購物車品項 -->
                <div class="card bg-white mt-3 shadow border-0 p-3">
                  <!-- 訂單內容 -->
                    <div class="table align-middle fs-6 bg-white">
                      <h5 class="fw-bold pb-2 text-gray600" style="border-bottom: 1px solid rgba(0, 0, 0, 0.12)">購買列表</h5>
                      <div class="d-flex" v-for="item in cartData.carts" :key="item.id">
                        <div class="d-flex" style="border-bottom: 1px solid rgba(0, 0, 0, 0.12)">
                            <div>
                            <img class="" style="height:120px; width:90px;" :src="item.product.imageUrl" :alt="item.product.title">
                            </div>
                            <div class="flex-column justify-content-end">
                              <div class="mb-3 " >
                                 <p class="text-gray600" style="height: 80px;width:260px" >{{ item.product.title }}</p>
                              </div>
                              <div class="d-flex flex-row justify-content-end">
                                <p class="text-gray600 me-3 " >{{ item.qty }} {{ item.product.unit }} </p>
                                <p class="fw-bold text-primaryMiddle ">NT$ {{ $filters.currency(item.product.price) }}</p>
                              </div>
                            </div>                        
                        </div>
                        <div>
                        </div>
                      </div>
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
      step: 2,
      final_total: '',
      discount_price: '',
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
      coupon_code: '',
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
    ...mapState(cartStore, ['cartData']),
    ...mapState(statusStore, ['isLoading'])
  },
  methods: {
    ...mapActions(cartStore, ['getCartList', 'updateCart', 'delCartItem']),
    ...mapActions(statusStore, ['loadingEffect', 'pushMsg']),
    // 手機驗證
    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '需要正確的電話號碼'
    },
    // 送出訂單
    onSubmit () {
      if (this.cartData.carts.length === 0) {
        this.pushMsg(false, '送出', '購物車還是空的呢!')
      } else {
        this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`, { data: this.form })
          .then((res) => {
            this.pushMsg(res, '送出', '已成功送出訂單')
            this.form.message = ''
            this.getCartList()
            // 跳轉換頁
            this.$router.push(`/checkout/${res.data.orderId}`)
          }).catch(() => {
            this.pushMsg(false, '送出', '送出訂單失敗')
          })
      }
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
        // this.isLoading = false
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
  }
}
</script>

<style lang="scss" scoped>
.min-h-25{
  min-height:100px
}

</style>
