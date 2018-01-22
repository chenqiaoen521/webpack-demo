const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const extractLess = new ExtractTextWebpackPlugin({
	filename: 'css/[name]-bundle-[hash:5].css'
})

module.exports = function (env) {
	const isProd = env === 'production'
	const isDev = env === 'development'

	/** 处理js */
	const scriptLoader = [{
	loader: 'babel-loader'
	}].concat(
		isProd ? [] : [{
			loader: 'eslint-loader',
			options: {
	  		formatter: require('eslint-friendly-formatter'),
	  		formatter: require("eslint/lib/formatters/stylish")
			}
		}]
	)

	/** 处理字体 */
	const fontLoader = isDev ? [{
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

	/** 图片 */
	const fileLoader = isDev ? [{
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
		}]
		/** less */
		const cssLoaders = [
			{
				loader: 'css-loader',
				options: {
					importLoaders: 2,
					import: true,
					scoureMap: isDev,
					minimize: isProd
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
		/** less 提取css到文件 */
		const styleLoader = isProd ? extractLess.extract({
			fallback: 'style-loader',
			use: cssLoaders
		}) : [{
			loader: 'style-loader'
		}].concat(cssLoaders)
		
	return {
		extractLess,
		fontLoader,
		fileLoader,
		styleLoader,
		scriptLoader,
		cssLoaders
	}
}