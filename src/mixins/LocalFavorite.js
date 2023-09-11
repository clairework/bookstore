import { mapActions } from 'pinia'
import statusStore from '@/stores/statusStore'
import Swal from 'sweetalert2'

export default {
  data () {
    return {
      favorite: JSON.parse(localStorage.getItem('favorite')) || [],
      favoriteId: JSON.parse(localStorage.getItem('favoriteId')) || [],
      resentlyViewdProducts: JSON.parse(localStorage.getItem('resentlyViewdProducts')) || []
    }
  },
  watch: {
    // 用locolstorage自訂欄位並存取資料
    favorite: {
      handler () {
        // localStorage只接受字串
        localStorage.setItem('favorite', JSON.stringify(this.favorite))
      },
      deep: true
    },
    favoriteId: {
      handler () {
        localStorage.setItem('favoriteId', JSON.stringify(this.favoriteId))
      },
      deep: true
    },
    resentlyViewdProducts: {
      handler () {
        localStorage.setItem('resentlyViewdProducts', JSON.stringify(this.resentlyViewdProducts))
      },
      deep: true
    }
  },
  methods: {
    ...mapActions(statusStore, ['pushMsg']),
    toggleFavorite (product) {
      const favoriteIndex = this.favorite.findIndex((item) => item.id === product.id)
      if (favoriteIndex === -1) {
        this.favorite.push(product)
        this.favoriteId.push(product.id)
        // this.pushMsg(true, '收藏', '已成功收藏')
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '已成功收藏',
          showConfirmButton: false,
          timer: 2000
        })
      } else {
        this.favorite.splice(favoriteIndex, 1)
        this.favoriteId.splice(favoriteIndex, 1)
        // this.pushMsg(false, '收藏', '已取消收藏')
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: '已取消收藏',
          showConfirmButton: false,
          timer: 2000
        })
      }
      // this.emitter.emit('getfavorite')
    },
    removeFavoriteItem (product) {
      const favoriteIndex = this.favorite.findIndex((item) => item.id === product.id)
      this.favorite.splice(favoriteIndex, 1)
      this.favoriteId.splice(favoriteIndex, 1)
      // this.favoriteId.splice(0, this.favoriteId.length); // 清空資料
      // this.pushMsg(false, '收藏', '已取消收藏')
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: '已取消收藏',
        showConfirmButton: false,
        timer: 2000
      })
      console.log('favorite=>',this.favorite)
      console.log('favoriteId=>',this.favoriteId)
    },
    getLocalStorage () {
      // 讀檔:取出 saveFavorite欄位字串內容轉回物件
      return JSON.parse(localStorage.getItem('favorite'))
    },
    resentlyViewed (product) {
      const resentlyViewdIndex = this.resentlyViewdProducts.findIndex((item) => item.id === product.id)
      // 如果預覽到不同的書籍，增加一筆資料在陣列開頭，讓最新預覽的商品排在最前面
      if (resentlyViewdIndex === -1) {
        this.resentlyViewdProducts.unshift(product)
        if (this.resentlyViewdProducts.length > 10) {
          // 如果總數量超過10，刪除陣列的最後一筆資料
          this.resentlyViewdProducts.pop()
        }
        // 如果預覽到重複的書籍
      } else if (resentlyViewdIndex !== -1) {
        // 先刪除重複的資料
        this.resentlyViewdProducts.splice(resentlyViewdIndex, 1)
        // 再重新推進最新的位置
        this.resentlyViewdProducts.unshift(product)
      }
    }
  }
}
