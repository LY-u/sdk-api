import axios from 'axios'
import qs from 'qs'
// import { urlBefore } from './com'
//
let urlBefore = ' http://192.168.23.200:8086/smk_city_activity' //测试
// let urlBefore = ' https://activity.96225.com/smk_city_activity' //生产
// let urlBefore = ' https://activity.96225.com/test_smk_city_activity' //验证

let CancelToken = axios.CancelToken;
var cancelPost;

axios.interceptors.response.use(
  response => {
    let {data: json} = response
    let resp = json
    if(resp.code === 0) return resp;
    return Promise.reject({msg:resp.msg})
    // throw new Error(resp.msg)
  },
  error => {
    if(error.message=='402'){
      return Promise.reject({msg:'取消请求'})
    }else{
      return Promise.reject({msg:'网络异常,请稍后再试'})
    }
  },
)

export function post(url, data, type) {
  let t = type?type:'application/x-www-form-urlencoded;charset=UTF-8'
  return axios({
    url:urlBefore+url ,
    method: 'post',
    data:'request=' + JSON.stringify(data),
    headers: {
      'Content-Type': t, 
      'appId': "com.smk.test.test"
    },
    cancelToken: new CancelToken(function executor(c){
      cancelPost = c
    })
  })
}

export function postQuery(url, data, type) {
  return axios({
    url:urlBefore+url ,
    method: 'post',
    data:qs.stringify(data),
    headers: {
      'Content-Type': type, 
      'appId': "com.smk.test.test"
    }
  })
}

export function getQuery(url, data, type) {
  return axios({
    url:urlBefore+url+`?${qs.stringify(data)}`,
    method: 'get',
    headers: {
      'Content-Type': type,
      'Authorization': 'Bearer'+' '+ localStorage.getItem('token_crm'),
    }
  })
}

export function get(url, data, type) {
  return axios({
    url:urlBefore+url+data,
    method: 'get',
    headers: {
      'Content-Type': type,
      'Authorization': 'Bearer'+' '+ localStorage.getItem('token_crm'),
    }
  })
}

export function put(url, data, type) {
  return axios({
    url:urlBefore+url+data.id,
    method: 'put',
    data:qs.stringify(data.req),
    headers: {
      'Content-Type': type,
      'Authorization': 'Bearer'+' '+ localStorage.getItem('token_crm'),
    }
  })
}

export { cancelPost }