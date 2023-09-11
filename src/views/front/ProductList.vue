<template>
  <LoadingView class="loading" :active="isLoading">
    <div class="spinner-border text-primary m-5" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </LoadingView>
  <div class="front front-products">
  <section class="setction_title bg-primaryLight pt-5 header-banner" style="height: 200px;">
    <div class="container">
      <h1 class="fw-bold mb-2">{{ this.ShowCategory }}</h1>
    </div>
  </section>
  <section class="list-base section_products mt-3 mt-md-5">
    <div class="container">
        <h3 class="fw-bold text-gray700 mb-4">有 {{ products.length }} 項 <span class="text-primary"> {{ this.ShowCategory }} </span> 結果</h3>
        <!--menu-->
        <div class="d-flex flex-row pb-3 mb-5 border-gray300" >
            <ul class="d-flex flex-row text-gray300" style="font-size:22px; border-bottom: 1px solid">
              <li class="me-4 fw-bold cursor-pointer" v-for="item in categories" :key="item.category"
              :class="isActive === item.category ? 'active-line' : 'unactive-line'"
              @click="filterCategory(item.category),(isActive = item.category)" >{{ item.name }}
              </li>
            </ul>
        </div>
        <!-- product清單 -->
        <div class=" row row-cols-1 row-cols-md-2 row-cols-xxl-4  row-cols-lg-3 ms-5 ms-md-0 mt-5 ">
          <div v-for="item of products" :key="item.id" class="col mb-4">
            <div class="card rounded-0 shadow border-primary" style="width: 280px; height:510px;border-bottom: 7px solid"
             @click.prevent="getProduct(item.id)">
                <div class="card-header bg-white pt-3 border-0">
                  <div class="img-box mx-auto">
                      <img :src="item.imageUrl" class="img-fluid rounded-0">
                  </div>
                </div>
                <div class="card-body border-0" style="height:100px">
                    <div class="" style="height: 100px">
                      <h6 class="card-title product-title" style="max-height: 68px; overflow: hidden;line-height:2.3rem;">
                        <span class="badge bg-primary text-white me-2">{{item.category}}</span>
                        {{ item.title }}
                      </h6>
                      <p class="text-gray" style="height:28px; overflow: hidden;">作者 {{ item.author }}</p>
                    </div>
                    <p class="prices d-flex justify-content-end ">
                      <span class="fs-5 text-primaryMiddle fw-bold text-end">NT$ {{ $filters.currency(item.price) }}</span>
                    </p>
                </div>
            </div>
          </div>
        </div>
    </div>
  </section>
  <div class="" style="height: 40px">
  </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import statusStore from '@/stores/statusStore'

export default {
  components: {
  },
  data () {
    return {
      products: [],
      isActive: '',
      isLoading: '',
      title: '',
      CateName: '',
      ShowCategory: '',
      categories: [
        {
          category: '全部',
          name: '全部',
          iconUrl: 'cate10.png'
        },
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
          iconUrl: 'cate05.png'
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
          iconUrl: 'cate09.png'
        }
      ],
      courseType: [
        {
          category: '影音',
          name: '影音課程'
        },
        {
          category: '直播',
          name: '直播'
        },
        {
          category: '文章',
          name: '文章'
        }
      ]
    }
  },
  created () {
    const pathCategory = this.$route.query.pathCategory;
    this.getProducts(pathCategory)
    console.log('created:',pathCategory)
    
  },
  methods: {
    ...mapActions(statusStore, ['pushMsg']),
    filterCategory (category) {
      this.category = category
      this.CateName = this.category
      this.getProducts(category)
    },
    getProducts (category) {
      this.isActive = ''
      const { pathCategory } = this.$route.params;
      console.log('getProducts:pathCategory:',pathCategory)
      if (category) {
        this.ShowCategory = category
      }
      let url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`
      if (category !== '全部') {
        url = `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/products?category=${category}`
      }
      this.isActive = category
      this.isLoading = true
      this.$http.get(url)
        .then((res) => {
          this.products = res.data.products
          this.isLoading = false
        }).catch(() => {
          this.isLoading = false
        })
    },
    getProduct(id) {
      this.$router.push(`/product/${id}`);
    },
    computed: {
      ...mapState(statusStore, ['isLoadingItem'])
    },
    mounted () {
      if (this.$route.params.category !== undefined) {
        this.category = this.$route.params.pathCategory
        this.isActive = this.category        
      }
      // console.log('mounted this.category=>',this.category)
      this.getProducts()
    }
  }
}
</script>
