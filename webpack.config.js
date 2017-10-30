const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

// 🍕
// @RUN: node_modules/.bin/webpack-dev-server
const config = {
	name: 'client',
	node: {
		fs: 'empty' // https://github.com/josephsavona/valuable/issues/
	},
	entry: [
		'./client/index.js'
	],
	output: {
		path: path.join(__dirname, "./"), // This is where images AND js will go
		filename: 'index_build.js'
	},
	stats: {
		colors: true,
		reasons: true
	},
	resolve: {
		extensions: ['.js']
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /\/node_modules\//,
				loader: 'babel-loader',
				query: {
					cacheDirectory: true
				}
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
			{
				test: /\.scss$/,
				loader: 'css-loader/locals?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			'React':  'react',
			'_':      'lodash'
		}),
		new webpack.HotModuleReplacementPlugin(),
		// new webpack.NoEmitOnErrorsPlugin(),
		// new webpack.DefinePlugin({
		// 	'process.env.NODE_ENV': '"production"'
		// })
	]
};


module.exports = config;