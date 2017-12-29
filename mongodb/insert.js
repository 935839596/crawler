require('../mongodb/config/mongoose')
// var User = require('../mongodb/model/user.model')
var Article = require('../mongodb/model/article.model')

var article = new Article({
  id: '12456431',
  buildTime: '154100'
})

article.save(function(err){
  console.log('right')
})