import { isDate, isPlainObject } from './util'

interface URLOrigin {
  protocol: string;
  host: string;
}

/**
 * 进行URL编码，并处理部分特殊字符
 * @param val
 */
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/g, ']')
}

/**
 * 格式化带params的请求地址
 * @param url 请求地址
 * @param params 请求参数
 */
export function buildURL(url: string, params?: any): string {
  if (!params) {
    return url
  }
  const parts: string[] = []
  Object.keys(params).forEach(key => {
    const val = params[key]
    if (val === null || typeof val === 'undefined') {
      return
    }
    let values = []
    if (Array.isArray(val)) {
      // foo: ['bar', 'baz'] => foo[]=bar&foo[]=baz
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })
  let serializeParams = parts.join('&')
  if (serializeParams) {
    const markIndex = url.indexOf('#')
    // 去掉哈希值
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    // 要保留已存在的参数
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializeParams
  }
  return url
}

/**
 * 判断是否同源
 * @param {string} requestURL
 * @return {*}  {boolean}
 */
export function isURLSameOrigin(requestURL: string): boolean {
  const parseOrigin = resolveURL(requestURL);
  return parseOrigin.protocol === currentOrigin.protocol && parseOrigin.host === currentOrigin.host;
}

// 巧妙使用 a 标签获取协议和域名
const urlParsingNode = document.createElement('a');
const currentOrigin = resolveURL(window.location.href);

function resolveURL(url: string): URLOrigin {
  urlParsingNode.setAttribute('href', url);
  const { protocol, host } = urlParsingNode;
  return {
    protocol,
    host
  }
}