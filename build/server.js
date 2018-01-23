const express = require('express')
const webpack = require('webpack')
const opn = require('opn')

const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
const proxyMiddleware = require('http-proxy-middleware')
const historyApiFallback = require('connect-history-api-fallback')

const config = require('./webpack.base.conf.js')('development')
const compiler = webpack(config)

const proxyTable = require('./proxy')


const history = require('./historyfallback')

const app = express()
const port = 3000

Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  app.use(proxyMiddleware(context, options))
})

app.use(historyApiFallback(history))

app.use(devMiddleware(compiler, {
  publicPath: config.output.publicPath,
  quiet: true
}))

app.use(hotMiddleware(compiler,{
  log: false,
  heartbeat: 2000
}))




app.use(express.static('./static'))

app.listen(port, function() {
  console.log('success listen to' + port)
  opn('http://localhost:' + port)
})