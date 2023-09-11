<template>
  <div class="front-nav sticky-top bg-white">
    <!-- nav (fixed-top) -->
    <nav class="navbar navbar-expand-lg navbar-light shadow-sm align-items-left" id="front-nav">
        <div class="container">
        <!-- logo -->
        <router-link class="navbar-brand" to="/">
          <img src="../../assets/images/logo.png" alt="" style="height:70px">
        </router-link>
         <!-- cart -->
        <div class="cart dropdown ms-auto cursor-pointer order-lg-3">
          <div class="text-dark" id="cartDropdown" data-bs-toggle="dropdown" aria-expanded="false">
            <div class="d-flex">
              <div class="position-relative me-2 fs-5" :class="{'bounced':isBounced}">
                <i class="fa-solid fa-cart-shopping"></i>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                v-if="cartData.carts.length != 0">{{ cartData.carts.length }}</span>
              </div>
            </div>
          </div>
          <!-- cart -->
          <div class="dropdown-menu dropdown-menu-end vw-87.5 vw-md-27.5 rounded-4">
            <CartList @get-cart-list="getCartList"></CartList>
          </div>
        </div>
        <!-- 漢堡選單 -->
        <div class="navbar-toggler custom-toggler px-2" type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation">
          <span class="navbar-toggler-icon">
            <i class="fas fa-bars" />
          </span>
        </div>
      <div id="navbarNavDropdown" class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto fs-5 ms-2">
          <li class="nav-item" @click="navCollapseBack">
            <router-link class="nav-link" to="/">
              首頁
            </router-link>
          </li>
          <li class="nav-item" @click="navCollapseBack">
            <router-link class="nav-link" :to="{ name: 'list', query: { pathCategory: '全部' } }" @click.prevent="toCategory('全部')" exact exact-active-class="active-link">
              書籍列表
            </router-link>
          </li>
          <li class="nav-item" @click="navCollapseBack">
            <router-link class="nav-link" to="/favorite">
              我的收藏
            </router-link>
          </li>
        </ul>
      </div>
      </div>
    </nav>
  </div>
</template>

<script>
import CartList from '@/components/front/CartList.vue'

// 匯入 mapState、 mapActions 方法
import { mapState, mapActions } from 'pinia'
import cartStore from '@/stores/cartStore'
import statusStore from '@/stores/statusStore'
import LocalFavorite from '@/mixins/LocalFavorite'

export default {
  data () {
    return {
      selectedCategory: '全部',
      navIconChange: false
    }
  },
  components: {
    CartList
  },
  mixins: [LocalFavorite],
  computed: {
    ...mapState(cartStore, ['cartData']),
    ...mapState(statusStore, ['isBounced'])
  },
  methods: {
    ...mapActions(cartStore, ['getCartList']),
    navCollapseBack () {
      if (window.matchMedia('(max-width: 767px)').matches) {
        const navbarToggle = document.querySelector('.navbar-toggler')
        navbarToggle.click()
      }
    },
    toCategory(category) {
      this.selectedCategory = category;
      this.$router.push({
        name: 'list',
        query: { pathCategory: category }
      })
    }
  }
}
</script>
