import axios from '../../src/index'

axios({
  method: 'get',
  url: '/base/get',
  params: {
    a: 1,
    b: 2
  }
})

// /base/get?a=1&b=2

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['bar', 'baz']
  }
})
// /base/get?foo[]=bar&foo[]=baz

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})

// /base/get?foo=%7B%22bar%22:%22baz%22%7D

const date = new Date()
axios({
  method: 'get',
  url: '/base/get',
  params: {
    date
  }
})
// /base/get?date=2020-05-07T11:29:40.030Z

// 对于字符 `@`、`:`、`$`、`.`、` `、`[`、`]` 允许出现在 URL 中，不希望被转义

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: '@:$ '
  }
})

// /base/get?foo=@:$+, 空格会转换成 + 

// 对于为 null 或 undefined 的属性，不会添加到 URL 参数中

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: 'bar',
    baz: null
  }
})
// /base/get?foo=bar

axios({
  method: 'get',
  url: '/base/get#hash',
  params: {
    foo: 'bar'
  }
})
// /base/get?foo=bar

axios({
  method: 'get',
  url: '/base/get?foo=bar',
  params: {
    bar: 'baz'
  }
})

// post

axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
})

const arr = new Int32Array([21, 31])
axios({
  method: 'post',
  url: '/base/buffer',
  data: arr
})