import fs from 'fs';
import React from 'react';
import App from '../client/App.observer.component';
import ReactDOMServer from 'react-dom/server';


function handleRender(req, res) {
	console.log(' ');
	console.log(req.originalUrl, 'URL!!');
	console.log(' ');
	const reactString = ReactDOMServer.renderToString(<App />);
		fs.readFile('./index.html', 'utf8', function (err, file) {
			if (err) {
				return console.log(err);
			}
			const document = file.replace(/<div id="app"><\/div>/, `<div id="app">${reactString}</div>`);
			res.send(document);
		});
}

export default handleRender;