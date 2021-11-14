## 需求分析

**Features**

- 在浏览器端使用 XMLHttpRequest 对象通讯
- 支持 Promise API
- 支持请求和响应的拦截器
- 支持请求数据和响应数据的转换
- 支持请求的取消
- JSON 数据的自动转换
- 客户端防止XSRF

## 初始化项目

使用的是 `typescript-library-starter`

```shell
git clone https://github.com/alexjoverm/typescript-library-starter.git ts-axios
cd ts-axios
npm install
```

## 编写简单的请求代码

**基本操作**

```js
axios({
  method: 'get',
  url: '/simple/get',
  params: {
    a: 1,
    b: 2
  }
})
```

## 处理请求URL

```js
axios({
  method: 'get',
  url: '/base/get',
  params: {
    a: 1,
    b: 2
  }
})
```

> /base/get?a=1&b=2

**参数值为数组**

```js
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['bar', 'baz']
  }
})
```

> /base/get?foo[]=bar&foo[]=baz

**参数值为对象**

```js
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})
```

> /base/get?foo=%7B%22bar%22:%22baz%22%7D

**参数值为Date类型**

```js
const date = new Date()
axios({
  method: 'get',
  url: '/base/get',
  params: {
    date
  }
})
```

> /base/get?date=2020-05-07T11:29:40.030Z

**参数中含特殊字符**

对于字符 `@`、`:`、`$`、`.`、` `、`[`、`]` 允许出现在 URL 中，不希望被转义

```js
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: '@:$ '
  }
})
```

> /base/get?foo=@:$+, 空格会转换成 + 

**空值忽略**

对于为 null 或 undefined 的属性，不会添加到 URL 参数中

```js
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: 'bar',
    baz: null
  }
})
```

> /base/get?foo=bar

**丢弃URL中的哈希标记**

```js
axios({
  method: 'get',
  url: '/base/get#hash',
  params: {
    foo: 'bar'
  }
})
```

> /base/get?foo=bar

**保留URL中已存在的参数**

```js
axios({
  method: 'get',
  url: '/base/get?foo=bar',
  params: {
    bar: 'baz'
  }
})
```

> /base/get?foo=bar&bar=baz

## 处理请求 body 数据

```js
axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
})
```

需要将data转换成json字符串的格式

## 处理请求 header

```js
axios({
  method: 'post',
  url: '/base/post',
  headers: {
    'Content-Type': 'application/json;chartset=utf-8'
  },
  data: {
    a: 1,
    b: 2
  }
})
```

## 获取响应数据

```js
axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
}).then((res) => {
  console.log(res)
})
```

获取 `res` 对象，该对象中要包括返回的数据 `data`、`HTTP` 状态码 `status`、状态消息 `statusText`、响应头 `headers`、请求配置对象 `config` 以及请求的 `XMLHTTPRequest` 对象实例 `request`

## 处理响应header

```
connection: keep-alive
content-length: 13
content-type: application/json; charset=utf-8
date: Thu, 07 May 2020 08:28:53 GMT
etag: W/"d-Ssxx4FRxEutDLwo2+xkkxKc4y0k"
x-powered-by: Express
```

将上面的格式转换为对象

## 处理响应data

默认将json字符串转换为json对象

## 错误处理

**网络错误**

**超时错误**

**非200状态码**

## 错误信息增强

```js
axios({
  method: 'get',
  url: '/error/get'
}).then((res) => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e.message)
  console.log(e.request)
  console.log(e.code)
})
```

## 接口扩展

- `axios.request(config)`
- `axios.get(url[, config])`
- `axios.delete(url[, config])`
- `axios.head(url[, config])`
- `axios.options(url[, config])`
- `axios.post(url[, data[, config]])`
- `axios.put(url[, data[, config]])`
- `axios.patch(url[, data[,c onfig]])`

## axios 函数重载

```js
axios({
  url: 'extend/post',
  method: 'post',
  data: {
    msg: 'hi'
  }
})
```
将 axios 变为支持传入两个参数：
```js
axios('extend/post', {
  method: 'post',
  data: {
    msg: 'hi'
  }
})
```

## 响应式数据支持泛型

## axios 拦截器实现

```js
axios.interceptors.request.use(function(config) {
  // 在发送请求之前可以做一些事情
  return config
}, function(error) {
  // 处理请求错误
  return Promise.reject(error)
})

axios.interceptors.response.use(function(response) {
  // 处理响应数据
  return response
}, function (error) {
  // 处理响应错误
  return Promise.reject(error)
})
```

可以添加多个拦截器，request的拦截器后添加的先执行，response的拦截器先添加的先执行

```js
axios.interceptors.request.use(function(config) {
  config.header.test += '1'
  return config
})

axios.interceptors.request.use(function(config) {
  config.header.test += '2'
  return config
})
```

此外，还要支持删除某个拦截器

```js
const myInterceptor = axios.interceptors.request.use(function(config) {...})
axios.interceptors.request.eject(myInterceptor)
```

## 默认配置

defaults

## 合并配置项

## 请求和响应配置化

```js
axios({
  transformRequest:...,
  transformResponse: ...,
  ...
})
```

## 扩展 axios.create 静态接口

## 取消功能

```js
const cancelToken = axios.CancelToken
const source = CancelToken.source()
axios.get('/user/1234', {
  cancelToken: source.token
}).catch(function(e) {
  if (axios.isCancel(e)) {
    console.log('Request canceled', e.message)
  } else {
    // 处理错误
  }
})

// 取消请求
source.cancel('Operation canceled by the user.')
```

或者：

```js
const CancelToken = axios.CancelToken
let cancel
axios.get('/user/1234', {
  cancelToken: new CancelToken(function executor(c) {
    cancel = c
  })
})
// 取消请求
cancel()
```