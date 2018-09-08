import HTouch from './libs/hTouch'

const touchHandle = new HTouch()
console.log(touchHandle)
const systemInfo = wx.getSystemInfoSync()
const SCREEN_WIDTH = systemInfo.windowWidth
const SCREEN_HEIGHT = systemInfo.windowHeight
/* 触摸句柄 */
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  externalClasses: ['wrap-container'],
  data: {
    itemWidth: SCREEN_WIDTH,
    itemHeight: SCREEN_HEIGHT,
    swiperAnmiation: {}
  },
  properties: {
    templateName: {
      type: String,
      value: 'hSwiperItem'
    },
    dataList: {
      type: Array,
      value: [1, 2, 3, 4]
    },
    reduceDistance: {
      type: Number,
      value: 0,
      observer(newVal) {
        this.setData({
          itemWidth: this.data.itemWidth - newVal - this.data.reduceDistanceX,
          itemHeight: this.data.itemHeight - newVal
        })
      }
    },
    reduceDistanceX: {
      type: Number,
      value: 0,
      observer(newVal) {
        this.setData({
          itemWidth: this.data.itemWidth - newVal - this.reduceDistanceY
        })
      }
    },
    reduceDistanceY: {
      type: Number,
      value: 0,
      observer(newVal) {
        this.setData({
          itemHeight: this.data.itemHeight - newVal
        })
      }
    }
  },
  methods: {
    touchstart: touchHandle.touchstart.bind(touchHandle),
    touchmove: touchHandle.touchmove.bind(touchHandle),
    touchend: touchHandle.touchend.bind(touchHandle),
    registerTouchEvent() {
      touchHandle.listen('touchleft', (data) => {
        console.log(data.type)
      })
      touchHandle.listen('touchup', (data) => {
        console.log(data.type)
      })
      touchHandle.listen('touchright', (data) => {
        console.log(data.type)
      })
      touchHandle.listen('touchdown', (data) => {
        console.log(data.type)
      })
    }
  },
  lifetimes: {
    created() {
      this.registerTouchEvent()
    }
  },
  pageLifetimes: {
  }
})
