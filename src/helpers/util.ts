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

/**
 * 判断值是否为纯对象
 * @param val
 */
export function isPlainObject(val: any): boolean {
  return toString.call(val) === '[object Object]'
}

/**
 * 扩展属性方法
 * @param to
 * @param from
 */
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

/**
 * 深拷贝
 * @param objs
 */
export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)
  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })
  return result
}
