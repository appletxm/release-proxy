var http = require('http')
var serverProxy = {
  doProxy: function (opt, request, response) {
    console.info('#######1#######', request['headers']['content-type'], request['headers']['content-length'])

    if (request.method === 'POST') {
      this.doPost(request)
    } else {
      this.doGet(request)
    }

    // console.info('[req info proxy]', opt, request.originalUrl, request.method)

    // console.info('=========111==========')
    // console.info(request, '****************\n', request.body.userAccount)
    // console.info('=========222==========')

    // var options = {
    //   host: opt.host, // 这里是代理服务器       
    //   port: opt.port, // 这里是代理服务器端口 
    //   method: request.method,
    //   params: request.params,
    //   query: request.query,
    //   headers: {
    //     'Content-Type': 'application/json;charset=UTF-8',
    //     'Content-Length': Buffer.byteLength(postData)
    //   }
    // // headers: {
    // //   // 如果代理服务器需要认证
    // //   // 'Proxy-Authentication': 'Base ' + new Buffer('user:password').toString('base64') // 替换为代理服务器用户名和密码
    // // }
    // }

    // console.info('[PROXY TO]:', JSON.stringify(options))
    // var req = http.request(options, function (res) {
    //   console.log('[STATUS]: ' + res.statusCode)
    //   console.log('[HEADERS]: ' + JSON.stringify(res.headers))
    //   res.setEncoding('utf8')
    //   res.pipe(response)
    //   // res.on('data', function (chunk) {  
    //   //     console.log('[BODY]: ' + chunk);  
    //   //     res.pipe(response);  
    //   // });  
    //   res.on('end', function () {
    //     console.info('[PROXY complete]')
    //   })
    // })

  // req.on('error', function (e) {
  //   console.log('problem with request: ' + e.message)
  // })
  // req.end(function () {
  //   console.info('[PROXY success]')
  // })
  },

  doPost: function (request) {
    var postData
    var str = ''

    if (request['headers']['content-type'].indexOf('application/json') >= 0) {
      console.info('=======3=======')
      request.on('data', function (data) {
        str += data
      })

      request.on('end', function () {
        console.info('######2########', typeof str, str)
      })
    } else {
      console.info('=======4=======')
    }
  },
  doGet: function (request) {}
}

module.exports = serverProxy
