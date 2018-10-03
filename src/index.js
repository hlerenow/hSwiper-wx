import HTouch from './libs/hTouch'
import {parseStyle, styleStringify} from './libs/utils'

const touchHandle = new HTouch()
const systemInfo = wx.getSystemInfoSync()
const SCREEN_WIDTH = systemInfo.windowWidth
const SCREEN_HEIGHT = systemInfo.windowHeight
/* 动画过渡时间 */
let DURATION = 300
// 视图过度动画实例
const VIEWANI_MATION = wx.createAnimation({
  transformOrigin: '50% 50%',
  duration: DURATION,
  timingFunction: 'ease',
  delay: 0
})
// 视图移动动画实例
const MOVE_ANIMATION = wx.createAnimation({
  transformOrigin: '50% 50%',
  duration: 0,
  timingFunction: 'ease',
  delay: 0
})
/* 触摸句柄 */
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  externalClasses: ['wrap-container'],
  data: {
    /* 每个元素的宽度 */
    itemWidth: SCREEN_WIDTH,
    /* 每个元素的高度 */
    itemHeight: SCREEN_HEIGHT,
    swiperAnmiation: {},
    wrapperStyle: '',
    itemStyle: '',
    nowViewDataIndex: 0,
    nowTranX: 0,
    nowTranY: 0,
    visableDataList: []
  },
  properties: {
    templateName: {
      type: String,
      value: 'hSwiperItem'
    },
    /* 传入的数据 */
    dataList: {
      type: Array,
      value: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    },
    /* 垂直和水平方向各自减少的距离 */
    reduceDistance: {
      type: Number,
      value: 0,
      observer(newVal) {
        let tempReduceDistance = (newVal + this.data.reduceDistanceX) * 2
        this.setData({
          itemWidth: this.data.itemWidth - tempReduceDistance,
          itemHeight: this.data.itemHeight - tempReduceDistance
        })
      }
    },
    /* 水平方向减少的距离 */
    reduceDistanceX: {
      type: Number,
      value: 0,
      observer(newVal) {
        this.setData({
          itemWidth: this.data.itemWidth - newVal - this.reduceDistanceY * 2
        })
      }
    },
    /* 垂直方向减少的距离 */
    reduceDistanceY: {
      type: Number,
      value: 0,
      observer(newVal) {
        this.setData({
          itemHeight: this.data.itemHeight - newVal * 2
        })
      }
    },
    /* 是否为垂直 */
    vertical: {
      type: Boolean,
      value: false
    },
    /* 是否循环 */
    recycle: {
      type: Boolean,
      value: true
    },
    /* 是否自动播放 */
    autoPlay: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    touchstart: touchHandle.touchstart.bind(touchHandle),
    touchmove: touchHandle.touchmove.bind(touchHandle),
    touchend: touchHandle.touchend.bind(touchHandle),
    registerTouchEvent() {
      touchHandle.listen('touchleft', (data) => {
        this.nextView()
        console.log(data.type)
      })
      touchHandle.listen('touchup', (data) => {
        console.log(data.type)
      })
      touchHandle.listen('touchright', (data) => {
        this.preView()
        console.log(data.type)
      })
      touchHandle.listen('touchdown', (data) => {
        console.log(data.type)
      })
    },
    /**
     * 动态更新指定样式属性变量的值
     * @param {*} attr 样式属性名
     * @param {*} val 样式属性值
     * @param {*} styleName 样式变量
     */
    updateDomStyle(styleObj, styleName) {
      let {itemStyle} = this.data
      let style = parseStyle(itemStyle)
      style = Object.assign(style, styleObj)
      this.setData({
        [styleName]: styleStringify(style)
      })
      console.log(this.data)
    },
    /* 初始化dom 结构 */
    initStruct() {
      let {itemHeight, itemWidth} = this.data
      let count = this.data.dataList.length
      // 更新容器的宽度，默认
      this.updateDomStyle({
        width: count * itemWidth + 'px',
        height: itemHeight + 'px'
      }, 'wrapperStyle')

      this.updateDomStyle({
        width: itemWidth + 'px',
        height: itemHeight + 'px'
      }, 'itemStyle')
    },
    /* 计算可视区域元素，用于 */
    calViasbleDataList() {
      /* 区分是否支持循环滚动 */
      let res = []
      let {dataList, nowViewDataIndex} = this.data
      let dataCount = dataList.length
      let pre1 = (dataCount + (nowViewDataIndex - 1)) % dataCount
      let pre2 = (dataCount + (nowViewDataIndex - 2)) % dataCount
      let next1 = (nowViewDataIndex + 1) % dataCount
      let next2 = ((nowViewDataIndex + 2)) % dataCount
      res[0] = dataList[pre2]
      res[1] = dataList[pre1]
      res[2] = dataList[nowViewDataIndex]
      res[3] = dataList[next1]
      res[4] = dataList[next2]
      this.setData({
        visableDataList: res
      })
    },
    /**
     * @description 移动到指定dom index 位置
     * @param {*} domIndex dom元素的index
     * @param {*} useAnimation 是否启用过渡动画
     */
    moveViewTo(domIndex, useAnimation) {
      console.log('domIndex', domIndex)
      let {
        itemWidth, itemHeight, reduceDistance, reduceDistanceX, reduceDistanceY, vertical
      } = this.data
      let pos = 0
      let attr = 'translateX'
      /* 垂直方向 */
      if (vertical) {
        pos = -domIndex * itemHeight + (reduceDistance + reduceDistanceY)
        attr = 'translateY'
      } else {
        /* 水平方向 */
        pos = -domIndex * itemWidth + (reduceDistance + reduceDistanceX)
        attr = 'translateX'
      }
      /* 是否启用动画过渡 */
      if (useAnimation) {
        VIEWANI_MATION[attr](pos).translate3d(0).step()
        this.setData({
          swiperAnmiation: VIEWANI_MATION.export()
        })
      } else {
        MOVE_ANIMATION[attr](pos).translate3d(0).step()
        this.setData({
          swiperAnmiation: MOVE_ANIMATION.export()
        })
      }

      let p = new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, DURATION)
      })
      return p
    },
    /* 向后一个视图 */
    nextView(useAnimation = true) {
      let {nowViewDataIndex, dataList} = this.data
      return this.moveViewTo(3, useAnimation).then(() => {
        let nextIndex = nowViewDataIndex + 1
        let len = dataList.length
        nextIndex = Math.abs(nextIndex % len)
        this.setData({
          nowViewDataIndex: nextIndex
        })
        this.calViasbleDataList()
        this.moveViewTo(2)
        return null
      })
    },
    /* 向前一个视图 */
    preView(useAnimation = true) {
      let {nowViewDataIndex, dataList} = this.data
      return this.moveViewTo(1, useAnimation).then(() => {
        let nextIndex = nowViewDataIndex - 1
        let len = dataList.length
        nextIndex = Math.abs((nextIndex + len) % len)
        this.setData({
          nowViewDataIndex: nextIndex
        })
        this.calViasbleDataList()
        this.moveViewTo(2)
        return null
      })
    },
    movePos(pos) {
      let {
        vertical, viewAnimation, nowTranX, nowTranY
      } = this.data
      let nowTran = nowTranX
      let attr = 'translateX'
      if (vertical) {
        attr = 'translateY'
        nowTran = nowTranY
      } else {
        attr = 'translateX'
        nowTran = nowTranX
      }
      let tempPos = nowTran + pos
      let count = this.data.list.length > 0 ? (this.data.list.length) : 1
      let minPos = -this.itemWidth * (count - 1) - 40
      let maxPos = 40

      // 最大的位置
      if (tempPos > maxPos) {
        tempPos = maxPos
      }

      if (tempPos < minPos) {
        tempPos = minPos
      }
      viewAnimation[attr](pos).translate3d(0).step()
      this.setData({
        swiperAnmiation: this.data.viewAnimation.export()
      })
    }
  },
  lifetimes: {
    created() {
      this.registerTouchEvent()
    },
    ready() {
      this.triggerEvent('customevent', this)
      this.initStruct()
      this.calViasbleDataList()
      this.moveViewTo(2)
      console.log(this.data)
    }
  },
  pageLifetimes: {}
})
