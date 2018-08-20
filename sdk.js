const API = 'http://121.42.29.74:9125'
// const API = 'http://192.168.1.178:3000/mock/109'
import requests from './base'


const replaceBreakLine = (text) => {
  if (text) {
    return text.replace(/<br\/>/ig, '\n')
  }
  return text
}

export default class YX {
  constructor(userId, token) {
    this.userId = userId
    this.token = token
  }
  call (uri, flag) {
    // return `${API}/api/${uri}?access_token=${this.key}`
    // let userId = wx.getStorageSync('userId')
    // let token = wx.getStorageSync('accessToken')
    if(flag) {
      let userId = this.userId || wx.getStorageSync('userId')
      let token = this.token || wx.getStorageSync('accessToken')
      return `${API}/api/${uri}?userid=${userId}&LoginToken=${token}`
    }else{
      return `${API}/api/${uri}`
    }
    
  }
  getHeaders (headers) {
    headers = headers || {}
    return Object.assign({}, {'Access-Token': this.key}, headers)
  }
  get (url, data = '') {
    const onSuccess = () => {
    }
    let ret = requests.get(url, data, this.getHeaders())
    return ret
  }
  post (url, data, params = {}, headers = {}) {
    // headers = this.getHeaders(headers)
    let ret = requests.post(url, data, params, headers)
    return ret
  }
  uploader (localPath, formData) {
    const uri = `user/uploader/image/`
    formData = formData || {}
    let url = this.call(uri)
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: url,
        filePath: localPath,
        name: 'img',
        formData: formData,
        success: resolve,
        fail: reject,
      })
    })
  }


  /**
   * 
   * 
   */
  checkToken(userid){
    const uri = `AccessToken/GetValidToken`
    let url = this.call(uri)
    let data = { userid }
    let { promise, req } = this.get(url, data)
    return { promise, req }
  }
  getSession(name,code){
    // name
    // code
    let url = 'http://b.cqyouloft.com/atcapi/WeChat/GetMiniProgramUserInfo'
    let data = {name,code}
    let { promise, req } = this.get(url, data)
    return { promise, req }
  }
  login (data) {
    /**
     * id
     * openId
     * unionId
     * headImgUrl
     * nickName
     * phone
     * platForm
     * DeviceId
     */
    let info = Object.assign({ platForm:0 },data)
    const uri = `Users/Login`
    let url = this.call(uri)
    let { promise, req } = this.post(url, info)
    return {promise, req}
  }

  /**
   * 图片上传
   * @param {*} name 
   * @param {*} res 
   */
  imgUpload (name,res) {
    const uri = `Upload/UploadByBase64`
    let url = this.call(uri,true)
    let base64 = 'data:image/jpg;base64,' + res
    // console.log('base64: ',base64)
    let data = { 
      data: base64,
      fileName: name
    }
    let { promise, req } = this.post(url, data)
    return { promise, req }
  }

  /**
   * 获取全部城市
   */
  impressCityList() {
    const uri = `Citys/GetList`
    let url = this.call(uri, true)
    let { promise, req } = this.get(url)
    return { promise, req }
  }

  /**
   * 明信片
   * @param {} 
   *    page
   *    size
   */
  cardList(params){
    const uri = `Postcard/GetList`
    let url = this.call(uri,true)
    let data = {
      PageIndex: params.page,
      limit: params.size
    }
    let { promise, req } = this.get(url, data)
    return { promise, req }
  }
  cardCreate(image) {
    const uri = `Postcard/Insert`
    let url = this.call(uri, true)
    let data = {
      BgImage: image
    }
    let { promise, req } = this.post(url, data)
    return { promise, req }
  }
  cardCheck(id) {
    const uri = `Postcard/GetById`
    let url = this.call(uri)
    let data = {
      id
    }
    let { promise, req } = this.get(url, data)
    return { promise, req }
  }


  /**
   * 印象列表
   * @param {*} params 
   */
  photoList(params) {
    /**
     * ShareUser
     * userid
     * ShareCityCode      101040100
     * CityCode
     * PageIndex
     * limit              10
     * IsIndex            非0 首页数据
     */
    const uri = `Album/GetList`
    let url = this.call(uri, true)
    let info = Object.assign({}, params)
    let { promise, req } = this.get(url, info)
    return { promise, req }
  }
  photoCreate(params) {
    /**
     * id
     * cuntryCode
     * provinceCode 
     * cityCode
     * title
     * contents 
     * images         多图 ; 连接
     * scenicSpot     景点名称
     */
    const uri = `Album/Insert`
    let url = this.call(uri, true)
    let { promise, req } = this.post(url, params)
    return { promise, req }
  }
  photoUpdate(params) {
    /**
     * id
     * cuntryCode
     * provinceCode 
     * cityCode
     * title
     * contents 
     * images         多图 ; 连接
     * scenicSpot     景点名称
     */
    const uri = `Album/Update`
    let url = this.call(uri, true)
    let { promise, req } = this.post(url, params)
    return { promise, req }
  }
  photoDetail( id ) {
    /**
     * id
     */
    const uri = `Album/GetById`
    let url = this.call(uri, true)
    let { promise, req } = this.get(url, { id })
    return { promise, req }
  }
  photoDelete(id) {
    /**
     * id
     */
    const uri = `Album/Delete`
    let url = this.call(uri, true)
    let { promise, req } = this.post(url, { id })
    return { promise, req }
  }
}