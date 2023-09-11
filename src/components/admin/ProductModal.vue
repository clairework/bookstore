<template>
  <div class="modal fade" ref="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content background-transparent">
        <div class="modal-header bg-primary">
          <h4 class="modal-title text-white">{{ isCreateNew ? '新增' : '編輯' }}商品資訊</h4>
        </div>
        <div class="modal-body bg-white">
          <div class="d-flex justify-content-center align-items-center">
            <div class="nav flex-column w-15 nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
              <button class="nav-link fw-bold w-100 active" id="v-pills-info-tab" data-bs-toggle="pill" data-bs-target="#v-pills-info" type="button" role="tab" aria-controls="v-pills-info" aria-selected="true">商品資訊</button>
              <button class="nav-link fw-bold w-100" id="v-pills-detail-tab" data-bs-toggle="pill" data-bs-target="#v-pills-detail" type="button" role="tab" aria-controls="v-pills-detail" aria-selected="false">內容介紹</button>
              <button class="nav-link fw-bold w-100" id="v-pills-detail-tab1" data-bs-toggle="pill" data-bs-target="#v-pills-detail1" type="button" role="tab" aria-controls="v-pills-detail1" aria-selected="false">作者介紹</button>
              <button class="nav-link fw-bold w-100" id="v-pills-detail-tab1" data-bs-toggle="pill" data-bs-target="#v-pills-detail2" type="button" role="tab" aria-controls="v-pills-detail2" aria-selected="false">目錄介紹</button>
              <button class="nav-link fw-bold w-100" id="v-pills-imgUpload-tab" data-bs-toggle="pill" data-bs-target="#v-pills-imgUpload" type="button" role="tab" aria-controls="v-pills-imgUpload" aria-selected="false">圖片上傳</button>
            </div>
            <div class="tab-content w-85" id="v-pills-tabContent">
              <!-- 商品資訊 -->
              <div class="tab-pane fade show active" id="v-pills-info" role="tabpanel" aria-labelledby="v-pills-info-tab">
                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="title" class="form-label">標題</label>
                      <input id="title" type="text" class="form-control" placeholder="請輸入標題" v-model.trim="tempModalData.title">
                      </div>
                      <div class="mb-3 col-md-6">
                        <label for="courseType" class="form-label">副標題</label>
                        <input id="courseType" type="text" class="form-control" placeholder="請輸入類型"
                          v-model.trim="tempModalData.subTitle">
                      </div>
                    </div>
                    <div class="row">
                      <div class="mb-3 col-3">
                        <label for="category" class="form-label">類別</label>
                        <input id="category" type="text" class="form-control" placeholder="請輸入類別"
                          v-model.trim="tempModalData.category">
                      </div>
                      <div class="mb-3 col-3">
                        <label for="author" class="form-label">作者</label>
                        <input id="author" type="text" class="form-control" placeholder="請輸入作者"
                        v-model.trim="tempModalData.author">
                      </div>
                      <div class="mb-3 col-3">
                        <label for="publishing_house" class="form-label">出版社</label>
                        <input id="publishing_house" type="text" class="form-control" placeholder="出版社"
                          v-model.trim="tempModalData.publishing_house">
                      </div>
                      <div class="mb-3 col-3">
                        <label for="publication_date" class="form-label">出版日期</label>
                        <input id="publication_date" type="date" class="form-control" placeholder="請輸入出版日期"
                        v-model.trim="tempModalData.publication_date">
                      </div>
                    </div>
                    <div class="row">
                      <div class="mb-3 col-md-3">
                        <label for="origin_price" class="form-label">定價</label>
                        <input id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入定價"
                        v-model.number="tempModalData.origin_price">
                      </div>
                      <div class="mb-3 col-md-3">
                        <label for="price" class="form-label">售價</label>
                        <input id="price" type="number" min="0" class="form-control"
                          placeholder="請輸入售價" v-model.number="tempModalData.price">
                      </div>
                      <div class="mb-3 col-md-3">
                        <label for="inventory" class="form-label">庫存</label>
                        <input id="inventory" type="number" min="0"  class="form-control" placeholder="請輸入庫存數量"
                        v-model.number="tempModalData.inventory">
                      </div>
                      <div class="mb-3 col-md-3">
                        <label for="unit" class="form-label">單位</label>
                        <input id="unit" type="text" class="form-control" placeholder="請輸入單位"
                        v-model.trim="tempModalData.unit">
                      </div>
                    </div>
                    <div class="row">
                      <div class="mb-3 col">
                          <label for="content" class="form-label">書籍簡介</label>
                          <ckeditor :editor="editor" :config="editorConfig" v-model="tempModalData.description"></ckeditor>
                      </div>
                    </div>
              </div>
              <!-- 商品詳情 -->
              <div class="tab-pane fade" id="v-pills-detail" role="tabpanel" aria-labelledby="v-pills-detail-tab">
                <div class="row w-100">
                  <div class="mb-3 col">
                    <label for="description" class="form-label">內容介紹</label>
                    <ckeditor :editor="editor" :config="editorConfig" v-model="tempModalData.content"></ckeditor>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="v-pills-detail1" role="tabpanel" aria-labelledby="v-pills-detail-tab1">
                <div class="row">
                  <div class="col-6 mb-3">
                    <label for="author_intro" class="form-label">作者簡介</label>
                    <ckeditor :editor="editor" :config="editorConfig" v-model="tempModalData.author_intro"></ckeditor>
                  </div>
                  <div class="col-6 mb-3">
                      <label for="translator_intro" class="form-label">譯者簡介</label>
                      <ckeditor :editor="editor" :config="editorConfig" v-model="tempModalData.translator_intro"></ckeditor>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="v-pills-detail2" role="tabpanel" aria-labelledby="v-pills-detail-tab2">
                <div class="mb-3 col">
                  <label for="table_contents" class="form-label">目錄</label>
                  <ckeditor :editor="editor" :config="editorConfig" style="height:400px" v-model="tempModalData.table_contents"></ckeditor>
                </div>
              </div>
              <!-- 圖片上傳 -->
              <div class="tab-pane fade" id="v-pills-imgUpload" role="tabpanel" aria-labelledby="v-pills-imgUpload-tab">
                <div class="d-flex align-items-center">
                  <div class="bookImg me-3">
                    <p class="fw-bold fs-4 text-center mb-2">書籍封面</p>
                    <img class="ratio ratio-3x4 rounded-4 bg-light" :src="tempModalData.imageUrl" :alt="tempModalData.title">
                  </div>
                  <div class="bookImg me-3" v-if="tempModalData.imgPreviewURL">
                    <p class="fw-bold fs-4 text-center mb-2">圖片預覽</p>
                    <img class="ratio ratio-3x4 rounded-4" :src="tempModalData.imgPreviewURL" :alt="tempModalData.title">
                  </div>
                  <div>
                    <p class="fw-bold fs-4 mb-2">圖片上傳</p>
                    <input type="text" class="form-control mb-2" v-model="tempModalData.imageUrl" placeholder="請輸入圖片連結">
                    <!-- 上傳圖片 -->
                    <div class="input-group mb-5">
                      <input type="file" class="form-control" ref="fileInput" id="imgUploadInput" aria-describedby="imgUploadFileAddon" aria-label="Upload" @change="chooseImg">
                      <button class="btn btn-primary text-white" type="button" id="imgUploadFileAddon" @click.prevent="upload">確認上傳</button>
                    </div>
                    <!-- ToggleSwitch -->
                    <p class="fw-bold fs-4 mb-2">是否上架</p>
                    <label class="switch">
                      <input type="checkbox"
                      v-model="tempModalData.is_enabled"
                      :true-value="1" :false-value="0">
                      <span class="slider"></span>
                    </label>
                    <!-- ToggleSwitch -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer bg-white">
          <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary text-white" @click="$emit('update-products',tempModalData,isCreateNew)">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import statusStore from '@/stores/statusStore'
import modalMixin from '@/mixins/modalMixin'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
export default {
  mixins: [modalMixin],
  props: ['isCreateNew'],
  data () {
    return {
      publication_date: '',
      editor: ClassicEditor,
      editorConfig: {
        toolbar: ['heading', 'bold', 'italic', '|', 'link']
      }
    }
  },
  methods: {
    ...mapActions(statusStore, ['pushMsg']),
    // 圖片預覽效果
    chooseImg (e) {
      const [file] = e.target.files
      this.tempModalData.imgPreviewURL = window.URL.createObjectURL(file)
    },
    // 圖片上傳
    upload () {
      const file = this.$refs.fileInput.files[0]
      const formData = new FormData()
      formData.append('file-to-upload', file)
      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/upload`, formData)
        .then(res => {
          this.pushMsg(res, '上傳', '圖片已成功上傳')
          this.tempModalData.imageUrl = res.data.imageUrl
          this.tempModalData.imgPreviewURL = ''
        }).catch(() => {
          this.pushMsg(false, '上傳', '圖片上傳失敗')
        })
    }
  }
}
</script>

<style lang="scss">
.bookImg{
  width: 150px;
}
.ck-editor__editable {
  height: 300px !important;
}
</style>
