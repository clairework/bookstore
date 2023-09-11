<template>
  <div class="container py-5 category-swiper">
    <h2 class="fs-4 fs-md-3 d-inline-block text-primaryDark p-2 fw-bold mb-7"
    :class="{'bg-light': titlebgColor }" v-if="showTitle" style="background-color:white"></h2>
    <swiper
    :slidesPerView="1"
    :space-between="20"
    :autoplay="{delay: 3000,disableOnInteraction: false,}"
    :breakpoints="{
      '576': {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      '768': {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      '992': {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      '1200': {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    }"
    :modules="modules"
    class="custom-card rounded-4 p-2" style="height: 360px">
      <swiper-slide class="card product-img d-flex flex-column shadow border-0" style="height:310px; overflow: hidden" 
      v-for="item in products" :key="item.id" 
      :class="{'d-none': item.is_promote == '1' }"
      >
      <div class="d-flex">
        <div class="position-relative rounded-0 overflow-hidden mb-3">
          <router-link class="" :to="`/product/${item.id}`">

            <img :src="item.imageUrl" :alt="item.title" class="" style="width:220px;">
          </router-link>
        </div>
        <div class="card-body" style="width:120px">
          <h5 class="card-title product-title text-start fw-bold w-100" style="height: 200px; overflow: hidden;line-height:2.3rem;">
            <span class="badge bg-primary text-white me-2">{{ item.category }}</span>
            {{ item.title }}
          </h5>
          <p class="text-gray600 text-end">{{ item.author }}</p>
          <p class="text-primaryMiddle fw-bold fs-4 text-end">NT$ {{ item.price }}</p>
        </div>
      </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import swiperMixin from '@/mixins/swiperMixin'
import { mapState, mapActions } from 'pinia'
import cartStore from '@/stores/cartStore'
import statusStore from '@/stores/statusStore'

export default {
  props: {
    id: {
      type: String
    },
    titlebgColor: {
      type: Boolean
    },
    showTitle: {
      type: Boolean
    }
  },
  mixins: [swiperMixin],
  data () {
    return {
      pageId: this.$route.params.id,
      products: []
    }
  },
  watch: {
    $route (to) {
      this.pageId = to.params.id
    }
  },
  methods: {
    ...mapActions(cartStore, ['addToCart']),
    ...mapActions(statusStore, ['pushMsg']),
    getProducts () {
      let url = ''
      url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products`
      this.$http.get(url)
        .then((res) => {
          this.products = res.data.products
        }).catch(() => {
          this.pushMsg(false, '載入', '請重新整理')
        })
    }
  },
  computed: {
    ...mapState(cartStore, ['cartData', 'isLoadingItem']),
    ...mapState(statusStore, ['isLoading'])
  },
  mounted () {
    this.getProducts()
  }
}
</script>
