var http = require('http')
var serverProxy = {
  doProxy: function (opt, request, response) {
    if (request.method === 'POST') {
      this.doPost(opt, request).then((result) => {
        this.createRequest(result, response)
      })
    } else {
      this.doGet(opt, request).then((result) => {
        this.createRequest(result, response)
      })
    }
  },

  createRequest: function (result, response) {
    var body = ''
    var req
    var querystring = require('querystring')

    req = http.request(result.options, function (res) {
      console.log('[PROXY STATUS]: ' + res.statusCode)
      console.log('[PROXY HEADERS]: ' + JSON.stringify(res.headers))

      res.setEncoding('utf8')
      // res.on('data', function (chunk) {
      //   console.log('[PROXY BODY]: ' + chunk)
      //   body += chunk
      //   res.pipe(response)
      // })
      res.pipe(response)
      res.on('end', function () {
        console.info('[PROXY response complete]')
      })
    })

    req.write(result.postData + '\n')
    req.on('error', function (e) {
      console.log('problem with request: ' + e.message)
    })
    req.end(function () {
      console.info('[PROXY Request success]')
    })
  },

  doPost: function (opt, request) {
    var options
    var postData = ''
    var promise
    // var querystring = require('querystring')

    options = {
      host: opt.host, // 这里是代理服务器       
      port: opt.port, // 这里是代理服务器端口 
      method: request.method,
      path: request.originalUrl,
      headers: {...request.headers}
    }

    promise = new Promise(function (resolve) {
      if (!request['headers']['content-type'] || (request['headers']['content-type']).indexOf('application/json') >= 0) {
        request.on('data', function (data) {
          postData += data
        })

        request.on('end', function () {
          console.info('[POST DATA]', postData)
          options['headers']['Content-Type'] = 'application/json;charset=UTF-8'
          options['headers']['Content-Length'] = Buffer.byteLength(postData)
          resolve({options, postData})
        })
      } else {
        resolve({options, postData})
      }
    })

    return promise
  },

  doGet: function (opt, request) {
    console.info('[PROXY HTTP GET PARAMS]', request.params, request.query, request.body)
    var options
    var postData = ''
    var promise
    // var querystring = require('querystring')

    options = {
      host: opt.host, // 这里是代理服务器       
      port: opt.port, // 这里是代理服务器端口 
      method: request.method,
      path: request.originalUrl,
      headers: {...request.headers}
    }

    promise = new Promise(function (resolve) {
      resolve({options, postData})
    })

    return promise
  }
}

module.exports = serverProxy
