var request = require('request');
var fs = require('fs');
var cheerio = require('cheerio');
var jsonfile = require('jsonfile')

// request.get('https://juejin.im/')
// 	//.auth('15889666430', 'chenruilin1', false)
// 	.on('response',function (response){
// 		console.log('done:',response)
// 	})
// 	.on('error', function(error){
// 		console.log('error:', error)
// 	})

var yuming = 'https://juejin.im'



request('https://juejin.im/welcome/frontend', function(error, response, body){
	var $ = cheerio.load(body);
	var lis = $('.title-row .title');
	var urlArray = [];
	for(var i=0; i<lis.length; i++){
		var article = lis.eq(i);
		var title = article.text(),
				url = yuming + article.attr('href');
		urlArray.push(url)
		//console.log(url)



	}

  function getArticle(url){
    return new Promise((resolve, reject) => {
      request(url, function (error, response, body) {
        var $ = cheerio.load(body);
        var author = $('.author-info .author-name').eq(0).text(),
            time = $('.author-info .author-meta').eq(0).text().trim(),
            title = $('.post-title').eq(0).text();
        var article = {
          title: title,
          url: url,
          author: author,
          time: time
        }
        resolve(JSON.stringify(article))
      })
    })
  }


  var articleList = Promise.all( urlArray.map( (url) => {
	  return getArticle(url).then( article => JSON.parse(article) )
  }))

  articleList.then( articleList => {
    jsonfile.writeFile('a.json', articleList, function(err) {
      console.error(err)
    })
    //console.log(articleList)
  })





	// fs.writeFile('a.json',lis[0],{encoding: 'json'}, function(error){
	// 	console.log('right')
	// })
	/**fs.writeFile('./xixi.html', body, {encoding: 'utf-8'}, function(error){
		if(error){
			console.log('文件写入失败\n', error)
		}else{
			console.log('文件写入成功')
		}
	})*/
})