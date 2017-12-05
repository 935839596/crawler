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

request('https://juejin.im/welcome/frontend', function(error, response, body){
	var $ = cheerio.load(body);
	var lis = $('.main-container .welcome__section .entry-list li');
	console.log('li has :', lis.length)
	for(var i in lis){
		console.log(i, $(lis[i]).find('a.title').text())
	}

	/**fs.writeFile('./xixi.html', body, {encoding: 'utf-8'}, function(error){
		if(error){
			console.log('文件写入失败\n', error)
		}else{
			console.log('文件写入成功')
		}
	})*/
})