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
  /** 请求地址 */
  url?: string
  /** 请求方法 */
  method?: Method
  /** 请求发送数据 */
  data?: any
  /** 请求参数 */
  params?: any
  /** 请求头 */
  headers?: any
  /** 响应数据类型 */
  responseType?: XMLHttpRequestResponseType
  /** 响应超时时间 单位 毫秒 */
  timeout?: number
  /** 请求配置项 */
  transformRequest?: AxiosTransformer | AxiosTransformer[]
  /** 响应配置项 */
  transformResponse?: AxiosTransformer | AxiosTransformer[]
  /** 取消请求 */
  cancelToken?: CancelToken
  [propName: string]: any
}

/**
 * 响应数据接口
 */
export interface AxiosResponse<T = any> {
  /** 响应数据 */
  data: T
  /** 响应状态码 */
  status: number
  /** 状态消息 */
  statusText: string
  /** 响应头 */
  headers: any
  /** 请求参数 */
  config: AxiosRequestConfig
  /** 请求的 XMLHTTPRequest 对象实例 */
  request: any
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

/**
 * 错误信息接口
 */
export interface AxiosError extends Error {
  isAxiosError: boolean
  /** 请求参数 */
  config: AxiosRequestConfig
  /** 返回状态码 */
  code?: string | null
  /** XMLHttpRequst */
  request?: any
  /** 响应数据 */
  response?: AxiosResponse
}

/**
 * Axios 类型接口
 */
export interface Axios {
  defaults: AxiosRequestConfig
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

/**
 * 集成Axios的混合类型接口
 */
export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

/**
 * axios 静态方法接口
 */
export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance

  CancelToken: CancelTokenStatic
  Cancel: CancelStatic
  isCancel: (value: any) => boolean
}

/**
 * 拦截器管理接口
 */
export interface AxiosInterceptorManager<T> {
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number
  eject(id: number): void
}

export interface ResolvedFn<T> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}

export interface AxiosTransformer {
  (data: any, headers?: any): any
}

/**
 * CancelToken 实例 接口
 */
export interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  throwIfRequested(): void;
}

/**
 * 取消方法 接口
 */
export interface Canceler {
  (message?: string): void
}

export interface CancelExecutor {
  (cancel: Canceler): void
}

export interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}

/**
 * CancelToken 类类型
 */
export interface CancelTokenStatic {
  new(executor: CancelExecutor): CancelToken
  source(): CancelTokenSource
}

export interface Cancel {
  message?: string
}

export interface CancelStatic {
  new(message?:string): Cancel
}
