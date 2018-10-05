# hSwiper-wx
小程序swiper组件

[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()
[![Version](https://img.shields.io/npm/v/hswiper-wx.svg)](https://www.npmjs.com/package/hswiper-wx)
[![npm](https://img.shields.io/npm/dt/hswiper-wx.svg)](https://www.npmjs.com/package/hswiper-wx)

## 演示

1. 水平
<br/>
<img src="./h1.gif" width="350" style="max-width:100%;width: 350px;">

2. 垂直
<br/>
<img src="./v1.gif" width="350"  style="max-width:100%;width: 350px;">

3. 不循环
<br/>
<img src="./nocyle1.gif" width="350"  style="max-width:100%;width: 350px;">

## 功能
1. 支持水平，垂直滚动
2. 支持循环无缝滚动
3. 过渡位移效果支持自定义
4. 过渡位移时间支持自定义
5. ~~支持无限元素的滚动，而不会卡顿（未实现，待续...)~~


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
      --swiperTemplate.wxml
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
    templateName="hSwiperItem"
    padding="{{30}}"
    moveTo="{{moveTo}}"
    bind:customevent="getRef"
    initIndex="{{2}}"
    width="{{320}}"
    height="{{500}}"
    animationType="ease-out"
    animationDuration="300"
    bind:firstView="firstView"
    bind:alreadyFirstView="alreadyFirstView"
    bind:beforeViewChange="beforeViewChange"
    bind:afterViewChange="afterViewChange"
    bind:lastView="lastView"
    bind:alreadyLastView="alreadyLastView"
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
    // console.log('viewMove', e)
  }
})
```




## 属性说明

| 字段名                      | 类型     | 必填  | 描述                                      |
| -------------------------- | ----    | ---- | ----------------------------------------- |
|templateName                | String  | 否   | item对应的模版名称。全局设置，默认值为 _hswiper_emptyItem_default, 全局的，如果每个item需要使用不同的模版，可以在item中增加 templateName 属性值，该值会覆盖全局的  templateName   |
| dataList                   | Array   | 是   | 需要渲染的数据         |
| width                      | Number  | 否   | swiper 容器的宽度, 默认值为屏幕的宽度          |
| height                     | Number  | 否   | swiper 容器的高度, 默认值为屏幕的高度          |
| recycle                    | Boolean | 否   | 是否循环滚动， 默认值 ```false```            |
| vertical                   | Boolean | 否   | 是否垂直滚动， 默认值 ```false```     |
| padding                    | Number  | 否   | 该参数用于确定每个滚动元素的的宽度以及高度，每个元素的宽度为 ```width - (padding + paddingX) * 2```, 高度为```height - (padding + paddingY) * 2```, 默认值为0|
| paddingX                   | Number  | 否   | 同上， 默认值为0                            |
| paddingY                   | Number  | 否   | 同上， 默认值为0                            |
| moveTo                     | Number  | 否   | 当改属性改变后， 插件会跳转到指定索引的数据视图，```0 < moveTo < dataList.length```|
| moveToWithOutAnimation     | Number  | 否   | 同上，但无过渡动画                           |
| initIndex                  | Number  | 否   | 插件初始化时 跳转的视图索引，默认值0                   |
| animationType              | String  | 否   | 过渡动画类型，```['linear', 'ease-in', 'ease-in-out', 'ease-out', 'step-start', 'step-end']```之一 ,默认值 ```ease```    |
| animationDuration          | Number  | 否   | 过渡动画时间，默认值 300     |





## 事件

| 事件名                      | 描述                                      |
| ---                        |------                                    |
| firstView                  | 当跳转到的视图是第一个视图时触发              |
| alreadyFirstView           | 非循环模式下，重复跳转到的视图是第一个视图时触发 |
| beforeViewChange           | 视图跳转前触发                             |
| afterViewChange            | 视图跳转前触发                             |
| lastView                   | 当跳转到的视图是最后个视图时触发              |
| alreadyLastView            | 非循环模式下，重复跳转到的视图是最后个视图时触发 |
| move                       | 视图移动时触发                             |





------------


## 具体使用 可查看example文件夹下的例子，有注释说明。欢迎提问！！！
