import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'

/**
 * xhr 请求函数
 * @param config 请求参数
 * @returns void
 */
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise(resolve => {
    const { url, data = null, method = 'get', headers, responseType } = config
    const request = new XMLHttpRequest()
    // 设置响应数据类型
    if (responseType) {
      request.responseType = responseType
    }
    // method 必须是大写；默认异步
    request.open(method.toUpperCase(), url, true)

    // 获取响应结果
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }
      const responseHeaders = request.getAllResponseHeaders()
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      resolve(response)
    }
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
  })
}
