const fs = require('fs');
const path = require('path');
const Express = require('express');
const React = require('react');
const learnedRoute = require('./routes/learned.get.route');
const currentTransfers = require('./routes/currentTransfers.get.route');


const MongoClient = require('mongodb').MongoClient;
// mongodb://andiwillfly:ward121314@ds127854.mlab.com:27854/net
MongoClient.connect("mongodb://andiwillfly:ward121314@ds127854.mlab.com:27854/net", function (err, DB) {
	if(err) throw err;

	const app = Express();
	// Serve built files with express static files middleware
	console.log('==========3', path.join(__dirname, 'built'));
	app.use('/built', Express.static(path.join(__dirname, '../built')));

	// Serve normal requests with our handleRender function
	app.use('/static', Express.static(path.join(__dirname, '../static')));


	//app.use('/players', (req, res)=> playersRoute(DB, req, res) );

	app.use('/learned', (req, res)=> learnedRoute(DB, req, res) );

	//app.post('/learn_save_player', (req, res)=> learnSavePlayerRoute(DB, req, res) );

	//app.use('/keepers', (req, res)=> keepersRoute(DB, req, res) );

	//app.use('/parse', (req, res)=> parseRoute(DB, req, res) );

	app.use('/current_transfers', (req, res)=> currentTransfers(DB, req, res) );

	app.get('*', (req, res)=> {
		fs.readFile('./index.html', 'utf8', function (err, file) {
			if (err) {
				return console.log(err);
			}
			res.send(file);
		});
	});


	app.listen(3000);
	console.log('=== Go to http://localhost:3000 ===');
});
