Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    prop: {
      type: String,
      value: 'index.properties'
    },
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
  }
})
