
let settings = {
  dataType: 'json',
  headers: {
    "Content-Type": "application/json;charset=UTF-8"
  },
}
let requests = {
  settings: settings
}

requests.__proto__ = {
  buildQueryString (params) {
    if (!params) {
      return ''
    }
    let ary = []
    for (let i in params) {
      let val = params[i]
      ary.push(`${i}=${val}`)
    }
    return ary.join('&')
  },
  joinQueryString (url, queryString) {
    let separator = '?'
    if (url.indexOf('?')>-1) {
      separator = '&'
    }
    if (queryString) {
      return [url, queryString].join(separator)
    }
    return url
  },
  urlCheck(){
    const userId = wx.getStorageSync('userId') || '';
    const openId = wx.getStorageSync('openId') || '';
    return {
      userId, openId
    }
  },
  request ({options, header}) {
    let req = null
    options.header = Object.assign({}, settings.headers, header)
    let promise = new Promise((resolve, reject) => {
      options.success = resolve
      options.fail = reject
      req = wx.request(options)
    }).then((res) => {
      let { data} = res
      
      if (res.statusCode == 401){
        wx.showToast({
          title: '身份认证失败，请重新登录',
          icon: 'none'
        })
        throw new Error(data.msg)
      }
      if (data.status === 0 ) {
        return data.data
      } else if (data.status === undefined){
        return data
      }
      throw new Error(data.msg)
    })
    return {req: req, promise: promise}
  },
  _get (url, data, params, header = {}) {
    let queryString = this.buildQueryString(params)
    url = this.joinQueryString(url, queryString)
    let options = {url, data, method: 'GET'}
    return this.request({options, header})
  },
  get (url, params, header = {}) {
    let options = {url, data: params, method: 'GET'}
    return this.request({options, header})
  },
  post (url, data = {}, params, header = {}) {
    let queryString = this.buildQueryString(params)
    url = this.joinQueryString(url, queryString)
    let options = {url, data: JSON.stringify(data), method: 'POST'}
    return this.request({options, header})
  },
  put (url, data, params, header = {}) {
    let queryString = this.buildQueryString(params)
    url = this.joinQueryString(url, queryString)
    let options = {url, data, method: 'PUT'}
    return this.request({options, header})
  },
  patch (url, data, params, header = {}) {
    let queryString = this.buildQueryString(params)
    url = this.joinQueryString(url, queryString)
    let options = {url, data, method: 'PUT'}
    return this.request({options, header})
  },
  delete (url, params, header = {}) {
    let queryString = this.buildQueryString(params)
    url = this.joinQueryString(url, queryString)
    let options = {url, method: 'DELETE'}
    return this.request({options, header})
  },
  head (url, params) {

  },
  trace (url) {

  },
  connect (url) {

  },
}

export default requests
