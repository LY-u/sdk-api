import axios from 'axios'

let TOKEN = localStorage.getItem('Uid')
let UID = localStorage.getItem('HealthToken')




// const API_DOMAIN = 'http://health.51wnl-cq.com'
const API_DOMAIN = 'http://192.168.15.128:1506'
const API_MALL = 'https://lbmall.51wnl.com'
// const API_MALL = 'http://192.168.1.178:3000/mock/97'
export class JsonResponse {
  constructor (res) {
    let {data: json} = res
    this.json = json
    this.res = res
  }
  get headers () {
    return this.res.headers
  }
  get config () {
    return this.res.config
  }
  get code () {
    return this.json.Code
  }
  get success () {
    let json = this.json
    return (json.status === 200 || json.status === 201)
  }
}

// axios.defaults.baseURL = API_DOMAIN
axios.defaults.headers.common['userid'] = UID;
axios.defaults.headers.common['logintoken'] = TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.interceptors.response.use(
  (response) => {
    let resp = new JsonResponse(response)
    if (resp.code === 0 || resp.code === undefined) {
      return resp.json.Data || resp.json.data
    }
    throw new Error(resp.json.Message)
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default class SdkBase {
  constructor (key) {
    this.key = key
    this.router = ''
  }

  getPath (path) {
    if (this.router) {
      return API_MALL + path
    }
    return API_DOMAIN + path
  }

  _get (url, config) {
    return axios.get(this.getPath(url), config)
  }
  __get(url, data, config) {
    console.log(data)
    return axios.get(this.getPath(url), {params:data}, config)
  }

  _post (url, data, config) {
    return axios.post(this.getPath(url), data, config)
  }

  _put (url, data, config) {
    return axios.put(this.getPath(url), data, config)
  }

  _patch (url, data, config) {
    return axios.patch(this.getPath(url), data, config)
  }

  _delete (url, config) {
    return axios.delete(this.getPath(url), config)
  }
}
