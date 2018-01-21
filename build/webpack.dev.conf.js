const webpack = require('webpack')
const path = require('path')

module.exports = {
	devServer: {
		port: 9001,
		overlay: true,
		proxy: {
			'/': {
				target: 'https//m.weibo.cn',
				changeOrange: true,
				logLevel: 'debug',
				pathRewrite: {
					'^/comments': '/api/comments'
				},
				headers: {
					'Cookie': 'sadadad'
				},
				hot: true,
				hotonly: true,
				historyApiFallback: {
					rewrites: [
						{
							from: /^\/([a-zA-Z0-9]+\/?)([a-zA-Z0-9]+)/,
							to: function (context) {
								return '/' + context.match[1] + context.match[2] + '.html'
							}
						}
					]
				}
			}
		}
	},

	devtool: 'cheap-module-source-map',

	plugins: [
		new webpack.HotModuleReplacementPlugin(),

		new webpack.NamedModulesPlugin(),
	]
}