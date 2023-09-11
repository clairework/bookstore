<template>
  <LoadingView class="loading" :active="isLoading">
    <div class="spinner-border text-primary m-5" role="status">
    <span class="visually-hidden">Loading...</span>
    </div>
  </LoadingView>
  <div class="front-check">
  <div class="bg-light">
    <OrderSteps :cartData="cartData" :step="step"></OrderSteps>
    <div class="container pt-5 pb-5">
      <div class="row">
        <div class="col-lg-8 mb-6 mb-md-0 pt-4">
              <!--左邊: 購物車品項 -->
            <div class="card p-3 border-0 bg-white mb-4 shadow-sm">
              <h3 class="pb-3 text-gray600 fs-4 border-gray300" style="border-bottom: 2px solid rgba(0, 0, 0, 0.12);align-items: baseline;">結帳確認</h3>
              <table class="table align-middle fs-6 bg-white text-gray600">
              <thead>
                <tr class="fs-5">
                  <th class="d-none d-md-table-cell text-start" width="50%">課程名稱</th>
                  <th class="d-none d-md-table-cell text-end" width="20%">售價</th>
                  <th class="d-none d-md-table-cell text-end" width="10%">數量</th>
                  <th class="d-none d-md-table-cell text-end" width="20%">金額</th>
                </tr>
              </thead>
              <tbody>
              <tr v-for="item in order.products" :key="item.id">
                <td>
                <div class="d-flex align-items-center p-3 fs-5">
                  <img class="me-4" style="height:110px; width:80px; object-fit:cover" :src="item.product.imageUrl" :alt="item.product.title">
                  <div class="cart-body text-start ">
                    <p class="">{{ item.product.title }}</p>
                  </div>
                </div>
                </td>
                <td width="20%">
                  <p class="text-end fs-5">NT$ {{ $filters.currency(item.product.price) }}</p>
                </td>
                <td width="10%">
                  <p class="text-end fs-5">{{ item.qty }}</p>
                </td>
                <td width="20%">
                  <p class="text-end fs-5">NT$ {{ $filters.currency(item.product.price) }}</p>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
            <div class="card border-0 shadow-sm rounded-2">
            <!--付款資訊-->
              <div class="bg-white p-4">
                <h3 class="pb-3 text-gray600 fs-4 border-gray300" style="border-bottom: 2px solid rgba(0, 0, 0, 0.12);align-items: baseline;">付款資訊</h3>
                <select class="form-select form-select-lg bg-gray300 my-3 w-40 border-gray300 text-gray600" aria-label=".form-select-lg example" style="font-size: 18px" disabled>
                  <option selected>信用卡</option>
                  <option value="1">ATM 轉帳</option>
                  <option value="2">超商付款</option>
                  <option value="3">信用卡</option>
                </select>
              </div>
              <!-- 收件人資料 -->
              <div class="text-gray600">
                  <form class="bg-white p-4 p-md-8 rounded-2">
                    <h3 class="pb-3 text-gray600 fs-4 mb-3" style="border-bottom: 1px solid rgba(0, 0, 0, 0.12);align-items: baseline;">訂購人資料</h3>
                      <div class="row">
                        <div class="mb-4 col-md-6 fs-5">
                          <label for="name" class="form-label">收件人姓名</label>
                          <input id="name" name="姓名" type="text" class="form-control border-1 rounded-2 text-gray600 bg-gray300" :value="order.user.name" disabled>
                        </div>
                        <div class="mb-4 col-md-6 fs-5">
                          <label for="email" class="form-label">聯絡用電子信箱</label>
                          <input id="email" name="email" type="email" class="form-control border-1 rounded-2 text-gray600 bg-gray300" :value="order.user.email" disabled>
                        </div>
                        <div class="mb-4 col-md-6 fs-5">
                          <label for="tel" class="form-label">收件人電話</label>
                          <input id="tel" name="電話" type="text" class="form-control border-1 rounded-2 text-gray600 bg-gray300" :value="order.user.tel" disabled>
                        </div>
                        <div class="mb-4 col-md-6 fs-5">
                          <label for="address" class="form-label">收件人地址</label>
                          <input id="address" name="地址" type="text" class="form-control border-1 rounded-2 text-gray600 bg-gray300" :value="order.user.address" disabled>
                        </div>
                        <div class="mb-3">
                          <label for="message" class="form-label">備註</label>
                          <textarea id="message" class="form-control min-h-25 border-1 rounded-2 bg-gray300" :value="order.message" disabled></textarea>
                        </div>
                      </div>
                  </form>
              </div>
          </div>
        </div>
        <div class="col-lg-4 pt-4">
          <!-- 右邊--金額與折扣資料 -->
          <div>
              <div class="card fw-bold border-0 p-3 shadow text-gray600">
                    <h5 class="pb-2" style="border-bottom: 1px solid rgba(0, 0, 0, 0.12)">訂單明細</h5>
                    <p class="fs-5">
                      訂單編號 : <span class="text-gray600 fw-bold float-end ">{{ order.id }}</span>
                    </p>
                    <p class="fs-5">
                      訂單金額 : <span class="text-secondaryDark fs-4 fw-bold float-end ">NT${{ $filters.currency(Math.round(order.total)) }}</span>
                    </p>
                    <button type="submit" class="btn btn-secondary text-primaryDark fw-bold fs-4 px-2"
                    @click.prevent="pay">確認付款</button>
                </div>
          </div>
          </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapActions } from 'pinia'
import statusStore from '@/stores/statusStore'
import OrderSteps from '@/components/front/OrderSteps'

export default {
  data () {
    return {
      step: 3,
      order: {
        user: {},
        products: {}
      },
      final_total: '',
      discount_price: '',
      orderProducts: [],
      orderId: this.$route.params.id,
      isLoading: false,
      title: '建立訂單'
    }
  },
  components: {
    OrderSteps
  },
  watch: {
    final_total: {
      handler () {
        this.discount_price = this.final_total - this.cartData.total
      },
      deep: true
    }
  },
  methods: {
    ...mapActions(statusStore, ['pushMsg']),
    getOrders (id) {
      this.isLoading = true
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order/${id}`)
        .then((res) => {
          this.order = res.data.order
          // 物件轉成陣列
          this.orderProducts = Object.keys(this.order.products).map((i) => this.order.products[i])
          this.isLoading = false
        }).catch(() => {
          this.isLoading = false
        })
    },
    pay () {
      this.isLoading = true
      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/pay/${this.orderId}`)
        .then((res) => {
          this.isLoading = false
          this.pushMsg(res, '更新', '已付款成功')
          // 頁面跳轉
          this.$router.push('/payment')
        })
    },
    copyOrderId (text) {
      navigator.clipboard.writeText(text)
        .then(() => {
          this.pushMsg(true, '複製', '您已成功複製優惠碼!')
        })
    }
  },
  mounted () {
    this.getOrders(this.orderId)
  }
}
</script>

<style lang="scss" scoped>
.min-h-25{
  min-height:100px;
}
</style>
