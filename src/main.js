import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import 'bootstrap'
import axios from 'axios'
import VueAxios from 'vue-axios'

import { Skeletor } from 'vue-skeletor'

// fontawsome
import '@fortawesome/fontawesome-free'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

import 'material-icons'
import 'bootstrap-icons/font/bootstrap-icons.css'
import CKEditor from '@ckeditor/ckeditor5-vue'
import Loading from 'vue3-loading-overlay' // component
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css' // style
import VueSweetalert2 from 'vue-sweetalert2'
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'
import AllRules from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
import { date, currency } from '@/methods/filters.js'
import App from './App.vue'
import router from './router'
import emitter from '@/methods/emitter'

// 定義驗證規則
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})

// 設定 vee-validate 全域規則
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true // 調整為輸入字元立即進行驗證
})

// 設定預設語系
setLocale('zh_TW')

const pinia = createPinia()
const app = createApp(App)
app.config.globalProperties.$emitter = emitter
app.use(pinia)
pinia.use(({ store }) => {
  store.$router = markRaw(router)
})
app.use(router)

app.config.globalProperties.$filters = { date, currency }

app.use(VueAxios, axios)
app.use(CKEditor)

// swal設定
const options = {
  cancelButtonClass: 'btn btn-outline-dark',
  buttonsStyling: false,
  focusCancel: true
}

app.use(VueSweetalert2, options)
app.use(CKEditor)
app.component('LoadingView', Loading)
app.component('FormView', Form)
app.component('FieldView', Field)
app.component('ErrorMessage', ErrorMessage)
app.component(Skeletor.name, Skeletor)

app.mount('#app')
