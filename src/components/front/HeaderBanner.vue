<template>
  <section class="header-banner">
    <div class="title">
      <div class="container">
        <div class="row justify-content-end">
          <div class="col-md-6">
            <h2 class="text-white">{{ title }}</h2>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  }
}
</script>
