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


const MongoClient = require('mongodb').MongoClient;
// mongodb://andiwillfly:ward121314@ds127854.mlab.com:27854/net
MongoClient.connect("mongodb://andiwillfly:ward121314@ds127854.mlab.com:27854/net", function (err, DB) {

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
});