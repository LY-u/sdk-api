
let settings = {
  dataType: 'json',
  headers: {},
}
let requests = {
  settings: settings,
  options (url) {
  },
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
    if (url.indexOf('?')) {
      separator = '&'
    }
    if (queryString) {
      return [url, queryString].join(separator)
    }
    return url
  },
  request ({options, header}) {
    let req = null
    options.header = Object.assign({}, settings, header)
    let promise = new Promise((resolve, reject) => {
      options.success = resolve
      options.fail = reject
      req = wx.request(options)
    }).then((res) => {
      let { data} = res
      // {
      //    data:{},
      //    msg:'',
      //    status:0
      // }
      if (res.statusCode ==401){
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
  get (url, params, headers = {}) {
    let options = {url: url, data: params, method: 'GET'}
    return this.request({options: options, header: headers})
  },
  post (url, data, params, headers = {}) {
    data = data || {}
    let queryString = this.buildQueryString(params)
    url = this.joinQueryString(url, queryString || '')
    let options = {url: url, data: JSON.stringify(data), method: 'POST'}
    return this.request({options: options, header: headers})
  },
  put (url, data, params, headers = {}) {
    let queryString = this.buildQueryString(params)
    url = this.joinQueryString(url, queryString || '')
    let options = {url: url, data: data, method: 'PUT'}
    return this.request({options: options, header: headers})
  },
  patch (url, data, params, headers = {}) {
    let queryString = this.buildQueryString(params)
    url = this.joinQueryString(url, queryString || '')
    let options = {url: url, data: data, method: 'PUT'}
    return this.request({options: options, header: headers})
  },
  delete (url, params, headers = {}) {
    let queryString = this.buildQueryString(params)
    url = this.joinQueryString(url, queryString || '')
    let options = {url: url, data: data, method: 'DELETE'}
    return this.request({options: options, header: headers})
  },
  head (url, params) {

  },
  trace (url) {

  },
  connect (url) {

  },
}

export default requests