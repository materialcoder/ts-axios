import { AxiosRequestConfig } from './types'
import xhr from './xhr'

/**
 * axios 请求函数
 * @param config 请求参数
 * @returns void
 */
function axios(config: AxiosRequestConfig): void {
  xhr(config)
}

export default axios
