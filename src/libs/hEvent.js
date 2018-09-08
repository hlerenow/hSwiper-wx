/**
 * 一个事件模型（发布者，订阅者模型）
 */
let _listenerId = 1

class hEvent {
  constructor () {
    /* 监听者对象 */
    this._listenersObj = {}
  }

  /* 发送事件 */
  emit (event) {
    let { _listenersObj } = this
    let funcs = _listenersObj[event] || []
    funcs.map(function (item) {
      item()
    })
  }

  /* 监听事件 */
  listen (event, handle) {
    let { _listenersObj } = this
    let id = _listenerId++
    let  = {
      id: id,
      handle: handle
    }
    if (_listenersObj[event]) {
      _listenersObj[event].push(listenerObj)
    } else {
      _listenersObj[event] = [listenerObj]
    }

    return id
  }

  /**
   * 根据监听者id 移除监听者
   * @param {int} listenerId 监听者id
   */
  removeListener (listenerId) {
    let { _listenersObj } = this
    let keys = Object.keys(_listenersObj)
    let isFind = false
    for (let i in keys) {
      let array = _listenersObj[i]
      for (let j = 0; j < array.length; j) {
        let item = array[j]
        if (item.id === listenerId) {
          isFind = true
          item.splice(j, 1)
          break
        }
      }
      if (isFind) {
        break
      }
    }
  }
}

module.exports = hEvent;
