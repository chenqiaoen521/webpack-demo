const express = require('express')
const webpack = require('webpack')
const opn = require('opn')
const path = require('path')

const config = require('./webpack.base.conf.js')('development')
const compiler = webpack(config)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

const proxyMiddleware = require('http-proxy-middleware')
const historyApiFallback = require('connect-history-api-fallback')

const proxyTable = require('./proxy')
const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  quiet: true,
  stats: {
    colors: true,
    chunks: false
  }
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})

const history = require('./historyfallback')

const app = express()
const port = 3000

Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  app.use(proxyMiddleware(context, options))
})

app.use(historyApiFallback(history))

app.use(devMiddleware)

app.use(hotMiddleware)

app.use('/static', express.static(path.resolve(__dirname, '../static')))

const uri = 'http://localhost:' + port

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  opn(uri)
})

app.listen(port, function() {
  console.log('success listen to' + port)
  // opn('http://localhost:' + port)
})