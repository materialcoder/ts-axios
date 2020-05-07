import { AxiosRequestConfig } from './types'

/**
 * xhr 请求函数
 * @param config 请求参数
 * @returns void
 */
export default function xhr(config: AxiosRequestConfig): void {
  const { url, data = null, method = 'get', headers } = config
  const request = new XMLHttpRequest()
  // method 必须是大写；默认异步
  request.open(method.toUpperCase(), url, true)
  // 设置请求头
  Object.keys(headers).forEach(name => {
    if (data === null && name.toLowerCase() === 'content-type') {
      delete headers[name]
    } else {
      request.setRequestHeader(name, headers[name])
    }
  })
  // 发送请求
  request.send(data)
}
