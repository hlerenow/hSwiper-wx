Page({
  data: {
    dataList: [
      'http://statics.h-five.com/db2.jpg',
      'http://statics.h-five.com/db3.jpg',
      'http://statics.h-five.com/little-love.jpg',
      'http://statics.h-five.com/withme.jpg'
    ],
    dataList2: [0, 1, 2, 3, 4],
    moveTo: 0,
    recyle: false
  },
  onReady() {
    if (this.data.recyle) {
      setInterval(() => {
        this.setData({
          moveTo: (this.data.moveTo + 1) % this.data.dataList.length
        })
        console.log('change view')
      }, 1000)
    }
  },
  alreadyFirstView(e) {
    console.log('alreadyFirstView', e)
  },
  firstView(e) {
    console.log('firstView', e)
  },
  beforeViewChange(e) {
    console.log('beforeViewChange', e)
  },
  afterViewChange(e) {
    console.log('afterViewChange', e)
  },
  lastView(e) {
    console.log('lastView', e)
  },
  alreadyLastView(e) {
    console.log('alreadyLastView', e)
  },
  viewMove(e) {
    console.log('viewMove', e)
  },
  onTap(e) {
    console.log(e, '监听到了 tap')
  }
})
