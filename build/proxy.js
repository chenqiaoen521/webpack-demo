module.exports = {
  '/.+': {
    target: 'https://www.baidu.com',
    changeOrigin: true,
    logLevel: 'debug',
    pathRewrite: {
      '^/comments': '/api/comments'
    },
    headers: {
      'Cookie': 'sadadad'
    }
  }
}