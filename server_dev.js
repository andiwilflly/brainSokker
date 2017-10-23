const config = require('./webpack.config');
const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const Express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');


const interfacePlayersRoute = require('./server/routes/interface_players.get.route');
const currentTransfers = require('./server/routes/currentTransfers.get.route');
const saveInterfacePlayerData = require('./server/routes/save_interface_player_data.post.route');


const app = Express();

// Serve built files with express static files middleware
app.use('/built', Express.static(path.join(__dirname, './built')));
// Serve normal requests with our handleRender function
app.use('/static', Express.static(path.join(__dirname, './static')));


const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, { noInfo: true }));
app.use(webpackDevMiddleware(compiler));


app.use('/interface_players', (req, res)=> interfacePlayersRoute(DB, req, res) );

app.use('/current_transfers', (req, res)=> currentTransfers(DB, req, res) );

app.post('/save_interface_player_data', (req, res)=> saveInterfacePlayerData(DB, req, res) );

app.get('*', (req, res)=> {
	fs.readFile('./index.html', 'utf8', function (err, file) {
		if (err) {
			return console.log(err);
		}
		res.send(file);
	});
});


app.listen(3000);


//const serverDev = function() {



	// let app = {
	// 	webpack : require('webpack'),
	// 	proxy : require('express-http-proxy'),
	// 	webpackDevMiddleware : require('webpack-dev-middleware'),
	// 	webpackHotMiddleware : require('webpack-hot-middleware'),
	//
	// 	init: function() {
	// 		const MongoClient = require('mongodb').MongoClient;
	// 		// mongodb://andiwillfly:ward121314@ds127854.mlab.com:27854/net
	// 		MongoClient.connect("mongodb://andiwillfly:ward121314@ds127854.mlab.com:27854/net", function (err, DB) {
	// 			if (err) throw err;
	//
	//
	// 			app.compiler = app.webpack(webpackConfig);
	//
	// 			app.ex = Express();
	//
	//
	// 			// Serve built files with express static files middleware
	// 			app.ex.use('/built', Express.static(path.join(__dirname, './built')));
	//
	// 			// Serve normal requests with our handleRender function
	// 			app.ex.use('/static', Express.static(path.join(__dirname, './static')));
	//
	//
	// 			app.ex.use(app.webpackDevMiddleware(app.compiler, {
	// 				noInfo: false,
	// 				quiet: false,
	// 				publicPath: path.join(__dirname, "./built")
	// 			}));
	//
	// 			app.ex.use(app.webpackHotMiddleware(app.compiler));
	//
	//
	// 			app.ex.use('/interface_players', (req, res)=> interfacePlayersRoute(DB, req, res) );
	// 			app.ex.use('/current_transfers', (req, res)=> currentTransfers(DB, req, res) );
	// 			app.ex.post('/save_interface_player_data', (req, res)=> saveInterfacePlayerData(DB, req, res) );
	//
	// 			app.ex.get('*', function (req, res, next) {
	// 				fs.readFile('./index.html', 'utf8', function (err, file) {
	// 					if (err) {
	// 						return console.log(err);
	// 					}
	// 					res.send(file);
	// 				});
	// 			});
	//
	//
	// 			app.ex.listen(3000, '0.0.0.0', function (err) {
	// 				if (err) {
	// 					console.log(err);
	// 					return;
	// 				}
	// 				console.log('Listening at http://' + '0.0.0.0' + ':' + 3000);
	// 			});
	// 		});
	// 	}
	// };
//};


//serverDev().init();