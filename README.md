# hSwiper-wx
小程序swiper组件


## 演示
1. 水平
<br/>
<img src="./h1.gif" width="350" style="max-width:100%;width: 350px;">

2. 垂直
<br/>
<img src="./h1.gif" width="350"  style="max-width:100%;width: 350px;">

3. 不循环
<br/>
<img src="./nocyle1.gif" width="350"  style="max-width:100%;width: 350px;">

> PS：对外暴露的 js 模块/自定义组件请放在 src 目录下，不宜放置在过深的目录。另外新增的暴露模块需要在 tools/config.js 的 entry 字段中补充，不然不会进行构建。

## 功能
1. 支持水平，垂直滚动
2. 支持循环无缝滚动
3. 过渡位移效果支持自定义
4. 过渡位移时间支持自定义
5. 直接无限数量元素的滚动，而不会卡顿（未实现，待续）

## 安装

```javascript
  npm install --save hswiper-wx
```

## 使用

1. 在页面的 json 配置文件中添加 recycle-view 和 recycle-item 自定义组件的配置

```json
  {
    "usingComponents": {
      "hswiper": "hswiper-wx",
    }
  }
```

2. 在项目根目录下创建如下目录文件
```
  --hSwiper
      --swiperTemplate.wxml --
      --swiperTemplate.wxss
```


```
// swiperTemplate.wxml
// 每个视图的内容的wxml都写在该文件里面，使用 template标签 ，并且命名 ,当调用这里面的模版时，会自动注入 item以及 index数据，index表示是当前元素的元素索引 ，item则表示当前元素 数据。（相当于dataList[index]=item，但是 list不会注入到模版里面）

<template name="hSwiperItem">
  <view style="width: 100%; height: 100%;" class="imgBox">
    <view style="width: 100%; height: 100%;" class="imgBorder">
      <image class="imgOmg" mode="widthFix" src="{{item}}"></image>
    </view>
  </view>
</template>

<template name="hSwiperItem2">
  <view style="width: 100%; height: 100%;">
    {{item}}
  </view>
</template>

```

```
// swiperTemplate.wxss, swiperTemplate.wxml对应的样式
.imgBox {
  padding: 10px 10px;
  box-sizing: border-box;
  flex: 1;
  justify-content: center;
  align-items: center
}

.imgBorder {
  border: 1px solid #eee;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
}

.imgOmg {
  display: block;
  width: 80%;
  height: 80%;
  border-radius: 6px;
}
```

3. 在需要使用的页面的中
```javascript
/// wxml中
<View style="width: 320px; height: 500px"
    class="swiper"
>
  <comp
    recycle="{{recyle}}"
    vertical="{{false}}"
    padding="{{30}}"
    moveTo="{{moveTo}}"
    bind:customevent="getRef"
    initIndex="{{0}}"
    width="{{320}}"
    height="{{500}}"
    animationType="ease-out"
    animationDuration="300"
    bind:willFirstView="wiilFirstView"
    bind:firstView="firstView"
    bind:beforeViewChange="beforeViewChange"
    bind:afterViewChange="afterViewChange"
    bind:willLastView="willLastView"
    bind:lastView="lastView"
    bind:move="viewMove"
    dataList="{{dataList}}"
  ></comp>
</View>

```

```javascript
// js 中
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
  wiilFirstView(e) {
    console.log('wiilFirstView', e)
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
  willLastView(e) {
    console.log('willLastView', e)
  },
  lastView(e) {
    console.log('lastView', e)
  },
  viewMove(e) {
    // console.log('viewMove', e)
  }
})

```