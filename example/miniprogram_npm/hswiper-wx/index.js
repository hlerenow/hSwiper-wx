module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _hTouch = __webpack_require__(1);

var _hTouch2 = _interopRequireDefault(_hTouch);

var _utils = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var touchHandle = new _hTouch2.default();
var systemInfo = wx.getSystemInfoSync();
var SCREEN_WIDTH = systemInfo.windowWidth;
var SCREEN_HEIGHT = systemInfo.windowHeight;
/* 动画过渡时间 */
var DURATION = 300;
var TIMEING_FUNCTION = 'ease';
var TIMEING_FUNCTION_ARRAY = ['linear', 'ease-in', 'ease-in-out', 'ease-out', 'step-start', 'step-end'];
// 视图过度动画实例
var VIEWANI_MATION = wx.createAnimation({
  transformOrigin: '50% 50%',
  duration: DURATION,
  timingFunction: TIMEING_FUNCTION,
  delay: 0
});
// 视图移动动画实例
var MOVE_ANIMATION = wx.createAnimation({
  transformOrigin: '50% 50%',
  duration: 0,
  timingFunction: 'ease',
  delay: 0
});
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
    visableDataList: [],
    /* 最外层可是区域盒子的样式 */
    viewBoxStyle: '',
    /* 是否过渡中 */
    tranforming: false
  },
  properties: {
    /* 移动到指定试图，伴随过渡动画 */
    moveTo: {
      type: Number,
      default: 0,
      observer: function observer(newVal) {
        this.moveViewToAdapter(newVal, true);
      }
    },
    /* 移动到指定试图，无过渡动画 */
    moveToWithOutAnimation: {
      type: Number,
      default: 0,
      observer: function observer(newVal) {
        this.moveViewToAdapter(newVal);
      }
    },
    animationType: {
      type: String,
      default: 'ease',
      observer: function observer(newVal) {
        if (TIMEING_FUNCTION_ARRAY.indexOf(newVal) < 0) {
          return;
        }
        TIMEING_FUNCTION = newVal;
        VIEWANI_MATION = wx.createAnimation({
          transformOrigin: '50% 50%',
          duration: DURATION,
          timingFunction: newVal,
          delay: 0
        });
      }
    },
    animationDuration: {
      type: Number,
      default: 300,
      observer: function observer(newVal) {
        DURATION = newVal;
        VIEWANI_MATION = wx.createAnimation({
          transformOrigin: '50% 50%',
          duration: DURATION,
          timingFunction: newVal,
          delay: 0
        });
      }
    },
    templateName: {
      type: String,
      value: '_hswiper_emptyItem_default'
    },
    /* 传入的数据 */
    dataList: {
      type: Array,
      value: []
    },
    initIndex: {
      type: Number,
      default: 0,
      observer: function observer(newVal) {
        if (!this.data.dataList.length) {
          return;
        }
        var maxIndex = this.data.dataList.length - 1;

        var val = newVal > maxIndex ? maxIndex : newVal;
        val = val < 0 ? 0 : newVal;
        this.setData({
          nowViewDataIndex: val
        });
      }
    },
    /* 滚动图的宽度 */
    width: {
      type: Number,
      value: SCREEN_WIDTH,
      observer: function observer(newVal) {
        var tempReduceDistance = (this.data.padding + this.data.paddingX) * 2;
        this.setData({
          itemWidth: newVal - tempReduceDistance
        });
      }
    },
    /* 滚动图的高度 */
    height: {
      type: Number,
      value: SCREEN_HEIGHT,
      observer: function observer(newVal) {
        var tempReduceDistance = (this.data.padding + this.data.paddingY) * 2;
        this.setData({
          itemHeight: newVal - tempReduceDistance
        });
      }
    },
    /* 垂直和水平方向各自减少的距离 */
    padding: {
      type: Number,
      value: 0,
      observer: function observer(newVal) {
        var tempReduceDistanceX = (newVal + this.data.paddingX) * 2;
        var tempReduceDistanceY = (newVal + this.data.paddingY) * 2;
        this.setData({
          itemWidth: this.data.width - tempReduceDistanceX,
          itemHeight: this.data.height - tempReduceDistanceY
        });
      }
    },
    /* 水平方向减少的距离 */
    paddingX: {
      type: Number,
      value: 0,
      observer: function observer(newVal) {
        var tempReduceDistanceX = (newVal + newVal) * 2;
        var tempReduceDistanceY = (this.data.paddingY + this.data.paddingY) * 2;
        this.setData({
          itemWidth: this.data.width - tempReduceDistanceX,
          itemHeight: this.data.height - tempReduceDistanceY
        });
      }
    },
    /* 垂直方向减少的距离 */
    paddingY: {
      type: Number,
      value: 0,
      observer: function observer(newVal) {
        var tempReduceDistanceX = (this.data.padding + this.data.paddingX) * 2;
        var tempReduceDistanceY = (this.data.padding + newVal) * 2;
        this.setData({
          itemWidth: this.data.width - tempReduceDistanceX,
          itemHeight: this.data.height - tempReduceDistanceY
        });
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
      value: false
    }
  },
  methods: {
    touchstart: touchHandle.touchstart.bind(touchHandle),
    touchmove: touchHandle.touchmove.bind(touchHandle),
    touchend: touchHandle.touchend.bind(touchHandle),
    registerTouchEvent: function registerTouchEvent() {
      var _this = this;

      var vertical = this.data.vertical;

      if (!vertical) {
        touchHandle.listen('touchleft', function () {
          _this.nextView();
        });
        touchHandle.listen('touchright', function () {
          _this.preView();
        });
        touchHandle.listen('touchmove', function (data) {
          /* 过渡中禁止手指滑动 */
          if (_this.data.tranforming) {
            return;
          }
          _this.triggerEvent('move', {
            index: _this.data.nowViewDataIndex,
            nativeEvent: data,
            vertical: _this.data.vertical,
            type: 'x'
          });
          _this.movePos(data.endX - data.startX, 'translateX');
        });
        return;
      }
      /* 垂直方向滚动 */
      touchHandle.listen('touchup', function () {
        _this.nextView();
      });

      touchHandle.listen('touchdown', function () {
        _this.preView();
      });
      touchHandle.listen('touchmove', function (data) {
        _this.triggerEvent('move', {
          index: _this.data.nowViewDataIndex,
          nativeEvent: data,
          vertical: _this.data.vertical,
          type: 'x'
        });
        _this.movePos(data.endY - data.startY, 'translateY');
      });
    },

    /**
     * 动态更新指定样式属性变量的值
     * @param {*} attr 样式属性名
     * @param {*} val 样式属性值
     * @param {*} styleName 样式变量
     */
    updateDomStyle: function updateDomStyle(styleObj, styleName) {
      var _setData;

      var itemStyle = this.data.itemStyle;

      var style = (0, _utils.parseStyle)(itemStyle);
      style = Object.assign(style, styleObj);
      this.setData((_setData = {}, _setData[styleName] = (0, _utils.styleStringify)(style), _setData));
    },

    /* 初始化dom 结构 */
    initStruct: function initStruct() {
      var _data = this.data,
          itemHeight = _data.itemHeight,
          itemWidth = _data.itemWidth,
          vertical = _data.vertical,
          width = _data.width,
          height = _data.height,
          visableDataList = _data.visableDataList;

      var h = 0;
      var w = 0;
      var count = visableDataList.length;
      var viewBoxStyle = {
        width: width + 'px',
        height: height + 'px'
      };
      if (vertical) {
        w = itemWidth + 'px';
        h = count * itemHeight + 'px';
        viewBoxStyle['padding-left'] = (width - itemWidth) / 2 + 'px';
      } else {
        w = count * itemWidth + 'px';
        h = itemHeight + 'px';
        viewBoxStyle['padding-top'] = (height - itemHeight) / 2 + 'px';
      }
      // 更新容器的宽度，默认
      this.updateDomStyle({
        width: w,
        height: h
      }, 'wrapperStyle');
      this.updateDomStyle({
        width: itemWidth + 'px',
        height: itemHeight + 'px'
      }, 'itemStyle');

      this.updateDomStyle(viewBoxStyle, 'viewBoxStyle');
    },

    /* 计算可视区域元素，用于正常情况下的条状 */
    calViasbleDataList: function calViasbleDataList() {
      /* 区分是否支持循环滚动 */
      var res = [];
      var dataList = this.data.dataList;

      var dataCount = dataList.length;
      var pre1 = (dataCount + (0 - 1)) % dataCount;
      var pre2 = (dataCount + (0 - 2)) % dataCount;
      var next1 = dataCount % dataCount;
      var next2 = (dataCount + 1) % dataCount;
      res[0] = dataList[pre2];
      res[1] = dataList[pre1];
      res = res.concat(dataList);
      res.push(dataList[next1]);
      res.push(dataList[next2]);
      var len = res.length;
      if (!this.data.recycle) {
        var emptyElement = {
          templateName: '_hswiper_emptyItem'
        };
        res[1] = emptyElement;
        res[0] = emptyElement;
        res[len - 2] = emptyElement;
        res[len - 1] = emptyElement;
      }
      this.setData({
        visableDataList: res
      });
    },

    /**
     * @description 移动到指定dom index 位置
     * @param {*} domIndex dom元素的index
     * @param {*} useAnimation 是否启用过渡动画
     */
    moveViewTo: function moveViewTo(domIndex, useAnimation) {
      var _data2 = this.data,
          itemWidth = _data2.itemWidth,
          itemHeight = _data2.itemHeight,
          vertical = _data2.vertical,
          padding = _data2.padding,
          paddingX = _data2.paddingX,
          paddingY = _data2.paddingY,
          recycle = _data2.recycle,
          visableDataList = _data2.visableDataList;

      var len = visableDataList.length;
      domIndex += 2;
      if (recycle) {
        domIndex = Math.max(domIndex, 1);
        domIndex = Math.min(domIndex, len - 1);
      } else {
        domIndex = Math.max(domIndex, 2);
        domIndex = Math.min(domIndex, len - 2);
      }
      var pos = 0;
      var attr = 'translateX';
      /* 垂直方向 */
      if (vertical) {
        pos = -domIndex * itemHeight + padding + paddingX;
        attr = 'translateY';
        this.setData({
          nowTranY: pos
        });
      } else {
        /* 水平方向 */
        pos = -domIndex * itemWidth + padding + paddingY;
        attr = 'translateX';
        this.setData({
          nowTranX: pos
        });
      }

      /* 是否启用动画过渡 */
      if (useAnimation) {
        VIEWANI_MATION[attr](pos).translate3d(0).step();
        this.setData({
          swiperAnmiation: VIEWANI_MATION.export()
        });
      } else {
        MOVE_ANIMATION[attr](pos).translate3d(0).step();
        this.setData({
          swiperAnmiation: MOVE_ANIMATION.export()
        });
      }

      var p = new Promise(function (resolve) {
        setTimeout(function () {
          resolve();
        }, DURATION);
      });
      return p;
    },

    /* 向后一个视图 */
    nextView: function nextView() {
      var useAnimation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var nowViewDataIndex = this.data.nowViewDataIndex;

      var nextIndex = nowViewDataIndex + 1;
      this.moveViewToAdapter(nextIndex, useAnimation);
    },

    /* 向前一个视图 */
    preView: function preView() {
      var useAnimation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var nowViewDataIndex = this.data.nowViewDataIndex;

      var nextIndex = nowViewDataIndex - 1;
      this.moveViewToAdapter(nextIndex, useAnimation);
    },
    moveViewToAdapter: function moveViewToAdapter(nextIndex, useAnimation) {
      var _this2 = this;

      var _data3 = this.data,
          nowViewDataIndex = _data3.nowViewDataIndex,
          dataList = _data3.dataList;

      var len = dataList.length;
      var originNextIndex = nextIndex;
      nextIndex = Math.abs((nextIndex + len) % len);
      /* 当前是否已经是最后一个 */
      if (!this.data.recycle) {
        if (nowViewDataIndex === len - 1 && originNextIndex >= len) {
          this.triggerEvent('alreadyLastView', {
            index: nowViewDataIndex,
            item: dataList[nowViewDataIndex]
          });
          this.moveViewTo(nowViewDataIndex, useAnimation);
          return null;
        }

        /* 当前是否已经是第一个 */
        if (nowViewDataIndex === 0 && originNextIndex < 0) {
          this.triggerEvent('alreadyFirstView', {
            index: nowViewDataIndex,
            item: dataList[nowViewDataIndex]
          });
          this.moveViewTo(nowViewDataIndex, useAnimation);
          return null;
        }
      }

      /* 是否可以进行过渡 */
      if (!this.canTransforming()) {
        return null;
      }

      if (nextIndex === 0) {
        this.triggerEvent('firstView', {
          index: nowViewDataIndex,
          item: dataList[nowViewDataIndex]
        });
      }

      if (nextIndex === len - 1) {
        this.triggerEvent('lastView', {
          index: nowViewDataIndex,
          item: dataList[nowViewDataIndex]
        });
      }

      this.triggerEvent('beforeViewChange', {
        index: nowViewDataIndex,
        from: nowViewDataIndex,
        to: nextIndex,
        item: dataList[nowViewDataIndex]
      });

      return this.moveViewTo(originNextIndex, useAnimation).then(function () {
        var isReset = false;
        if (originNextIndex < 0) {
          isReset = true;
        }
        if (originNextIndex >= dataList.length) {
          isReset = true;
        }

        _this2.setData({
          nowViewDataIndex: nextIndex
        });
        if (isReset) {
          _this2.moveViewTo(nextIndex);
        }
        return null;
      }).then(function () {
        _this2.triggerEvent('afterViewChange', {
          index: nextIndex,
          from: nowViewDataIndex,
          to: nextIndex,
          item: dataList[nextIndex]
        });
        _this2.setData({
          tranforming: false
        });
        return null;
      });
    },

    /* 是否可以进行过渡 */
    canTransforming: function canTransforming() {
      var tranforming = this.data.tranforming;

      if (tranforming) {
        return false;
      }
      this.setData({
        tranforming: true
      });
      return true;
    },

    /* 移动到指定像素位置 */
    movePos: function movePos(pos) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'translateX';

      if (this.data.tranforming) {
        return;
      }
      var _data4 = this.data,
          itemHeight = _data4.itemHeight,
          itemWidth = _data4.itemWidth,
          nowTranY = _data4.nowTranY,
          nowTranX = _data4.nowTranX,
          dataList = _data4.dataList;

      var nowTran = 0;
      var min = 0;
      var max = 0;
      var maxDistance = 0;
      var len = dataList.length;
      if (type === 'translateX') {
        nowTran = nowTranX + pos;
        max = itemWidth;
        min = -(len - 2) * itemWidth;
        maxDistance = itemWidth;
      } else {
        nowTran = nowTranY + pos;
        max = itemWidth;
        min = -(len - 2) * itemHeight;
        maxDistance = itemHeight;
      }
      maxDistance -= 10;
      if (Math.abs(pos) > maxDistance) {
        return;
      }

      if (pos > max) {
        pos = max;
      }

      if (pos < min) {
        pos = min;
      }
      MOVE_ANIMATION[type](nowTran).translate3d(0).step();
      this.setData({
        swiperAnmiation: MOVE_ANIMATION.export()
      });
    }
  },
  lifetimes: {
    ready: function ready() {
      if (!this.data.dataList.length) {
        throw new Error('dataList 不能为空');
      }
      this.calViasbleDataList();
      this.initStruct();
      this.registerTouchEvent();
      this.moveViewTo(this.data.nowViewDataIndex);
    }
  },
  pageLifetimes: {}
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _hEvent = __webpack_require__(2);

var _hEvent2 = _interopRequireDefault(_hEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 小程序touch 扩展包
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var HTouch = function (_HEvent) {
  _inherits(HTouch, _HEvent);

  function HTouch() {
    _classCallCheck(this, HTouch);

    var _this = _possibleConstructorReturn(this, _HEvent.call(this));

    _this.startX = 0;
    _this.startY = 0;
    _this.endX = 0;
    _this.endY = 0;
    _this.moveDistanceX = 0;
    _this.moveDistanceY = 0;

    _this.startTime = 0;
    _this.endTime = 0;
    return _this;
  }

  HTouch.prototype.touchstart = function touchstart(e) {
    this.startX = e.changedTouches[0].clientX;
    this.startY = e.changedTouches[0].clientY;
    this.touchTime = e.timeStamp;
    var touchObj = {
      startTime: this.touchTime,
      endTime: e.timeStamp,
      startX: this.startX,
      startY: this.startY
    };

    var type = 'touchstart';
    touchObj.type = type;
    this.emit(type, touchObj);
  };

  HTouch.prototype.touchmove = function touchmove(e) {
    this.endX = e.changedTouches[0].clientX;
    this.endY = e.changedTouches[0].clientY;
    var times = e.timeStamp - this.touchTime;
    var distanceX = e.changedTouches[0].clientX - this.startX;
    var distanceY = e.changedTouches[0].clientY - this.startY;

    this.moveDistanceX = this.endX - this.startX;
    this.moveDistanceY = this.endY - this.startY;

    var touchObj = {
      distanceX: distanceX,
      distanceY: distanceY,
      startTime: this.touchTime,
      endTime: e.timeStamp,
      duration: times,
      startX: this.startX,
      endX: e.changedTouches[0].clientX,
      startY: this.startY,
      endY: e.changedTouches[0].clientY
    };

    var type = 'touchmove';
    touchObj.type = type;
    this.emit(type, touchObj);
  };

  HTouch.prototype.touchend = function touchend(e) {
    var times = e.timeStamp - this.touchTime;
    var distanceX = e.changedTouches[0].clientX - this.startX;
    var distanceY = e.changedTouches[0].clientY - this.startY;

    this.moveDistanceY = distanceY;
    this.moveDistanceX = distanceX;

    if (Math.abs(distanceX) < 10 && Math.abs(distanceY) < 10) {
      return;
    }

    var touchObj = {
      distanceX: distanceX,
      distanceY: distanceY,
      startTime: this.touchTime,
      endTime: e.timeStamp,
      duration: times,
      startX: this.startX,
      endX: e.changedTouches[0].clientX,
      startY: this.startY,
      endY: e.changedTouches[0].clientY
    };
    this.emit('touchend', touchObj);
    var type = '';
    /* 确定是垂直 */
    if (Math.abs(distanceY) - Math.abs(distanceX) > 0) {
      if (distanceY > 0) {
        type = 'touchdown';
      } else {
        type = 'touchup';
      }
    } else if (distanceX > 0) {
      type = 'touchright';
    } else {
      type = 'touchleft';
    }
    touchObj.type = type;
    this.emit(type, touchObj);
  };

  return HTouch;
}(_hEvent2.default);

exports.default = HTouch;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 一个事件模型（发布者，订阅者模型）
 */
var _listenerId = 1;

var HEvent = function () {
  function HEvent() {
    _classCallCheck(this, HEvent);

    /* 监听者对象 */
    this._listenersObj = {};
  }

  /* 发送事件 */


  HEvent.prototype.emit = function emit(event, data) {
    var _listenersObj = this._listenersObj;

    var funcs = _listenersObj[event] || [];
    funcs.map(function (item) {
      return item.handle(data);
    });
  };

  /* 监听事件 */


  HEvent.prototype.listen = function listen(event, handle) {
    var _listenersObj = this._listenersObj;

    var id = _listenerId++;
    var listenerObj = {
      id: id,
      handle: handle
    };
    if (_listenersObj[event]) {
      _listenersObj[event].push(listenerObj);
    } else {
      _listenersObj[event] = [listenerObj];
    }

    return id;
  };

  /**
   * 根据监听者id 移除监听者
   * @param {int} listenerId 监听者id
   */


  HEvent.prototype.removeListener = function removeListener(listenerId) {
    var _listenersObj = this._listenersObj;

    var keys = Object.keys(_listenersObj);
    var isFind = false;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var array = _listenersObj[key];
      for (var j = 0; j < array.length; j) {
        var item = array[j];
        if (item.id === listenerId) {
          isFind = true;
          item.splice(j, 1);
          break;
        }
      }
      if (isFind) {
        break;
      }
    }
  };

  return HEvent;
}();

module.exports = HEvent;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
/**
 * 解析style属性字符串为js对象
 * @param  {string} styleStr 待解析的样式字符串
 * @return {object}          style对象
 */
var parseStyle = exports.parseStyle = function parseStyle(styleStr) {
  var styleObj = {};
  var styleArray = styleStr.split(';');
  styleArray.forEach(function (item) {
    var temp = item.split(':');
    if (temp.length === 2) {
      styleObj[temp[0]] = temp[1];
    }
  });
  return styleObj;
};

/**
 * 将style对象转换为style字符串
 * @param {*} styleObj dom元素样式对象
 */
var styleStringify = exports.styleStringify = function styleStringify() {
  var styleObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var str = '';
  var keys = Object.keys(styleObj);
  keys.forEach(function (key) {
    str += key + ':' + styleObj[key] + ';';
  });
  return str;
};

/***/ })
/******/ ]);