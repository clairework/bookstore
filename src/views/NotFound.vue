<template>
  <div class="bg-light">
    <div class="container vh-100">
      <div class="d-flex flex-column align-items-center center">
        <img class="size-100 size-md-150" src="../assets/images/bookGif.gif" alt="404 Not Found">
        <h2 class="fw-bold mb-4 fs-1 fs-md-display"> 404 找不到頁面</h2>
        <p class="text-primaryDark fw-bold text-center fs-4 fs-md-3 mb-4">找不到頁面<br class="d-md-none"></p>
        <router-link to="/" class="btn btn btn-primaryDark fs-5 fs-md-4 text-white">回到首頁</router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.size-100{
    width: 100px;
    height: 100px;
}
</style>
