import { AxiosRequestConfig, AxiosStatic } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'
import CancelToken from './cancel/CancelToken'
import Cancel, { isCancel } from './cancel/Cancel'

/**
 * 创建实例
 */
function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)

  // instance 最原始的 axios 方法
  const instance = Axios.prototype.request.bind(context)

  // 将 context(Axios 类) 上的属性和方法拷贝到 instance 上
  extend(instance, context)

  return instance as AxiosStatic
}

const axios = createInstance(defaults)

axios.create = function create(config) {
  return createInstance(mergeConfig(defaults, config))
}

axios.CancelToken = CancelToken;
axios.Cancel = Cancel;
axios.isCancel = isCancel;

export default axios;
