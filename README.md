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
