const webpack = require('webpack')
const path = require('path')
const proxy = require('./proxy')
const history = require('./historyfallback')

module.exports = {
	devServer: {
		port: 9001,
		overlay: true,
		hot: true,
    hotOnly: true,
		proxy,
		historyApiFallback: history
	},

	devtool: 'cheap-module-source-map',

	plugins: [
		new webpack.HotModuleReplacementPlugin(),

		new webpack.NamedModulesPlugin(),
	]
}