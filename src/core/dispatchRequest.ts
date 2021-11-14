import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildURL, combineURL, isAbsoluteURL } from '../helpers/url'
import { flattenHeaders } from '../helpers/headers'
import transform from './transform'

/**
 * axios 发送请求的核心函数
 * @param config 请求参数
 * @returns void
 */
export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  // 发送请求前检测
  throwIfCancellationRequested(config);
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

/**
 * 处理 config 参数
 * @param config
 */
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

/**
 * 处理 config 中的 URL
 * @param config
 */
export function transformUrl(config: AxiosRequestConfig): string {
  let { url, params, paramsSerializer, baseURL } = config;
  // 如果配了 baseURL 并且 url 不是绝对路径的话，就做一下拼接
  if (baseURL && !isAbsoluteURL(url!)) {
    url = combineURL(baseURL, url)
  }
  return buildURL(url!, params, paramsSerializer)
}

/**
 * 转换响应数据 尝试将json字符串转换为json对象
 * @param res
 */
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}

/**
 * 判断请求是否被取消了，如果取消了的话就抛出异常
 * @param config AxiosRequestConfig
 */
function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}