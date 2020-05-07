import { isPlainObject } from './util'

/**
 * 转换数据 包括请求和返回数据
 * @param data
 */
export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}
