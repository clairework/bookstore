<template>
  <LoadingView class="loading" :active="isLoading">
    <div class="spinner-border text-primary m-5" role="status">
    <span class="visually-hidden">Loading...</span>
    </div>
  </LoadingView>
  <div class="container" style="min-height:74vh">
   <div class="container">
  <h2 class="text-gray700 text-center fw-bold me-4 p-2 pt-5">優惠券管理</h2>
  <div class="d-flex justify-content-between align-items-center mb-4">
    <div class="d-flex align-items-center">
    </div>
    <div class="btn btn-outline-primary text-primary fw-bold rounded-2" style="font-size:18px"
     @click="openModal ('isCreateNew')">
      新增優惠券
    </div>
  </div>
  <div class="admin-coupon table-responsive rounded-2">
    <table class="table text-nowrap caption-top table-hove text-gray600">
      <thead>
        <tr class="bg-primary fs-5 text-white">
          <th scope="col">優惠碼</th>
          <th scope="col">名稱</th>
          <th scope="col">折扣百分比</th>
          <th scope="col">到期日</th>
          <th scope="col">是否啟用</th>
          <th scope="col">編輯</th>
          <th scope="col">刪除</th>
        </tr>
      </thead>
      <tbody class="bg-white text-gray600">
        <tr v-for="item in coupons" :key="item.id">
          <td>{{ item.code }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.percent }} %</td>
          <td>{{ $filters.date(item.due_date) }}</td>
          <td class="ps-2">
            <label class="switch">
              <input type="checkbox"
              v-model="item.is_enabled"
              @change="updateCoupon(item,false)"
              :true-value="1" :false-value="0">
              <span class="slider"></span>
          </label>
          </td>
          <td>
              <div class="d-flex align-items-center" @click="openModal('edit',item)">
              <i class="bi bi-pencil-square cursor-pointer text-primaryDark fs-4 me-6"></i>
              </div>
          </td>
          <td>
            <div class="d-flex align-items-center" @click="openModal('delete',item)">
              <i class="bi bi-trash cursor-pointer text-primaryDark fs-4"></i>
            </div>
          </td>
        </tr>
      </tbody>
  </table>
  </div>
  </div>
  </div>
  <CouponModal ref="couponModal" :temp="temp" :isCreateNew="isCreateNew" @update-coupons="updateCoupon"></CouponModal>
  <DelModal ref="delModal" :temp="temp" @del-item="delCouponItem"></DelModal>
</template>

<script>
import { mapActions } from 'pinia'
import statusStore from '@/stores/statusStore'
import CouponModal from '@/components/admin/CouponModal'
import DelModal from '@/components/admin/DelModal'
export default {
  data () {
    return {
      temp: {},
      coupons: {},
      isCreateNew: true,
      isLoading: false
    }
  },
  components: {
    CouponModal,
    DelModal
  },
  methods: {
    ...mapActions(statusStore, ['pushMsg']),
    getCoupons () {
      this.isLoading = true
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons`)
        .then((res) => {
          this.coupons = res.data.coupons
          this.isLoading = false
        }).catch(() => {
          this.isLoading = false
        })
    },
    openModal (status, product) {
      if (status === 'isCreateNew') {
        this.temp = {
          // 將時間格式改為 YYYY-MM-DD
          due_date: new Date().getTime() / 1000,
          is_enabled: 0
        }
        this.isCreateNew = true
        this.$refs.couponModal.openModal()
      } else if (status === 'edit') {
        this.temp = { ...product }
        this.isCreateNew = false
        this.$refs.couponModal.openModal()
      } else if (status === 'delete') {
        this.temp = { ...product }
        this.$refs.delModal.openModal()
      }
    },
    updateCoupon (item, isCreateNew) {
      let url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon`
      let method = 'post'
      // 如果是編輯模式
      if (isCreateNew === false) {
        method = 'put'
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`
      }
      this.isLoading = true
      this.$http[method](url, { data: item })
        .then((res) => {
          this.isLoading = false
          this.pushMsg(res, '更新', '已成功更新優惠券')
          this.$refs.couponModal.hideModal()
          this.getCoupons()
        }).catch(() => {
          this.isLoading = false
          this.pushMsg(false, '更新', '更新優惠券失敗')
        })
    },
    delCouponItem (item) {
      this.isLoading = true
      this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`)
        .then((res) => {
          this.pushMsg(res, '更新', '已成功刪除優惠券')
          this.isLoading = false
          this.$refs.delModal.hideModal()
          this.getCoupons()
        }).catch(() => {
          this.pushMsg(false, '更新', '刪除優惠券失敗')
          this.isLoading = false
        })
    }
  },
  mounted () {
    this.getCoupons()
  }
}
</script>
