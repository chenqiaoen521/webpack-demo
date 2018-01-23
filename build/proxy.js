module.exports = {
  '/': {
    target: 'https//m.weibo.cn',
    changeOrange: true,
    logLevel: 'debug',
    pathRewrite: {
      '^/comments': '/api/comments'
    },
    headers: {
      'Cookie': 'sadadad'
    }
  }
}