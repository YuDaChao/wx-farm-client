import { debounce } from '@/libs/util'
export default {
  mounted() {
    this.__resizeHandler = debounce(() => {
      if (this.charts) {
        this.charts.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHandler)

    const sidebarElm = document.getElementsByClassName('left-sider')[0]
    sidebarElm.addEventListener('transitionend', this.sidebarResizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.__resizeHandler)

    const sidebarElm = document.getElementsByClassName('left-sider')[0]
    sidebarElm.removeEventListener('transitionend', this.sidebarResizeHandler)
  },
  methods: {
    sidebarResizeHandler(e) {
      if (e.propertyName === 'width') {
        this.__resizeHandler()
      }
    }
  }
}
