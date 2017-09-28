import handleRender from '../../built/server.js';


function homeRoute(req, res) {
	return handleRender(req, res);
}


export default homeRoute;