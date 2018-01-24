const webpack = require('webpack')
const path = require('path')
const proxy = require('./proxy')
const history = require('./historyfallback')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	/*devServer: {
		port: 9001,
		overlay: true,
		hot: true,
    hotOnly: true,
		proxy,
		historyApiFallback: history
	},*/

	devtool: '#cheap-module-eval-source-map',

	plugins: [
		new webpack.HotModuleReplacementPlugin(),

		new webpack.NamedModulesPlugin(),
		new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname,'../index.html'),
      inject: true
    })
	]
}