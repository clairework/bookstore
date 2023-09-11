<template>
  <div class="admin-nav sticky-top">
    <!-- nav -->
    <nav class="shadow-sm navbar navbar-expand-lg sticky-top align-items-center shadows bg-white text-white" id="admin-nav">
      <div class="container">
        <!-- logo -->
        <router-link class="navbar-brand" to="/">
          <img src="../../assets/images/logo.png" alt="讀舒房" style="height: 60px">
        </router-link>
        <!-- 漢堡選單 -->
        <div class="navbar-toggler custom-toggler px-2" type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation">
          <span class="navbar-toggler-icon">
            <i class="fas fa-bars" />
          </span>
        </div>
      <div id="navbarNavDropdown" class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto fs-5 ms-2 bg-white">
          <li class="nav-item" @click="navCollapseBack">
            <router-link
              class="nav-link nav_jq"
              to="/admin/products"
            >
              商品管理
            </router-link>
          </li>
          <li class="nav-item" @click="navCollapseBack">
            <router-link
              class="nav-link nav_jq"
              to="/admin/orders"
            >
              訂單管理
            </router-link>
          </li>
          <li class="nav-item" @click="navCollapseBack">
            <router-link
              class="nav-link nav_jq"
              to="/admin/coupons"
            >
              優惠券管理
            </router-link>
          </li>
        </ul>
      </div>
      </div>
    </nav>
  </div>
</template>

<script>

export default {
  methods: {
    navCollapseBack () {
      if (window.matchMedia('(max-width: 767px)').matches) {
        const navbarToggle = document.querySelector('.navbar-toggler')
        navbarToggle.click()
      }
    }
  }
}
</script>
