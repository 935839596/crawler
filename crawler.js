var request = require('request');
var fs = require('fs');
var cheerio = require('cheerio');

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
	for(var i=0; i<lis.length; i++){
		var article = lis.eq(i);
		var title = article.text(),
				url =yuming + article.attr('href');
		//console.log(url)

    let getArticle = new Promise((resolve, reject) => {
      request(url, function (error, response, body) {
        var $$ = cheerio.load(body);
        var author = $$('.author-info .author-name').text(),
            time = $$('.author-info .author-meta').text().trim();
        console.log(url)
        resolve({
          title: title,
          url: url,
          author: author,
          time: time
        })
      })
    })

    getArticle.then( article => {
      console.log( article.title? 'gg':article.title)
    })
		/*request(url, function (error, response, body) {
			var $$ = cheerio.load(body);
			var author = $$('.author-info .author-name').text(),
					time = $$('.author-info .author-meta').text().trim();
			if(!author){
				console.log('wrong', url)
				return
			}
			console.log(author, time)
    })*/
	}

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