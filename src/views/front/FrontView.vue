<template>
  <div class="">
    <FrontNavbar/>
    <GoTop/>
    <router-view/>
    <FooterComponent/>
  </div>
</template>

<script>
import FrontNavbar from '@/components/front/FrontNavbar.vue'
import FooterComponent from '@/components/front/FooterComponent.vue'
import GoTop from '@/components/front/GoTop.vue'

export default {
  components: {
    FrontNavbar,
    FooterComponent,
    GoTop
  }
}
</script>
