export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export interface AxiosRequestConfig {
  /**请求地址 */
  url: string
  /**请求方法 */
  method?: Method
  /**请求发送数据 */
  data?: any
  /**请求参数 */
  parmas?: any
}
