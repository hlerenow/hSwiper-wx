const systemInfo = wx.getSystemInfoSync()
const SCREEN_WIDTH = systemInfo.windowWidth
// const SCREEN_HEIGHT = systemInfo.windowHeight

Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  externalClasses: ['wrap-container'],
  data: {
    itemWidth: SCREEN_WIDTH
  },
  properties: {
    prop: {
      type: String,
      value: 'index.properties'
    },
    dataList: {
      type: Array,
      value: []
    },
    reduceDistance: {
      type: Number,
      value: 0,
      observer: (newVal, oldVal) => {
        this.setData({
          itemWidth
        })
      }
    }
  },
  methods: {

  },
  lifetimes: {
    attached() {
      wx.getSystemInfo({
        success(res) {
          // eslint-disable-next-line no-console
          console.log(res)
        }
      })
    }
  },
  pageLifetimes: {

  }
})
