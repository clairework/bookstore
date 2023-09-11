<template>
  <div id="goTop">
    <button type="button" class="goTop btn btn-primary" v-if="scY > 300" @click="toTop">
      <span class="text-white">
      <i class="fas fa-chevron-up" />
      </span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'goTop',
  data () {
    return {
      scTimer: 0,
      scY: 0
    }
  },
  methods: {
    handleScroll () {
      if (this.scTimer) return
      this.scTimer = setTimeout(() => {
        this.scY = window.scrollY
        clearTimeout(this.scTimer)
        this.scTimer = 0
      }, 100)
    },
    toTop () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  unmounted () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
<style lang="scss">
.goTop {
  position: fixed;
  z-index: 100;
  right: 30px;
  bottom: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
}
</style>
