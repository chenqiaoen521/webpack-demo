const productionConfig = require('./webpack.prod.conf')
const devlelopmentConfig = require('./webpack.dev.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const generateConfig = env => {
  const utilLoaders = require('./util.loader')(env)
	return {
		entry: {
			app: './src/app.js'
		},
		output: {
			path: resolve('dist'),
			publicPath: env === 'production' ? '' : '/',
			filename: 'js/[name]-bundle-[hash:5].js',
      chunkFilename: 'js/[name]-chunk-[hash:5].js'
		},
		resolve: {
	    extensions: ['.js', '.json'],
	    alias: {
	      '@': resolve('src')/*,
	      jquery$: resolve('src/libs/jquery.js')*/
	    }
	  },
	  module: {
    	rules: [
    		{
    			test: /\.js$/,
          include: [resolve('src')],
          exclude: [resolve('src/libs'), resolve('node_modules')],
    			use: utilLoaders.scriptLoader
    		},
    		{
    			test: /\.less$/,
    			use: utilLoaders.styleLoader
    		},
    		{
    			test: /\.(png|jpg|jpeg|gif)$/,
    			use: utilLoaders.fileLoader
    		},
    		{
    			test: /\.(eot|woff2?|ttf|svg)$/,
    			use: utilLoaders.fontLoader
    		}
    	]
  	},
  	plugins: [
  		utilLoaders.extractLess,
      /*new webpack.ProvidePlugin({
        $: 'jquery'
      }),*/
  		new HtmlWebpackPlugin({
  			filename: 'index.html',
  			template:  resolve('index.html'),
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
    		})
  		
  	]
  }
}




module.exports = env => {
	let config = env === 'production' ? productionConfig : devlelopmentConfig
	return merge(generateConfig(env), config)
}