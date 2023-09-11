import BsModal from 'bootstrap/js/dist/modal'

export default {
  props: ['temp'],
  data () {
    return {
      tempModalData: {},
      modal: ''
    }
  },
  watch: {
    temp: {
      handler () {
        this.tempModalData = JSON.parse(JSON.stringify(this.temp))
      },
      deep: true
    }
  },
  methods: {
    openModal () {
      this.modal.show()
    },
    hideModal () {
      this.modal.hide()
    }
  },
  mounted () {
    this.modal = new BsModal(this.$refs.modal)
  }
}
