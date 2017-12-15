// import {commonParams, header_setting} from './config'
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
  "limit": 20,
  "category": "5562b415e4b00c57d9b94ac8"
}

var axios = require('axios')

const  url = 'https://timeline-merger-ms.juejin.im/v1/get_entry_by_rank'

axios.get(url, {
  headers: header_setting,
  params: commonParams
}).then((response) => {
  console.log(response)
  jsonfile.writeFile('b.json', response.data, function(err) {
    console.error(err)
  })
})