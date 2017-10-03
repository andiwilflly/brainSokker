const fs = require('fs');
const path = require('path');
const Express = require('express');
const React = require('react');
const learnedRoute = require('./server/routes/learned.get.route');
const currentTransfers = require('./server/routes/currentTransfers.get.route');


const MongoClient = require('mongodb').MongoClient;
// mongodb://andiwillfly:ward121314@ds127854.mlab.com:27854/net
MongoClient.connect("mongodb://andiwillfly:ward121314@ds127854.mlab.com:27854/net", function (err, DB) {
	if(err) throw err;

	const app = Express();
	// Serve built files with express static files middleware
	console.log('==========3', path.join(__dirname, 'built'));
	app.use('/built', Express.static(path.join(__dirname, './built')));

	// Serve normal requests with our handleRender function
	app.use('/static', Express.static(path.join(__dirname, './static')));

	app.use('/learned', (req, res)=> learnedRoute(DB, req, res) );

	app.use('/current_transfers', (req, res)=> currentTransfers(DB, req, res) );

	app.get('*', (req, res)=> {
		fs.readFile('./index.html', 'utf8', function (err, file) {
			if (err) {
				return console.log(err);
			}
			res.send(file);
		});
	});


	app.listen(process.env.PORT || 3000);


	// app.listen(app.get('port'), function() {
	// 	console.log('Node app is running on port', app.get('port'));
	// });
	console.log('=== Go to http://localhost:3000 ===');
});
