// import {commonParams, header_setting} from './config'
var jsonfile = require('jsonfile')
var jsonp = require('jsonp')
const header_setting = {
  "Host": "timeline-merger-ms.juejin.im",
  "Origin": "https://juejin.im",
  "Referer": "https://juejin.im/timeline/frontend"
}

const commonParams = {
  "src": "web",
  "uid": "58671c2f128fe10057ed3709",
  "device_id": 1513219923583,
   "token":("eyJhY2Nlc3NfdG9rZW4iOiIzY3pmVmFsZmp1aXhydEhkIiwicmVmcmVzaF90b2tlbiI6InRQVHVJWlI1NkV1Skh0aEciLCJ0b2tlbl90eXBlIjoibWFjIiwiZXhwaXJlX2luIjoyNTkyMDAwfQ=="),
}

const listParams = Object.assign({},commonParams,{
  "limit": 20,
  "category": "5562b415e4b00c57d9b94ac8"
})

var axios = require('axios')

const  url = 'https://timeline-merger-ms.juejin.im/v1/get_entry_by_rank'

var articleId = [];
var articles = []
axios.get(url, {
  headers: header_setting,
  params: listParams
}).then((response) => {
  articles = response.data.d.entrylist;
  return articles
}).then( (articles)=> {
  for(var i=0;i<articles.length; i++){
    var index = articles[i].originalUrl.indexOf('post/');
    var id;
    if(index<0){
      continue
    }else{
      id = articles[i].originalUrl.substring(index+5)
      articleId.push(id)
    }
  }
  // console.log(articleId)
  var articleList = Promise.all( articleId.map( (id) => {
    return getArticle(id).then( article => article)
  }))
  articleList.then( (articles) => {
    console.log(articles)
    jsonfile.writeFile('articles.json', articles, function(err) {
      console.error(err)
    })
  })
})


function getArticle(id){
  var article1_Params = Object.assign({}, commonParams, {
    type: 'entry',
    postId: id
  })
  var article2_Params = Object.assign({}, commonParams, {
    type: 'entryView',
    postId: id
  })
  var article_url = 'https://post-storage-api-ms.juejin.im/v1/getDetailData'
  var article = {}, user = {};
  var article_header_setting = Object.assign({}, header_setting, {
    Host: 'post-storage-api-ms.juejin.im',
    Referer: 'https://juejin.im/post/'+id
  });
  return new Promise( resolve => {
    axios.get(article_url, {
      headers: article_header_setting,
      params: article1_Params
    }).then( (response) => {
      var data = response.data.d;
      var tag = []
      user.userId = data.user.objectId;
      user.avatarLarge = data.user.avatarLarge;
      user.username = data.user.username
      for(let i=0; i<data.tags.length; i++){
        tag.push(data.tags[i].title);
      }
      user.tag = tag.slice();
      user.password = '123456'
      user.article = []
      user.article.push(id)
      // console.log(user)

      article.id = id;
      article.buildTime = data.buildTime
      article.author = user;
      article.tag = tag.slice();
      // console.log(article)
    }).catch(error => {
      console.log(error)
    }).then( () => {
      axios.get(article_url, {
        headers: article_header_setting,
        params: article2_Params
      }).then( (response)=> {
        var data = response.data.d;
        article.imageCache = data.imageCache
        article.content = data.content
        resolve(article);
      }).then( ()=>{
        // jsonfile.writeFile('article.json', article, function(){})
      })
    })
  })



  // jsonp(article_url, article1_Params, function(error, data){
  //   console.log(data)
  // })

}