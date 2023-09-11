<template>
  <footer class="text-white bg-dark footer_base">
    <div class="container">
      <div class="row row-cols-1 row-cols-md-4 py-4 border-1 border-white">
        <div class="col-md-3">
          <h5>關於</h5>
          <p>關於我們</p>
          <p>使用者條款</p>
        </div>
        <div class="col-md-3">
          <h5>幫助</h5>
          <p>常見問題</p>
          <p>隱私權政策</p>
        </div>
        <div class="col-md-6">
          <div class="text-dark d-flex justify-content-md-end">
            <div class="pt-3 pb-3 text-white-70 fs-6">
              <router-link  class="" to="/login">
                <h5 class="text-white-70">管理員登入</h5>
              </router-link>
              <p class="text-white-70 pt-3" style="font-size:16px">ReadHouse 讀舒房 © All Rights Reserved.</p>
              <p class="text-white-70"  style="font-size:16px">本網站僅供個人學習使用，無商業行為</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
