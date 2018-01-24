const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin') 
const PurifyWebpack = require('purifycss-webpack') 
const HtmlInlinkChunkPlugin = require('html-webpack-inline-chunk-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')

const path = require('path')
const glob = require('glob-all')
module.exports = {
	plugins: [
		new CleanWebpackPlugin(
            ['../dist'],{
            	allowExternal: true
            }
        ),
		new webpack.optimize.UglifyJsPlugin(),
		new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: 'static',
        ignore: ['.*']
      }
    ]),
		new PurifyWebpack({
			paths: glob.sync([
				'./*.html',
				'./src/*.js'
			])
		}),
		new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
		new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname,'../index.html'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
/*    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),*/
    new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest'
		}),
    new HtmlInlinkChunkPlugin({
			inlineChunks: ['manifest']
		}),
	]
}