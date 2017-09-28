const path = require('path');
const Express = require('express');
const React = require('react');
import homeRoute from './routes/home.get.route';
import learnedRoute from './routes/learned.get.route';
import playersRoute from './routes/players.get.route';
import keepersRoute from "./routes/keepers.get.route";
import learnSavePlayerRoute from './routes/learn_save_player.post.route';
import parseRoute from './routes/parse.get.route';

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


	app.use('/players', (req, res)=> playersRoute(DB, req, res) );

	app.use('/learned', (req, res)=> learnedRoute(DB, req, res) );

	app.post('/learn_save_player', (req, res)=> learnSavePlayerRoute(DB, req, res) );

	app.use('/keepers', (req, res)=> keepersRoute(DB, req, res) );

	app.use('/parse', (req, res)=> parseRoute(DB, req, res) );

	app.get('*', homeRoute);


	app.listen(3000);
	console.log('=== Go to http://localhost:3000 ===');
});
