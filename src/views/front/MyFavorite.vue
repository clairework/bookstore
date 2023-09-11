<!-- Views: MyFavorite.vue -->
<template>
  <LoadingView class="loading" :active="isLoading">
      <div class="spinner-border text-primary m-5" role="status">
      <span class="visually-hidden">Loading...</span>
      </div>
  </LoadingView>
  <div class="front-fav">
  <div class="header-banner">
    <div class="container">
      <div class="row pt-5">
          <div class="">
            <p class="pt-2 fw-bold" style="font-size: 42px">我的收藏</p>
          </div>
      </div>
    </div>
  </div>
  <div class="bg-primaryMiddle">
    <section class="favorite-base">
    <div class="container mt-n15 bg-light ps-5 pt-5 rounded-4 shadow">
      <div v-if="favorite.length" class="">
        <div class="row row-cols-xl-4 row-cols-2 row-cols-md-3">
          <div v-for="item in favorite" :key="item.id">
              <div class="bg-light" style="height:460px;width:230px">
                <div class="collectionImg position-relative rounded-4 mb-3 hoverBoxShadow" style="overflow: hidden; width:230px">
                  <RouterLink class="" :to="`/product/${item.id}`">
                    <img :src="item.imageUrl" alt="{{ item.title }}" class="rounded-2 " style="height:320px;width:230px">
                  </RouterLink>
                  <div class="bookMark btn btn-sm position-absolute top-0 end-0 rounded-circle m-2"
                  @click="removeFavoriteItem(item)" :class="favoriteId.includes(item.id) ? 'btn-secondaryDark':'btn-secondaryLight'">
                    <span class="material-icons-outlined text-white fs-4 mt-1" v-if="favoriteId.includes(item.id)">bookmark</span>
                    <span class="material-icons-outlined text-white fs-4 mt-1" v-else>bookmark_border</span>
                  </div>                
                </div>
                <div class="">
                    <div style="max-height: 68px; overflow: hidden;line-height:2rem;">
                    <p class="mb-0 fw-bold d-inline-block text-dark fs-5">{{ item.title }}</p>
                    </div>
                    <div class="d-flex justify-content-between">
                      <p class="text-gray600">{{ item.author}}</p>
                      <p class="text-primary fw-bold text-end fs-5">NT$ {{ $filters.currency(item.price) }}</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="text-center">
          <div class="bg-light py-5 px-2 px-sm-5">
            <h2 class="mb-5 fw-bolder">尚無收藏書籍</h2>
            <router-link class="btn btn-secondary fs-5 fw-bolder" to="/list">
              把喜歡的書籍加入進來吧 !
            </router-link>
          </div>
        </div>
      </div>
      </div>
    </section>
  </div>
</div>
</template>

<script>
import favoriteMixin from '@/mixins/LocalFavorite'

import { mapState, mapActions } from 'pinia'
import cartStore from '@/stores/cartStore'
import statusStore from '@/stores/statusStore'

export default {
  mixins: [favoriteMixin],
  data () {
    return {
      title: ''
    }
  },
  components: {
  },
  computed: {
    ...mapState(cartStore, ['cartData']),
    ...mapState(statusStore, ['isLoadingItem', 'isLoadingItem', 'isLoading'])
  },
  methods: {
    ...mapActions(cartStore, ['addToCart']),
    ...mapActions(statusStore, ['loadingEffect', 'loadingItemEffect', 'pushMsg']),
    toProduct (id) {
      this.$router.push(`/product/${id}`)
    }
  },
  mounted () {
    // this.loadingEffect()
  }
}
</script>
