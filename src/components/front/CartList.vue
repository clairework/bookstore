<template>
  <div ref="cart" class="">
    <div class="card border-0 pb-0" @click="dropdownMenu">
      <div class="h-100 max-h-70vh p-2">
        <ul class="h-100">
          <!-- 如果購物車為空 -->
          <div class="w-100 d-flex flex-column align-items-center py-5"
            v-if="cartData.carts.length === 0">
            <p class="fw-bold fs-4 text-gray300 mb-4">購物車內還沒有商品</p>
          </div>
          <!-- 購物車品項 -->
          <li class="d-flex justify-content-between align-items-center border-bottom-1 p-3" v-for="item in cartData.carts" :key="item.id">
            <div class="d-flex align-items-center justify-content-between">
              <router-link class="cursor-pointer me-2 me-md-4" :to="`/product/${item.product.id}`">
                  <img class="" :src="item.product.imageUrl" :alt="item.product.title" style="height:110px; width:80px">
              </router-link>
              <div class="d-flex align-items-center justify-content-between">
                <div class="pt-2" style="width:200px">
                  <p class="fw-bold fs-5 text-gray700 w-80" >{{ item.product.title }}</p>
                  <p class="fw-bold fs-5 text-primaryMiddle text-end">NT$ {{ item.product.price }}</p>
                </div>
                <div class="ms-md-4 ms-2" >
                  <input class="form-control rounded-0 text-center fs-5"
                    type="number"
                    min="1"
                    max="30"
                    v-model.number="item.qty"
                    inputmode="numeric"
                    :disabled="isDisabled === item.id"
                    style="height:60px; width:80px"
                    @blur="updateCart(item, item.qty)"
                  />
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- 小計 -->
      <div class="p-3 card-footer text-gray200 border-0" v-show="cartData.carts.length">
        <div class="row">
          <div class="col-4">
            <p class="mb-0"> 總計</p>
            <p class="text-start">
            <span class="text-secondaryDark fs-4 fw-bold">NT$ {{ cartData.total }}</span>
          </p>
          </div>
          <div class="col-8">
            <router-link to="/checkcart" class="btn btn-secondary py-2 fs-4 text-primaryDark w-100" @click="this.$refs.cart.click()">前往購物車</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 匯入 mapState、 mapActions 方法
import { mapState, mapActions } from 'pinia'
import cartStore from '@/stores/cartStore'
import statusStore from '@/stores/statusStore'

export default {
  data () {
    return {
      final_total: ''
    }
  },
  watch: {
    cartData: {
      handler () {
        this.final_total = Math.round(this.cartData.final_total)
      },
      deep: true
    }
  },
  computed: {
    ...mapState(cartStore, ['cartData', 'coupon_code']),
    ...mapState(statusStore, ['isLoadingItem'])
  },
  methods: {
    ...mapActions(cartStore, ['getCartList', 'updateCart', 'delCartItem', 'delAllCart', 'addCouponCode']),
    // dropDown點擊後不消失
    dropdownMenu (e) {
      e.stopPropagation()
    }
  },
  mounted () {
    this.getCartList()
  }
}
</script>

<style lang="scss" scoped>
.cursor-default{
  cursor: default;
}
.max-h-70vh{
  max-height:70vh;
}
</style>
