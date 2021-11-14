import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'
import { isURLSameOrigin } from '../helpers/url'
import cookie from '../helpers/cookie'
import { isFormData } from '../helpers/util'

/**
 * xhr 请求函数
 * @param config 请求参数
 * @returns void
 */
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { 
      url,
      data = null,
      method = 'get',
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress,
      auth
    } = config

    // 1. 创建 request 实例
    const request = new XMLHttpRequest();

    // 2. 建立连接
    // method 必须是大写；默认异步
    // 类型断言 url 不为空
    request.open(method.toUpperCase(), url!, true);

    // 3. 配置 request
    configureRequest();

    // 4. 天剑事件监听
    addEvents();

    // 5. 处理请求头
    processHeaders();

    // 6. 处理 cancel
    processCancel();

    // 7. 发送请求
    request.send(data);

    // request 配置
    function configureRequest(): void {
      // 设置响应数据类型
      if (responseType) {
        request.responseType = responseType
      }

      // 设置请求超时时间
      if (timeout) {
        request.timeout = timeout
      }

      // 携带跨域cookie
      if (withCredentials) {
        request.withCredentials = withCredentials;
      }
    }

    // 事件监听
    function addEvents(): void {
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
        reject(createError('Network Error', config, null, request))
      }

      // 监听超时
      request.ontimeout = function handleTimeout() {
        reject(createError(`Timeout of ${timeout}ms exceeded`, config, 'ECONNABORTED', request))
      }

      // 监听上传和下载进度
      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress;
      }

      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress;
      }
    }

    // 处理请求头
    function processHeaders(): void {
      // 如果是 FormData 类型的数据，删除 header 里的 Content-Type，让浏览器去自动添加
      if (isFormData(data)) {
        delete headers['Content-Type'];
      } 

      // 设置跨域的token，防御xsrf
      if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
        const xsrfValue =  cookie.read(xsrfCookieName);
        if (xsrfValue && xsrfHeaderName) {
          headers[xsrfHeaderName] = xsrfValue;
        }
      }

      if (auth) {
        headers['Authorization'] = 'Basic ' + btoa(auth.username + ':' + auth.password);
      }

      // 设置请求头
      Object.keys(headers).forEach(name => {
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })
    }

    // 处理 cancel
    function processCancel(): void {
      if (cancelToken) {
        cancelToken.promise.then(reason => {
          request.abort()
          reject(reason)
        })
      }
    }

    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
