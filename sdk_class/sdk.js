import SdkBase from './base'

/*************************************************************************
 *  sdk 使用方法;
 *  import API from '../sdk/sdk'
 *  const api = new API();
 *  api.sendVerifyCode(13355744868).then((response)=>{
 *    response.json.data
 *  }).catch((e)=>{
 *    alert(e.message);
 *  });
 *************************************************************************/

class Health extends SdkBase {
  constructor (key) {
    super(key)
    // this.router = '/api/hotel'
  }

  getWishes () {
    return this._post('/api/GuideTest/GetAllWishes')
  }

  pushExam(data) {
    /**
     * @data:{
     *  UserId	    x       string	  用户id
     *  UserName	          string	  用户名称
     *  Sex	                int	      性别1男2女
     *  Birthday	          long	    生日时间戳
     *  WishList	          array	    用户愿望数组[{“WishId”:1},{“WishId”:2}]
     *  HealthTestJson	    array	    测验每道题题目与结果数组[{“QuestionNumber”:1,”Answer”:”1,2,3”},{“QuestionNumber”:1,”Answer”:”1,2,3”}]
     *  HealthResultJson	  string	  测验结果Json{“Healthy”:2,”BloodNotEnough”:4,”Moisture”:5,”Cold”:0,”Hot”:4}
     *  Version	            int	      版本号，初始为1，后续若更改测验题目，版本号需要+1
     * }
     */
    return this._post('/api/GuideTest/SubmitHealthTest',data)
  }

  getUserHealth() {
    /**
     * @param:  
     *  UserId    x   string	用户id
     */
    return this._post('/api/Home/GetUserDailySuitableTaboo')
  }

  getWindowInfo(param = 1) {
    /**
     * @param:  
     *  DisplayWindowId    int	橱窗栏目id，本期固定为1--健康日报
     */
    return this._post('/api/Home/GetDisplayWindowInfo', param)
  }

  getDailyArticle(data) {
    /**
     * @data:  
     *  BodyStateTypeId	      int     	体质类型Id
     *  Date	                long    	日期时间戳毫秒
     *  PageSize	            int     	单文章栏目所展示文章数量
     */
    return this._post('/api/Home/GetDisplayWindowInfo', data)
  }

  getArticle(articleId){
    /**
     * ArticleId	int	文章id
     */
    return this.__get('/api/Article/GetArticleDetail', articleId)
  }

  getResult() {
    /**
     * UserId	   x   string	用户id
     */
    return this._post('/api/GuideTest/GetHealthTest')
  }

}
class Mall extends SdkBase {
  constructor(key) {
    super(key)
    this.router = true
  }
  getCategoryList() {
    return this._get('/api/TKShop/GetCategoryList')
  }
  getSkuList(params) {
    /**
     * params:
     *    pageindex	    
     *    pagesize	    
     *    CateGoryCode    
     */
    return this.__get('/api/TKShop/GetCatoryProductList', params)
  }
}
class Upload extends SdkBase {
  /**
   *
   * @param url
   * @param file
   * @return promise
   */
  postFile (url, file) {
    let formData = new FormData()
    formData.append('file', file, file.name)
    let config = {
      headers: {'Content-Type': 'multipart/form-data'},
    }
    return this._post(url, formData, config)
  }

  userUpload (file) {
    /**
     普通用户上传文件请使用该接口
     @file fileObject
     @rtype
     {
      status:200,
      info:'成功',
      data:{
            storage:storage_id,
            url:'https://img.51zhuxiaoer.com/upload/2018/07/abcdefg.jpg'
            }
        }
     }
     */
    const url = '/api/home/upload/user/'
    return this.postFile(url, file)
  }
}

/**
 * SDK Main
 */
export class Api extends SdkBase {
  constructor (key) {
    super(key)
    this.health = new Health(key)
    this.mall = new Mall(key)
  }
}

export default Api
