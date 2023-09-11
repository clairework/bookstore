<template>
<div class="front-check">
  <div class="bg-light">
    <div class="container vh-70 pt-5">
      <div class="row align-items-center pt-5">
        <div class="col">
          <div class="d-flex flex-column align-items-center">
            <i class="fa-solid fa-circle-check fa-4x text-primary mb-4"></i>
            <p class="text-gray600 text-center fs-4 fs-md-3 mb-4">購買完成！</p>
            <p class="text-gray600 text-center fs-6 mb-3">太棒了，歡迎你加入一趟新的學習旅程！</p>
            <p class="text-gray600 text-center mb-4">該頁將在 <span class="text-primaryDark fs-4">{{ count }}</span> 秒後自動跳轉 </p>
            <router-link to="/" class="btn btn-sm btn-primary fs-5 fs-md-4 text-white">回到首頁</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>

export default {
  data () {
    return {
      step: 3,
      orderIsPaid: true,
      count: 3,
      title: '訂單完成'
    }
  },
  components: {
  },
  methods: {
    countDown () {
      this.count--
      if (this.count === 0) {
        this.$router.push('/')
      }
      setTimeout(() => {
        this.countDown()
      }, 3000)
    }
  },
  mounted () {
    this.countDown()
  }
}
</script>
