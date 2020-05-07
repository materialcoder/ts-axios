import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import { parseHeaders } from './helpers/headers'
import { transformResponse } from './helpers/data'

/**
 * xhr 请求函数
 * @param config 请求参数
 * @returns void
 */
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { url, data = null, method = 'get', headers, responseType, timeout } = config

    const request = new XMLHttpRequest()

    // 设置响应数据类型
    if (responseType) {
      request.responseType = responseType
    }

    // 设置请求超时时间
    if (timeout) {
      request.timeout = timeout
    }

    // method 必须是大写；默认异步
    request.open(method.toUpperCase(), url, true)

    // 获取响应结果
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }

      if (request.status === 0) {
        return
      }
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response)
    }

    // 处理网络错误
    request.onerror = function handleError() {
      reject(new Error('Network Error'))
    }

    // 监听超时
    request.ontimeout = function handleTimeout() {
      reject(new Error(`Timeout of ${timeout}ms`))
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

    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(new Error(`Request failed with status code ${response.status}`))
      }
    }
  })
}
