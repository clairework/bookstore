<template>
  <LoadingView class="loading" :active="isLoading">
      <img src="../../assets/images/loading.gif" alt="Loading">
  </LoadingView>
  <div class="window-height bg-light">
    <div class="ordersearch-banner">
      <div class="container">
        <div class="title">
          <h2 class="text-primaryDark text-end"></h2>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row justify-content-center">
      <div class="col-md-6 py-6 py-md-10">
        <div class="input-group me-2 mt-5 mb-5">
          <input class="form-control" type="search" v-model.lazy.trim="search"
          placeholder="請輸入訂單編號" aria-label="Search" aria-describedby="button-addon2">
          <button class="btn btn-primary" type="submit" id="button-addon2">
            <i class="fa-solid fa-magnifying-glass text-white"></i>
          </button>
        </div>
      </div>
      </div>
    </div>
    <div class="container">
      <div class="d-flex flex-column justify-content-center py-5" style="height: 43vh" v-if="!userOrder.id">
        <i class="fs-1 bi bi-arrow-up-square text-center text-primaryDark fa-2x mb-3"></i>
        <p class="text-center fw-bold mb-4 h4">請輸入訂單編號</p>
      </div>
      <div class="row justify-content-center pt-2" v-if="userOrder.id">
            <div class="col-12 col-xl-8">
              <div class="d-flex justify-content-between align-items-center mb-4">
                <p class="text-primaryDark fw-bold fs-3 p-2">訂單內容</p>
                <div class="d-flex">
                    <span class="text-primaryDark fw-bold me-2" v-if="userOrder.is_paid">已付款</span>
                    <span class="text-primaryDark fw-bold me-2" v-else>未付款</span>
                    <label class="switch">
                    <input type="checkbox"
                    v-model="userOrder.is_paid" disabled>
                    <span class="slider cursor-default"></span>
                    </label>
                </div>
              </div>
              <!--左邊: 購物車品項 -->
              <table class="table align-middle">
              <thead>
                <tr class="fs-5">
                  <th class="d-none d-md-table-cell text-start" width="40%">名稱</th>
                  <th class="d-none d-md-table-cell text-start" width="30%">單價</th>
                  <th class="d-none d-md-table-cell text-center" width="30%">數量</th>
                </tr>
              </thead>
              <tbody>
              <tr v-for="item in userOrder.products" :key="item.id">
                <td>
                <div class="d-flex align-items-center p-3">
                  <img class="imgbox-small me-2" :src="item.product.imageUrl" :alt="item.product.title">
                  <div class="cart-body text-start ">
                    <p class="fw-bold">{{ item.product.title }}</p>
                    <p class="fw-bold">{{ item.product.author }}</p>
                    <p class="text-danger fw-bold" v-if="item.coupon">已套用優惠券</p>
                  </div>
                </div>
                </td>
                <td width="20%">
                  <p class="fw-bold text-primaryDark">NT$ {{ $filters.currency(item.product.price) }}</p>
                </td>
                <td class="text-center" width="20%">
                <p>x {{ item.qty }}</p>
                </td>
              </tr>
              </tbody>
            </table>
             <div>
                <p class="text-primaryDark fw-bold text-end mb-3 fs-md-4">
                  應付金額 : NT${{ $filters.currency(Math.round(userOrder.total)) }}
                </p>
              </div>
            </div>
            <div class="col-12 col-xl-4 mb-5">
                <p class="text-primaryDark fw-bold fs-3 p-2 text-center mb-3">用戶資訊</p>
                <!-- 用戶資料 -->
                <div class="p-5 bg-white shadow-sm">
                <table class="table mb-5 mb-md-0 fs-6 ms-3 w-90 border-primaryOne pb-5 ">
                    <tbody>
                        <tr class="text-start">
                            <th class="text-primaryDark" scope="row">下單時間</th>
                            <td class="text-primaryDark">{{ $filters.date(userOrder.create_at) }}</td>
                        </tr>
                        <tr class="text-start">
                            <th class="text-primaryDark" scope="row">Email</th>
                            <td class="text-primaryDark">{{ userOrder.user.email }}</td>
                        </tr>
                        <tr class="text-start">
                            <th class="text-primaryDark" scope="row">收件人姓名</th>
                            <td class="text-primaryDark">{{ userOrder.user.name }}</td>
                        </tr>
                        <tr class="text-start">
                            <th class="text-primaryDark" scope="row">電話號碼</th>
                            <td class="text-primaryDark">{{ userOrder.user.tel }}</td>
                        </tr>
                        <tr class="text-start">
                            <th class="text-primaryDark" scope="row">收件地址</th>
                            <td class="text-primaryDark">{{ userOrder.user.address }}</td>
                        </tr>
                        <tr class="text-start" v-if="userOrder.user.payment">
                            <th class="text-primaryDark" scope="row">付款方式</th>
                            <td class="text-primaryDark">{{ userOrder.user.payment }}</td>
                        </tr>
                        <tr class="text-start" v-if="userOrder.message">
                            <th class="text-primaryDark" scope="row">備註</th>
                            <td class="text-primaryDark">{{ userOrder.message }}</td>
                        </tr>
                    </tbody>
                </table>
              </div>
            </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import statusStore from '@/stores/statusStore'
export default {
  data () {
    return {
      userOrder: {
        user: {},
        products: {}
      },
      search: '',
      isLoading: false
    }
  },
  watch: {
    search: {
      handler () {
        if (this.search === '') {
          this.userOrder = {}
        } else {
          this.getOrders(this.search)
        }
      },
      deer: true
    }
  },
  methods: {
    ...mapActions(statusStore, ['pushMsg']),
    getOrders (id) {
      if (this.search.length < 20 || !this.search.includes('-')) {
        this.pushMsg(false, '搜尋', '請重新搜尋')
      } else {
        this.isLoading = true
        this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order/${id}`)
          .then((res) => {
            this.isLoading = false
            this.userOrder = res.data.order
            if (!this.userOrder.orderStatus) {
              this.userOrder.orderStatus = '已收到訂單'
            }
          }).catch(() => {
            this.isLoading = false
            this.pushMsg(false, '搜尋', '請重新搜尋')
          })
      }
    }
  }
}
</script>

<style lang="scss">
.table > :not(caption) > * > *{
  border-bottom-width: 1px;
}
.cursor-default{
  cursor: default;
}

.min-h-50vh{
  min-height:50vh;
}
</style>
