//import {commonParams, header_setting} from './config'
require('../mongodb/config/mongoose')
var User = require('../mongodb/model/user.model')
var Article = require('../mongodb/model/article.model')


var jsonfile = require('jsonfile')
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
  "limit": 30,
  "category": "5562b415e4b00c57d9b94ac8",
    // "before": 8.452
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
  /*var articleList = Promise.all( articleId.map( (id) => {
    return getArticle(id).then( article => article)
  }))
  articleList.then( (articles) => {
    console.log(articles)
    jsonfile.writeFile('articles.json', articles, function(err) {
      console.error(err)
    })
  })*/
  articleId.map( id => {
    getArticle(id)
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

    //第一个请求，先找到文章的作者，以及文章标签等信息
    axios.get(article_url, {
      headers: article_header_setting,
      params: article1_Params
    }).then( (response) => {
      var data = response.data.d;
      if(!data) return;
      var tag = []
      if(!data.user) return
      user.uid = data.user.objectId;
      user.avatarLarge = data.user.avatarLarge;
      user.username = data.user.username
      for(let i=0; i<data.tags.length; i++){
        tag.push(data.tags[i].title);
      }
      user.tag = tag.slice();
      user.password = '123456'
      user.article = []
      user.company = data.user.company
      user.article.push(id)

      article.id = id;
      article.buildTime = data.buildTime
      article.title = data.title
      article.shortContent = data.content
      article.tag = tag.slice();

      var userExit = false;

      //将得到的user存进数据库

      var newUser = new User(user)
      newUser.save(function(err) {

        if(err && err.code == 11000) {
          //说明有重复了，要将标签存入
          User.findOne({ 'uid': user.uid}, function(err, oldUser) {

            userExit = true

            var newTag = oldUser.tag.concat(tag);
            newTag = [...new Set(newTag)]
            oldUser.set('tag', newTag)

            //存入新文章
            var oldList = oldUser.article.concat(user.article);
            oldUser.set('article', [...new Set(oldList)])

            oldUser.save(function (err, updatedUser) {
              if(err) {
                console.log(err)
                return
              }
              article.author = updatedUser._id;
              console.log('成功更新作者信息',updatedUser.username)
            })
          })
        }else if(err) {
          console.log('错误信息',err)
        }else{
            console.log('成功存入作者信息',user.username)
        }
      })

      if(!userExit){
        article.author = newUser._id
      }




    }).catch(error => {
      console.log(error)
    }).then( () => {
      // console.log('??123?')
      //获取文章的详细内容
      axios.get(article_url, {
        headers: article_header_setting,
        params: article2_Params
      }).then( (response)=> {
        var data = response.data.d;
        article.imageCache = data.imageCache
         article.content = data.content

        //存入数据库
        var newArticle = new Article(article);
        newArticle.save(function(err) {
          //console.log(newArticle.id)
          if(!err){
            console.log('成功存入文章')
          }else{
            console.log('文章已存在')
          }
        })

      })
    })
}