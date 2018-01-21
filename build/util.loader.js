const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const isProd = exports.env === 'production'
const isDev = exports.env === 'development'
const path = require('path')
const extractLess = new ExtractTextWebpackPlugin({
	filename: 'css/[name]-bundle-[hash:5].css'
})
exports.scriptLoader = [{
	loader: 'babel-loader'
}].concat(
	{
		loader: 'eslint-loader',
		options: {
  		formatter: require('eslint-friendly-formatter'),
  		formatter: require("eslint/lib/formatters/stylish")
		}
	}
)
const cssLoaders = [
	{
		loader: 'css-loader',
		options: {
			importLoaders: 2,
			scoureMap: isDev
		}
	},
	{
		loader: 'postcss-loader',
		options: {
			ident: 'postcss',
			scoureMap: isDev,
			plugins: [
				require('postcss-cssnext')()
			].concat(
				isProd ? require('postcss-sprites')({
					spritePath: 'dist/assets/images/sprites',
					retina: true
				}):[]) 
		}
	},
	{
		loader: 'less-loader',
		options: {
			scoureMap: isDev
		}
	}
]
exports.extractLess = extractLess
exports.styleLoader = isProd ? extractLess.extract({
	fallback: 'style-loader',
	use: cssLoaders
}) : [{
	loader: 'style-loader'
}].concat(cssLoaders)

exports.fileLoader = isDev ? [{
	loader: 'file-loader',
	options: {
		name: '[name]-[hash:5].[ext]',
		outputPath: 'assets/images/'
	}
}] : [
{
	loader: 'url-loader',
	options: {
		name: '[name]-[hash:5].[ext]',
		limit: 2000,
		outputPath: 'assets/images/'
	}
},
{
	loader: 'img-loader',
	options: {
		pngquant: {
			quality: 80
		}
	}
}
]


exports.fontLoader = isDev ? [{
	loader: 'file-loader',
	options: {
		name: '[name]-[hash:5].[ext]',
		outputPath: 'assets/fonts/'
	}
}] : [{
	loader: 'url-loader',
	options: {
		name: '[name]-[hash:5].[ext]',
		limit: 2000,
		outputPath: 'assets/fonts/'
	}
}]
