import { Swiper, SwiperSlide } from 'swiper/vue'
// import { Autoplay, Pagination, Navigation } from 'swiper'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay
} from 'swiper/core'
SwiperCore.use([Autoplay, Pagination, Navigation])

export default {
  data () {
    return {
      modules: [Autoplay, Pagination, Navigation]
    }
  },
  components: {
    Swiper,
    SwiperSlide
  }
}
