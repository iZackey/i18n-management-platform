/**
 * 各种dom操作的方法封装
 * */

/**
 * 判断是否有某个class
 * @param el 当前元素
 * @param className class类名
 * */
export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')

  return reg.test(el.className)
}

/**
 * 添加class
 * */
export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }

  let newClass = el.className.split(' ')

  newClass.push(className)
  el.className = newClass.join(' ')
}

/**
 * 移除class
 * */
export function removeClass(el, className) {
  if (!hasClass(el, className)) {
    return
  }

  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g')

  el.className = el.className.replace(reg, ' ')
}

/**
 * 获取元素属性数据
 * */
export function getData(el, name, val) {
  let prefix = 'data-'

  if (val) {
    return el.setAttribute(prefix + name, val)
  }
  return el.getAttribute(prefix + name)
}

/**
 * 获取元素的位置坐标
 * */
export function getRect(el) {
  if (el instanceof window.SVGElement) {
    let rect = el.getBoundingClientRect()

    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    }
  }
  return {
    top: el.offsetTop,
    left: el.offsetLeft,
    width: el.offsetWidth,
    height: el.offsetHeight
  }

}

/**
 * 从当前元素开始查找所有的父级元素
 * @param el Object 当前的元素对象
 * @param selector String 待查找的元素的选择器，如：'.classname','#idname'
 * @return Object 如果查找到了就返回找到的父元素
 * */
export function closest(el, selector) {
  var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

  while (el) {
    if (matchesSelector.call(el, selector)) {
      break;
    }
    el = el.parentElement;
  }
  return el;
}
