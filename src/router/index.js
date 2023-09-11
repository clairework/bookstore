import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/front/FrontView.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/front/IndexHome.vue')
      },
      {
        // path: 'list/:pathCategory',
        path: 'list',
        name: 'list',
        component: () => import('../views/front/ProductList.vue')
      },
      {
        path: 'favorite',
        component: () => import('../views/front/MyFavorite.vue')
      },
      {
        path: 'product/:id',
        component: () => import('../views/front/ProductDetail.vue')
      },
      {
        path: 'login',
        component: () => import('../views/front/LoginView.vue')
      },
      {
        path: 'checkcart',
        component: () => import('../views/front/CheckCart.vue')
      },
      {
        path: 'checkorder',
        component: () => import('../views/front/CheckOrder.vue')
      },
      {
        path: 'checkout/:id',
        component: () => import('../views/front/CheckOut.vue')
      },
      {
        path: 'payment',
        component: () => import('../views/front/PaymentView.vue')
      },
      {
        path: 'orderSearch',
        component: () => import('../views/front/OrderSearch.vue')
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('../views/admin/AdminView.vue'),
    redirect: '/admin/products',
    children: [
      {
        path: 'products',
        component: () => import('../views/admin/ProductsView.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/admin/OrdersView.vue')
      },
      {
        path: 'coupons',
        component: () => import('../views/admin/CouponView.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 讓選項變成啟用中的樣式
  linkActiveClass: 'active'
  // 對於所有路由導航，簡單地讓頁面滾動到頂部
  // scrollBehavior (to, from, savedPosition) {
  //   return {
  //     top: 0,
  //     behavior: 'smooth'
  //   }
  // }
})
// router 命名
router.beforeEach((to, from, next) => {
  // window.document.title = to.meta.title
  next()
})
export default router
