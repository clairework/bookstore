<template>
  <LoadingView class="loading" :active="isLoading">
    <div class="spinner-border text-primary m-5" role="status">
    <span class="visually-hidden">Loading...</span>
    </div>
  </LoadingView>
  <!-- 基本資料 -->
  <section class="section_base bg-white">
      <div class="container">
        <div class="row">
          <!-- 路徑 -->
          <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb ">
            <ol class="breadcrumb pt-5 pb-2 py-md-6 m-0  fs-5 text-gray700">
              <li class="breadcrumb-item "><router-link to="/">首頁</router-link></li>
              <li class="breadcrumb-item ps-1 " style="cursor: pointer"><a @click.prevent="toCategory(product.category)">{{ product.category }}</a></li>
              <li class="breadcrumb-item ps-1 active" aria-current="page">商品介紹</li>
            </ol>
          </nav>
          <!-- 第一列 資料 -->
          <div class="row py-4">
            <!--左邊: 圖片 -->
            <div class="col-xl-5 col-lg-6 mb-3 col-12">
              <img class="rounded-4" :src="product.imageUrl" :alt="product.title">
            </div>
            <!--右邊: 基本資料 -->
            <div class="col-xl-7 col-lg-6 mb-3 mb-md-0 col-12"> 
              <div class="mt-0">
                <h2 class="fs-2 fw-bold mb-3 text-dark title">{{ product.title }}</h2>
              </div>
              <!--副標題-->
              <div class="mb-3">
                <p class="fs-4" v-html="product.subTitle"></p>
              </div>
              <!--簡介-->
              <div class="mb-3" style="height: 88px; overflow: hidden;">
                <p class="fs-5 text-gray800" v-html="product.description"></p>
              </div>
              <div class="mb-4 text-gray700">
                <p class="fs-5 mb-2">作者 : <Skeletor v-if="isLoading" width="25%"/> {{ product.author }}</p>
                <p class="fs-5 mb-2">出版社 : <Skeletor v-if="isLoading" width="25%"/> {{ product.publishing_house }}</p>
                <p class="fs-5 mb-2">出版日期 : <Skeletor v-if="isLoading" width="25%"/> {{ product.publication_date }}</p>
                <p class="fs-5">庫存 : <Skeletor v-if="isLoading" width="25%"/> {{ product.inventory }} {{ product.unit }}</p>
              </div>
              <div class="d-flex mb-4">
              <span class="text-decoration-line-through text-gray fs-5 me-3">原價 NT$ {{ $filters.currency(product.origin_price) }}</span>
              <span class="fs-4 fw-bolder text-secondaryDark">特價: NT$ {{ $filters.currency(product.price) }}</span>
            </div>
             <div class="d-flex mt-3 fw-bold">
              <button type="button" class="btn btn-outline-primaryMiddle px-4 py-2 me-2 fw-bold" 
              style="font-size: 18px"
              @click.prevent="toggleFavorite(product)"
                >
                  <span v-if="favoriteId.includes(product.id)">
                    <span><i class="fas fa-heart" /></span>
                    已加入收藏
                  </span>
                  <span v-else>
                  <span><i class="far fa-heart " /></span>
                    加入收藏
                  </span>
              </button>
              <button type="button" class="btn btn-outline-primaryMiddle border-2 me-2 fw-bold" 
              style="font-size: 18px"
              @click="addToCart(product)">
              加入購物車<span v-show="isLoadingItem === product.id"><i class="fas fa-spinner fa-pulse ms-1"></i></span>
              </button>
              <button type="button" class="btn btn-primaryMiddle fw-bold text-white me-2 px-4 py-2" 
              style="font-size: 18px"
              @click.prevent="addToCart1(product)">直接購買</button>
            </div>
            </div>
          </div>
        </div>
      </div>
  </section>
  <!-- 課程介紹 -->
  <section class="section_detail bg-light pt-5">
    <div class="container">
      <div class="bg-white rounded-4 ps-4 pt-3 pb-4 shadow-sm text-start">          
            <h4 class="text-dark mb-3 fw-bold" style="font-size=24px">內容介紹</h4>
            <p class="pb-4 pe-4 text-gray700" v-html="product.content"></p>
            <hr>
            <h4 class="text-dark mb-3 fw-bold" style="font-size=24px">目錄</h4>
            <p class="pb-4 pe-4 " v-html="product.table_contents"></p>
      </div>
      <div class="mx-auto pb-5">
            <p class="fw-bold mt-4 text-gray700 fs-4 ps-3">關於作者</p>
            <hr style="margin: 8px 0px 0px;border-top: 1px solid rgb(199 200 201);">
            <p class="fw-bold fs-5 text-dark py-4 ps-3" > {{ product.author }}</p>
            <p class="fs-6 ps-3" v-html="product.author_intro"></p>
      </div>
    </div>
  </section>
</template>

<script>

import favoriteMixin from '@/mixins/LocalFavorite'
import { mapState, mapActions } from 'pinia'
import cartStore from '@/stores/cartStore'
import statusStore from '@/stores/statusStore'
export default {
  mixins: [favoriteMixin],
  components: {
  },
  data () {
    return {
      product: [],
      isLoading: false,
      quantity: 1
    }
  },
  watch: {
    product: {
    },
    quantity () {
      if (this.quantity <= 0) {
        this.quantity = 1
      }
    },
    $route () {
      if (this.$route.params.id !== undefined) {
        this.getProduct()
      }
    }
  },
  computed: {
    ...mapState(cartStore, ['cartData']),
    ...mapState(statusStore, ['isLoadingItem'])
  },
  methods: {
    ...mapActions(cartStore, ['addToCart','addToCart1']),
    getProduct () {
      const id = this.$route.params.id
      this.isLoading = true
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`)
        .then((res) => {
          this.product = res.data.product
          this.isLoading = false
          // 最近瀏覽紀錄
          this.resentlyViewed(this.product)
        }).catch(() => {
          this.isLoading = false
        })
    },
    toCategory (el) {
      this.$router.push({
        name: 'list',
        query: { pathCategory: el }
      })
    }
  },
  mounted () {
    this.getProduct()
  }
}
</script>
