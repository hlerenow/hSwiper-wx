/**
 * 一个事件模型（发布者，订阅者模型）
 */
let _listenerId = 1

class HEvent {
  constructor() {
    /* 监听者对象 */
    this._listenersObj = {}
  }

  /* 发送事件 */
  emit(event, data) {
    const {_listenersObj} = this
    const funcs = _listenersObj[event] || []
    funcs.map(function (item) {
      return item.handle(data)
    })
  }

  /* 监听事件 */
  listen(event, handle) {
    const {_listenersObj} = this
    const id = _listenerId++
    const listenerObj = {
      id,
      handle
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
  removeListener(listenerId) {
    const {_listenersObj} = this
    const keys = Object.keys(_listenersObj)
    let isFind = false
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const array = _listenersObj[key]
      for (let j = 0; j < array.length; j) {
        const item = array[j]
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
module.exports = HEvent
