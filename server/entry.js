import fs from 'fs';
import React from 'react';

function handleRender(req, res) {
	console.log(' ');
	console.log(req.originalUrl, 'URL!!');
	console.log(' ');
		fs.readFile('./index.html', 'utf8', function (err, file) {
			if (err) {
				return console.log(err);
			}
			res.send(file);
		});
}

export default handleRender;