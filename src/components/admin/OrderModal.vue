<template>
  <div class="modal fade" ref="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content background-transparent">
        <div class="modal-header bg-primaryLight text-center p-3">
          <h4 class="modal-title text-dark">訂單編號 : {{ tempModalData.id }}</h4>
        </div>
        <div class="modal-body bg-white text-center p-6 ">
          <div class="row">
            <div class="col-10 col-md-5 offset-1">
              <div class="d-flex justify-content-between align-items-center mb-4">
                <p class="text-primaryDark fw-bold fs-3 p-2">訂單內容</p>
                <div class="d-flex mt-3">
                    <span class="text-primaryDark fw-bold me-2" v-if="tempModalData.is_paid">已付款</span>
                    <span class="text-primaryDark fw-bold me-2" v-else>未付款</span>
                    <!-- ToggleSwitch -->
                    <label class="switch">
                    <input type="checkbox"
                    v-model="tempModalData.is_paid">
                    <span class="slider"></span>
                    </label>
                    <!-- ToggleSwitch -->
                  </div>
              </div>
              <ul>
                <li class="d-flex justify-content-between align-items-center py-2" v-for="item in tempModalData.products" :key="item.id">
                <div class="d-flex align-items-center">
                  <img class="img-wrap me-4" :src="item.product.imageUrl" :alt="item.product.title">
                  <div class="cart-body text-start">
                    <p class="fw-bold">{{ item.product.title }}</p>
                    <p class="fw-bold text-primaryDark">NT$ {{ Math.round(item.final_total) }}</p>
                    <p class="text-danger fw-bold" v-if="item.coupon">已套用優惠券</p>
                  </div>
                </div>
                <div>
                <p>x {{ item.qty }}</p>
                </div>
                </li>
              </ul>
              <p class="fs-4 fw-bold text-end"> 總計金額:NT${{ Math.round(tempModalData.total) }}</p>
            </div>
            <div class="col-10 col-md-5 bg-light shadow-sm ms-5">
              <div class="position-sticky top-20">
                <div class="d-flex justify-content-between align-items-center">
                  <p class="bg-light text-primaryDark fw-bold fs-3 p-2">用戶資訊</p>
                </div>
                <!-- 訂單資料 -->
                <table class="table mt-4 fs-6">
                  <tbody>
                    <tr class="text-start">
                      <th class="text-primaryDark" scope="row">下單時間</th>
                      <td class="text-primaryDark">{{ this.$filters.date(tempModalData.create_at) }}</td>
                    </tr>
                    <tr class="text-start">
                      <th class="text-primaryDark" scope="row">Email</th>
                      <td class="text-primaryDark">{{ tempModalData.user?.email }}</td>
                    </tr>
                    <tr class="text-start">
                      <th class="text-primaryDark" scope="row">收件人姓名</th>
                      <td class="text-primaryDark">{{ tempModalData.user?.name }}</td>
                    </tr>
                    <tr class="text-start">
                      <th class="text-primaryDark" scope="row">電話號碼</th>
                      <td class="text-primaryDark">{{ tempModalData.user?.tel }}</td>
                    </tr>
                    <tr class="text-start">
                      <th class="text-primaryDark" scope="row">收件地址</th>
                      <td class="text-primaryDark">{{ tempModalData.user?.address }}</td>
                    </tr>
                    <tr class="text-start" v-if="tempModalData.user?.payment">
                      <th class="text-primaryDark" scope="row">付款方式</th>
                      <td class="text-primaryDark">{{ tempModalData.user?.payment }}</td>
                    </tr>
                    <tr class="text-start" v-if="tempModalData.message">
                      <th class="text-primaryDark" scope="row">備註</th>
                      <td class="text-primaryDark">{{ tempModalData.message }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer flex-nowrap w-100">
          <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary text-white" @click="$emit('update-orders',tempModalData)">確定修改</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'

export default {
  mixins: [modalMixin],
  watch: {
    temp: {
      handler () {
        if (!this.tempModalData.orderStatus) {
          this.tempModalData.orderStatus = '已收到訂單'
        }
      },
      deep: true
    }
  }
}
</script>
