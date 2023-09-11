<template>
  <div class="modal fade" ref="modal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content background-transparent">
          <div class="modal-header border-0 text-center p-1">
          </div>
          <div class="modal-body bg-white text-center">
            <div class="d-flex justify-content-center align-items-center w-100 mb-4">
              <i class="fas fa-exclamation-circle text-danger fs-3 me-3"></i>
              <h5 class="text-danger fw-bold fs-4">是否確定要刪除?</h5>
            </div>
            <p>您即將刪除
              <span class="fw-bold text-dark">{{ tempProduct.title }}
                <span v-if="tempProduct.user"> {{ tempProduct.user?.email }} 的訂單</span>
              </span>
            </p>
          </div>
          <div class="modal-footer bg-white border-0 flex-nowrap w-100">
            <button type="button" class="btn btn-outline-primary w-50" data-bs-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary text-white w-50" @click="$emit('del-item',tempProduct)">確定刪除</button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'

export default {
  mixins: [modalMixin],
  props: ['temp'],
  data () {
    return {
      tempProduct: []
    }
  },
  watch: {
    temp: {
      handler () {
        this.tempProduct = JSON.parse(JSON.stringify(this.temp))
      },
      deep: true
    }
  }
}
</script>
