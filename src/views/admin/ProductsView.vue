<template>
<LoadingView class="loading" :active="isLoading">
  <div class="spinner-border text-primary m-5" role="status">
  <span class="visually-hidden">Loading...</span>
  </div>
</LoadingView>
<div class="container bg-light" style="min-height: 74vh">
<h2 class="text-gray700 fw-bold me-4 text-center pb-2 pt-5">商品管理</h2>
<div class="d-flex justify-content-between align-items-center mb-4">
    <div class="header align-items-center">
        <select class="form-select form-select-sm bg-white box-shadow-none w-auto fs-6" aria-label=".form-select-sm example"
        v-model="selectAnswer">
            <option selected value =''>全部</option>
            <option :value="item" v-for="(item,i) in category" :key="i">{{ item }}</option>
        </select>
    </div>
    <div class="btn btn-outline-primary rounded-2" style="font-size:18px" @click="openModal ('isCreateNew')">
      新增商品</div>
</div>
<div class="table-responsive rounded-2 border-0">
<table class="table admin-prod caption-top table-hover text-gray600 text-nowrap bg-white">
  <thead>
    <tr class="bg-primary text-white fs-5">
      <th scope="col-1">類型</th>
      <th scope="col-1">圖片</th>
      <th scope="col-2">商品名稱</th>
      <th scope="col-1">原價</th>
      <th scope="col-1">售價</th>
      <th scope="col-1">是否上架</th>
      <th scope="col-1">編輯</th>
      <th scope="col-1">刪除</th>
    </tr>
  </thead>
  <tbody class="text-gray600">
    <tr v-for="item in products" :key="item.id">
      <th scope="row">{{ item.category }}</th>
      <td><img class="img-wrap" :src="item.imageUrl"></td>
      <td class="text-wrap">{{ item.title }}</td>
      <td class="text-end">NT$ {{ $filters.currency(item.origin_price) }}</td>
      <td class="text-end">NT$ {{ $filters.currency(item.price) }}</td>
      <td class="ps-3">
        <label class="switch fs-4">
          <input type="checkbox"
          @change="updateProducts(item,false)"
          v-model="item.is_enabled"
          :true-value="1" :false-value="0">
          <span class="slider text-primary"></span>
        </label>
      </td>
      <td>
          <div class="d-flex align-items-center" @click="openModal ('edit', item)">
            <i class="bi bi-pencil-square cursor-pointer fs-4 me-2 text-primaryDark"></i>
          </div>
      </td>
      <td>
          <div class="d-flex align-items-center" @click="openModal ('delete', item)">
            <i class="bi bi-trash fs-4 cursor-pointer text-primaryDark"></i>
          </div>
      </td>
    </tr>
  </tbody>
</table>
</div>
</div>
<ProductModal ref="productModal"
:temp="temp" :isCreateNew="isCreateNew" @update-products="updateProducts"></ProductModal>
<DelModal ref="delModal" :temp="temp" @del-item="delProductItem"></DelModal>
<PagiNation class="d-flex justify-content-center pb-4 pt-4 bg-light"
  :pages="pagination" @update-page="getProducts"></PagiNation>
</template>

<script>
import { mapActions } from 'pinia'
import statusStore from '@/stores/statusStore'

import PagiNation from '@/components/front/PagiNation'
import ProductModal from '@/components/admin/ProductModal'
import DelModal from '@/components/admin/DelModal'

export default {
  data () {
    return {
      temp: [],
      products: [],
      productsAll: [],
      category: [],
      pagination: [],
      selectAnswer: '',
      isCreateNew: false,
      isLoading: false
    }
  },
  components: {
    PagiNation,
    ProductModal,
    DelModal
  },
  watch: {
    selectAnswer: {
      handler (value) {
        this.getProducts(value)
      },
      deep: true
    }
  },
  methods: {
    ...mapActions(statusStore, ['pushMsg']),
    getProducts (category, page = 1) {
      let url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`
      if (category) {
        url = `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/admin/products?category=${category}&page=${page}`
      }
      this.isLoading = true
      this.$http.get(url)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products
            this.pagination = res.data.pagination
            this.isLoading = false
          }
        }).catch(() => {
          this.isLoading = false
          console.log('nodata')
        })
    },
    getAllProducts () {
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products/all`)
        .then((res) => {
          this.productsAll = res.data.products
          this.filterCategory()
        }).catch(() => {
          this.pushMsg(false, '載入', '請重新整理')
        })
    },
    filterCategory () {
      this.getAllProducts()
      this.productsAll = Object.keys(this.productsAll).map((i) => this.productsAll[i])
      const array = this.productsAll.map((item) => item.category)
      this.category = [...new Set(array)]
    },
    updateProducts (product, isCreateNew) {
      let url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`
      let method = 'post'
      if (isCreateNew === false) {
        method = 'put'
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${product.id}`
      }
      this.isLoading = true
      this.$http[method](url, { data: product })
        .then((res) => {
          this.isLoading = false
          this.pushMsg(res, '更新', '更新成功')
          this.$refs.productModal.hideModal()
          console.log(res)
          this.getProducts()
        }).catch(() => {
          this.isLoading = false
          this.pushMsg(false, '更新', '更新失敗')
        })
    },
    openModal (status, product) {
      if (status === 'isCreateNew') {
        this.temp = {}
        this.$refs.productModal.openModal()
        this.isCreateNew = true
      } else if (status === 'edit') {
        this.temp = JSON.parse(JSON.stringify(product))
        this.$refs.productModal.openModal()
        this.isCreateNew = false
      } else if (status === 'delete') {
        this.temp = { ...product }
        this.$refs.delModal.openModal()
      }
    },
    delProductItem () {
      this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.temp.id}`)
        .then((res) => {
          this.pushMsg(res, '刪除', '已成功刪除')
          this.$refs.delModal.hideModal()
          this.getProducts()
        }).catch(() => {
          this.pushMsg(false, '刪除', '刪除失敗')
        })
    }
  },
  mounted () {
    this.getProducts()
    this.filterCategory()
  }
}
</script>
