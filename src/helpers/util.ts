const toString = Object.prototype.toString

/**
 * 判断值是否为Date类型
 * @param val
 */
export function isDate(val: any): boolean {
  return toString.call(val) === '[object Date]'
}

/**
 * 判断值是否为Object
 * @param val
 */
export function isObject(val: any): boolean {
  return val !== null && typeof val === 'object'
}
