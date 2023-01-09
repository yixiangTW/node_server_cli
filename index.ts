const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')

let listenDir, listenPort, cacheAge;


const startServer = (_listenDir = 'public', _listenPort = 8888, _cacheAge = 31536000) => {
  listenPort = _listenPort;
  listenDir = path.resolve(process.cwd(), _listenDir)
  cacheAge = _cacheAge

  const server = http.createServer()
  server.on('request', (request, response) => {
    const { method, url: requestUrl} = request
    if(method !== 'GET') {
      response.statusCode = 405;
      response.end('405 buddy!')
    }
    const fileName = requestUrl.slice(1) || 'index.html'
    fs.readFile(path.resolve(listenDir, fileName), (error, data) => {
      if(error) {
        if(error.errno === -2) {
          fs.readFile(path.resolve(listenDir, '404.html'), (error, data) => {
            response.statusCode = 404;
            response.end(data)
          })
        } else {
          response.statusCode = 500;
          response.end('500 buddy!')
        }
        return
      }
      response.setHeader('Cache-Control', `public, max-age=${cacheAge}`)
      response.end(data)
    })
  })
  server.listen(listenPort, () => {
    console.log(`open: http://localhost:${listenPort}`)
  })
}

module.exports = { startServer }
