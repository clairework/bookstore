<template>
    <swiper ref="{swiperRef}"
      :centeredSlides="true"
      :spaceBetween="20"
      :loop="true"
      :speed="1000"
      :navigation="true"
      :breakpoints="{'768': {slidesPerView: 1,spaceBetween: 20,},}"
      :autoplay='{ "delay": 3000, "disableOnInteraction": false }' class="text-center">
        <swiper-slide>
            <div class="bg-cover1">
            </div>
        </swiper-slide>
        <swiper-slide >
            <div class="bg-cover2">
            </div>
        </swiper-slide>
    </swiper>
</template>

<script>
import swiperMixin from '@/mixins/swiperMixin'

export default {
  mixins: [swiperMixin]
}
</script>
