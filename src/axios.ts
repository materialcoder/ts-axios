import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'

/**
 * 创建实例
 */
function createInstance(): AxiosInstance {
  const context = new Axios()

  // instance 最原始的 axios 方法
  const instance = Axios.prototype.request.bind(context)

  // 将 context(Axios 类) 上的属性和方法拷贝到 instance 上
  extend(instance, context)

  return instance as AxiosInstance
}

const axios = createInstance()

export default axios
