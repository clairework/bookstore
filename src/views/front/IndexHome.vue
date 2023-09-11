<template>
    <LoadingView class="loading" :active="isLoading">
        <div class="spinner-border text-primary m-5" role="status">
        <span class="visually-hidden">Loading...</span>
        </div>
    </LoadingView>
    <!-- 表頭 -->
    <div class="bg-white">
      <section class="bg-gray200">
    <div class="container section-banner bg-cover1">
    </div>
    </section>


    <!--最新課程-->
    <section class="bg-white pt-4">
        <div class="container">
          <div class="row">
            <h2 class="mx-auto title-dec mt-2">
              <span class="bookicon" /><img class="bookicon me-1" src="../../assets/images/bookicon1.png"><span class="text-dark fs-3 fw-bold">最新書籍  </span>
              <span class="text-gray600 fs-6">各類選書等你選購</span>
            </h2>
            <CategorySwiper />
          </div>
        </div>
    </section>

    <!--興趣分類-->
    <section class="bg-light pb-4 pt-2">
       <div class="container section-category">
        <div class="row py-5 mx-3">
           <div class="col-lg-12 col-12">
            <div class="row row-cols-4 ">
                <div
                 v-for="item in categories"
                  :key="item.category"
                  class="card-small rounded-4 me-3 mb-3 ps-3 d-flex justify-content-center align-items-center active-link"
                >
                    <a @click.prevent="toCategory(item.category)" class="d-flex justify-content-center align-items-center">
                      <h4 class="fw-bold text-gray700 me-2">{{ item.name }}</h4>
                      <img class="cate-img" :src="'./images/' + item.iconUrl" :alt="item.name">
                    </a>
                </div>
            </div>
           </div>
        </div>
    </div>
    </section>

    <!--閱讀推薦-->
    <section class="pt-2">
      <div class="container py-5">
        <h2><img class="bookicon me-1" src="../../assets/images/bookicon1.png"><span class="fs-3 fw-bold">閱讀推薦</span> <span class="text-gray600" style="font-size:16px">  讓人欲罷不能的文學小說</span></h2>
        <div class="row pt-3">
            <div class="col-6">
              <router-link class="fs-5 bg-white bookintro " to="/product/-NWBKR4TObS5k_mrF644">
              <div class="row fs-6">
                <div class="col-md-5 mb-4">
                    <img src="../../assets/images/books/book07.jpg" class="img-fluid mx-auto d-block" alt="">
                </div>
                <div class="col-md-7 mb-4">
                  <h2>不便利的便利店2</h2>
                  <p class="text-gray600">人來去，心留駐，24小時亮著燈的地方，<br>
                    替疲憊的靈魂設下安慰的哨站<br>
                    <br>
                    讓你從心底暖起來的冠軍小說<br>
                    更多的療癒與驚喜，精采結局，等待您再度光臨！<br>
                    <br>
                    橫掃台韓各大書店年度榜單＼狂銷破百萬冊<br>
                    韓國35個都市特選「年度之書」＼圖書館借閱次數最多<br>
                    售出16國版權＼影視改編熱烈進行中</p>
                </div>
              </div>
              </router-link>
            </div>
            <div class="col-6">
              <router-link class="fs-5 bg-white bookintro " to="/product/-NWFmquGfDfmQQvQIjTJ">
              <div class="row fs-6">
                <div class="col-md-5 mb-4">
                    <img src="../../assets/images/books/book11.jpg" class="img-fluid mx-auto d-block" alt="">
                </div>
                <div class="col-md-7 mb-4 ">
                  <h2>歡迎光臨夢境百貨</h2>
                  <p class="text-gray600">您所訂購的夢已銷售一空<br>
                  <br/>
                    大疫之年的希望之書如果夢境可以購買，你會訂購怎樣的夢？ 這個夢，會訴說什麼關於生命的真相？</p>
                  <p class="text-gray600">夢的存在看似虛幻，但夢，讓人更懷念過去、更期待未來、更珍惜現在。
如果能買夢，我會欣然訂購的！──洪安妮（創作歌手）
 
在這個地方，天天有著因夢而觸發的祕密，以及感動人心的點滴。
各樣夢境應有盡有的「達樂古特夢境百貨」──
「睡著後才能入場喔！」</p>
                </div>
               </div>
               </router-link>
            </div>
        </div>
      </div>
    </section>

    <!--商業理財推薦-->
    <section class="bg-primaryLight pb-4 pt-2">
      <div class="container text-white fw-bold" style="font-size:70px">
      <div class="container py-5">
        <p><img class="bookicon me-1" src="../../assets/images/bookicon.png"><span class="fs-3 fw-bold text-primaryDark">商業理財推薦</span> <span class="text-white" style="font-size:16px">  一起努力提升職場力</span></p>
        <div class="row pt-3">
            <div class="me-2 col-xl-6 col-12 row mb-4">
            <router-link
              class="fs-5 bg-white bookintro "
              to="/product/-NWFgbcUiqPUeuw_A4lD"
            > 
              <div class="d-flex m-2" style="cursor: pointer;">            
                <div class="col-md-5 my-4 me-2">
                    <img src="../../assets/images/books/book10.jpg" class="mx-auto d-block" alt="" style="height:280px; width:196px">
                </div>
                <div class="col-md-7 my-4 pe-3">
                  <h2 class="text-dark text-center border-primary mb-3 pb-2" style="border-bottom: 2px solid">個人無限公司</h2>
                  <p class="fs-6 text-gray600">轉職和副業的相乘x生涯價值最大化生存法
                    <br>
                      不要低估自己的價值<br>
                  把「願望」轉換成「目標」，<br>
                  將「個人」擴張成「無限公司」<br>
                  你也可以突破停滯不前薪水，過自己想要的生活！<br>
                    </p>
                </div>
              </div>
            </router-link>
            </div>
            <div class="col-xl-6 col-12 row  mb-4">
              <router-link
                      class="fs-5 bg-white bookintro"
                      to="/product/-NWKygfOBa0tkBKCbaqs"
                    >
              <div class="d-flex m-2 " style="cursor: pointer">
                <div class="col-md-5 my-4 me-2">
                    <img src="../../assets/images/books/book08.jpg" class="mx-auto d-block" alt="" style="height:280px;width:196px">
                </div>
                <div class="col-md-7 my-4 px-2 ">
                  <h2 class="text-dark text-center border-primary mb-3 pb-2" style="border-bottom: 2px solid;">超解析加密資產大趨勢</h2>
                  <p class="fs-6 text-gray600">Web3的新金融模式！<br>
                    認識加密貨幣的運作原理、<br>
                    投資方式與隱藏風險</p>
                  <p class="fs-6 text-gray600">愈來愈多人把加密資產視為投資對象，相關技術的推進。</p>
                  <div class="d-flex justify-content-end">
                  </div>
                </div>
              </div>
              </router-link>
            </div>
        </div>
      </div>
      </div>
    </section>

  </div>
</template>
<script>

import CategorySwiper from '@/components/front/CategorySwiper.vue'
import { mapState } from 'pinia'
import statusStore from '@/stores/statusStore'
import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init()

export default {
  data () {
    return {
      categories: [
        {
          category: '商業理財',
          name: '商業理財',
          iconUrl: 'cate01.png'
        },
        {
          category: '語文學習',
          name: '語文學習',
          iconUrl: 'cate02.png'
        },
        {
          category: '醫療保健',
          name: '醫療保健',
          iconUrl: 'cate03.png'
        },
        {
          category: '藝術設計',
          name: '藝術設計',
          iconUrl: 'cate04.png'
        },
        {
          category: '心理勵志',
          name: '心理勵志',
          iconUrl: 'cate09.png'
        },
        {
          category: '宗教命理',
          name: '宗教命理',
          iconUrl: 'cate06.png'
        },
        {
          category: '歷史文化',
          name: '歷史文化',
          iconUrl: 'cate07.png'
        },
        {
          category: '文學小說',
          name: '文學小說',
          iconUrl: 'cate08.png'
        },
        {
          category: '電腦資訊',
          name: '電腦資訊',
          iconUrl: 'cate05.png'
        },
        {
          category: '全部',
          name: '全部',
          iconUrl: 'cate10.png'
        }
      ]
    }
  },
  components: {
    CategorySwiper
  },
  computed: {
    ...mapState(statusStore, ['isLoading'])
  },
  methods: {
     toCategory (category) {
      this.$router.push({
        name: 'list',
        query: { pathCategory: category }
      })
    }
  }
}
</script>
