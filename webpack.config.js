const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');


// @RUN: node_modules/.bin/webpack-dev-server
const config = {
	node: {
		fs: 'empty' // https://github.com/josephsavona/valuable/issues/9
	},
	entry: [
		'webpack-dev-server/client?http://localhost:8080',
		'./client/index.js'
	],
	output: {
		path: path.join(__dirname, "built"), // This is where images AND js will go
		filename: 'index.js'
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
		})
		// new webpack.HotModuleReplacementPlugin(),
		// new webpack.NoEmitOnErrorsPlugin(),
		// new webpack.DefinePlugin({
		// 	'process.env.NODE_ENV': '"production"'
		// })
	]
};


const serverConfig = {
	name: 'server',
	target: 'node',
	externals: [nodeExternals()],
	entry: [
		'./server/entry.js'
	],
	output: {
		path: path.join(__dirname, 'built/'),
		filename: 'server.js',
		publicPath: 'built/',
		libraryTarget: 'commonjs2'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.css$/,
				loader: 'null'
			},
			{
				test: /\.scss$/,
				loader: 'css-loader/locals?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
			}
		]
	},
	resolve: {
		extensions: ['.js']
	},
	plugins: [
		new webpack.ProvidePlugin({
			'React':  'react',
			'_':      'lodash'
		})
	]
};


module.exports = [config, serverConfig];