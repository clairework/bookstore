<template>
  <div class="modal fade" ref="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal">
      <div class="modal-content background-transparent">
        <div class="modal-header bg-primaryLight text-center p-3">
          <h4 class="modal-title text-dark">新增優惠券</h4>
        </div>
        <div class="modal-body bg-white p-6">
          <div class="row">
            <div class="mb-3 col">
              <label for="code" class="form-label">優惠碼</label>
              <input id="code" type="text" min="0" class="form-control" placeholder="請輸入優惠碼"
              v-model.trim="tempModalData.code">
            </div>
            <div class="mb-3 col">
              <label for="title" class="form-label">名稱</label>
              <input id="title" type="text" min="0" class="form-control" placeholder="請輸入名稱"
              v-model.trim="tempModalData.title">
            </div>
          </div>
          <div class="row">
            <div class="mb-3 col">
              <label for="percent" class="form-label">折扣百分比</label>
              <input id="percent" type="text" min="0" class="form-control" placeholder="請輸入折扣百分比"
              v-model.number="tempModalData.percent">
            </div>
            <div class="mb-3 col">
              <label for="due_date" class="form-label">到期日</label>
              <input id="due_date" type="date" min="0" class="form-control" placeholder="到期日"
              v-model="due_date">
            </div>
          </div>
          <p class="fw-bold fs-4 mb-2">是否啟用</p>
          <label class="switch">
            <input type="checkbox"
            v-model="tempModalData.is_enabled"
            :true-value="1" :false-value="0">
            <span class="slider"></span>
          </label>
        </div>
        <div class="modal-footer flex-nowrap bg-white">
          <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary text-white" @click="$emit('update-Coupons',tempModalData,isCreateNew)">確定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'

export default {
  mixins: [modalMixin],
  props: ['isCreateNew'],
  data () {
    return {
      due_date: ''
    }
  },
  watch: {
    temp: {
      handler () {
        const dateAndTime = new Date(this.tempModalData.due_date * 1000)
          this.due_date = dateAndTime.toLocaleDateString();
      },
      deep: true
    },
    due_date () {
      this.tempModalData.due_date = Math.floor(new Date(this.due_date) / 1000)
    }
  }
}
</script>
