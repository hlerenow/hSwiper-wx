/**
 * 解析style属性字符串为js对象
 * @param  {string} styleStr 待解析的样式字符串
 * @return {object}          style对象
 */
export const parseStyle = function (styleStr) {
  let styleObj = {}
  let styleArray = styleStr.split(';')
  styleArray.forEach(function (item) {
    let temp = item.split(':')
    if (temp.length === 2) {
      styleObj[temp[0]] = temp[1]
    }
  })
  return styleObj
}

/**
 * 将style对象转换为style字符串
 * @param {*} styleObj dom元素样式对象
 */
export const styleStringify = function (styleObj = {}) {
  let str = ''
  let keys = Object.keys(styleObj)
  keys.forEach(function (key) {
    str += key + ':' + styleObj[key] + ';'
  })
  return str
}
