const productionConfig = require('./webpack.prod.conf')
const devlelopmentConfig = require('./webpack.dev.conf')
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
	      '@': resolve('src'),
        jquery$: resolve('src/libs/jquery.js'),
        bootstrap$: resolve('src/libs/bootstrap.js'),
	      bootstrapSelect$: resolve('src/libs/bootstrap-select.min.js')
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
    		},
        {
          test: /\.html$/,
          use: [{
            loader: 'html-loader',
            options: {
              attrs: ['img:src', 'img:data-src']
            }
          }]
        }
    	]
  	},
  	plugins: [
  		utilLoaders.extractLess,
      new webpack.ProvidePlugin({
        $: "jquery",
        jquery: "jquery",
        "windows.jQuery": "jquery",
        jQuery: "jquery"
      })
  	]
  }
}
module.exports = env => {
	let config = env === 'production' ? productionConfig : devlelopmentConfig
  let baseWebpackConfig = generateConfig(env)
  if (env === 'development') {
    // add hot-reload related code to entry chunks
    Object.keys(baseWebpackConfig.entry).forEach(function (name) {
      baseWebpackConfig.entry[name] = [resolve('build/dev-client')].concat(baseWebpackConfig.entry[name])
    })
  }
	return merge(baseWebpackConfig, config)
}