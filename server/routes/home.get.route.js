const handleRender = require('../../built/server.js');


function homeRoute(req, res) {
	return handleRender(req, res);
}


module.exports = homeRoute;