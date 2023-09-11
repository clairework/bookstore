<template>
  <LoadingView class="loading" :active="isLoading">
    <div class="spinner-border text-primaryLight m-5" role="status">
    <span class="visually-hidden">Loading...</span>
    </div>
  </LoadingView>
  <div class="container" style="min-height: 74vh">
  <h2 class=" text-gray700 fw-bold me-4 p-2 py-5 text-center ">訂單管理</h2>
  <div class="overflow-auto mb-3 table-responsive rounded-2">
    <table class="table admin-order caption-top table-hover text-gray600 text-nowrap">
      <thead>
        <tr class="bg-primary fs-5 text-white">
          <th scope="col">購買時間</th>
          <th scope="col">Email</th>
          <th scope="col">購買項目</th>
          <th scope="col">應付金額</th>
          <th scope="col">是否付款</th>
          <th scope="col">編輯</th>
          <th scope="col">刪除</th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <tr v-for="item in orders" :key="item.id">
          <td>{{ $filters.date(item.create_at) }}</td>
          <td>{{ item.user.email }}</td>
          <td>
              <ul class="list-unstyled text-gray600">
                  <li v-for="(product,i) in item.products" :key="i">
                    <div class="d-flex justify-content-start mb-2">
                    <img class="img-wrap me-2" :src="product.product.imageUrl">
                    <span class="text-wrap me-2 text-gray600" style="width: 220px">{{ product.product.title }}</span>
                    <span class="text-end text-gray600" style="width: 20px"> x {{ product.qty }} 本 </span>
                    </div>
                  </li>
              </ul>
          </td>
          <td class="text-end">NT${{ $filters.currency(Math.round(item.total)) }}</td>
          <td class="ps-2 text-gray600">
            <label class="switch">
              <input type="checkbox" class="text-gray600"
              v-model="item.is_paid"
              @change="updatePaid(item)">
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
  <OrderModal ref="orderModal" :temp="temp" @update-orders="updatePaid"></OrderModal>
  <DelModal ref="delModal" :temp="temp" @del-item="delOrderItem"></DelModal>
  <PagiNation class="d-flex justify-content-center pb-3"
  :pages="pagination" @update-page="getOrders"></PagiNation>
</template>

<script>
import { mapActions } from 'pinia'
import statusStore from '@/stores/statusStore'

import PagiNation from '@/components/front/PagiNation'
import OrderModal from '@/components/admin/OrderModal'
import DelModal from '@/components/admin/DelModal'
export default {
  data () {
    return {
      temp: [],
      orders: [],
      pagination: [],
      isLoading: false
    }
  },
  components: {
    PagiNation,
    OrderModal,
    DelModal
  },
  methods: {
    ...mapActions(statusStore, ['pushMsg']),
    getOrders (page = 1) {
      this.isLoading = true
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`)
        .then((res) => {
          this.orders = res.data.orders
          this.pagination = res.data.pagination
          this.isLoading = false
        }).catch(() => {
          this.isLoading = false
        })
    },
    openModal (status, product) {
      if (status === 'edit') {
        this.temp = { ...product }
        this.$refs.orderModal.openModal()
      } else if (status === 'delete') {
        this.temp = { ...product }
        this.$refs.delModal.openModal()
      }
    },
    updatePaid (item) {
      this.temp = item
      this.isLoading = true
      this.$http.put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`,
        { data: this.temp })
        .then((res) => {
          this.pushMsg(res, '更新', '已成功更新付款狀態')
          this.isLoading = false
          this.$refs.orderModal.hideModal()
          this.getOrders()
        }).catch(() => {
          this.pushMsg(false, '更新', '更新付款狀態失敗')
          this.isLoading = false
        })
    },
    delOrderItem (item) {
      this.isLoading = true
      this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`)
        .then((res) => {
          this.pushMsg(res, '更新', '已成功刪除訂單')
          this.isLoading = false
          this.$refs.delModal.hideModal()
          this.getOrders()
        }).catch(() => {
          this.pushMsg(false, '更新', '刪除訂單失敗')
          this.isLoading = false
        })
    }
  },
  mounted () {
    this.getOrders()
  }
}
</script>
